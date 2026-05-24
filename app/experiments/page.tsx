// @ts-nocheck
/* @ts-nocheck */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Icon } from '@/components/Icon/Icon';
import type { Experiment, Page } from '@/types/database';
import styles from './experiments.module.css';

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  running: 'Rodando',
  paused: 'Pausado',
  completed: 'Concluído',
};

const statusClass: Record<string, string> = {
  draft: styles.statusDraft,
  running: styles.statusRunning,
  paused: styles.statusPaused,
  completed: styles.statusCompleted,
};

const statusColors: Record<string, string> = {
  draft: '#9fa0aa',
  running: '#4cd8b9',
  paused: '#ebb400',
  completed: '#787878',
};

export default function ExperimentsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [experiments, setExperiments] = useState<(Experiment & { page_name?: string })[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null);

  // Form
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPageId, setFormPageId] = useState('');
  const [formType, setFormType] = useState<'block' | 'page'>('block');
  const [formTraffic, setFormTraffic] = useState(50);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchData = useCallback(async () => {
    const [{ data: exps }, { data: pgs }] = await Promise.all([
      supabase.from('experiments').select('*').order('created_at', { ascending: false }),
      supabase.from('pages').select('*').order('name'),
    ]);

    const pageMap = new Map((pgs || []).map((p: any) => [p.id, p.name]));
    setExperiments((exps || []).map((e: any) => ({ ...e, page_name: pageMap.get(e.page_id) || '?' })));
    setPages(pgs || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const resetForm = () => {
    setFormName('');
    setFormDesc('');
    setFormPageId('');
    setFormType('block');
    setFormTraffic(50);
    setFormError('');
  };

  const handleCreate = async () => {
    if (!formName.trim()) { setFormError('Nome é obrigatório'); return; }
    if (!formPageId) { setFormError('Selecione uma página'); return; }

    setFormLoading(true);

    // Create the experiment
    const { data: exp, error: expError } = await supabase
      .from('experiments')
      .insert({
        name: formName.trim(),
        description: formDesc.trim(),
        page_id: formPageId,
        type: formType,
        traffic_percentage: formTraffic,
        status: 'draft' as const,
      } as any)
      .select()
      .single();

    if (expError || !exp) {
      setFormError('Erro ao criar experimento');
      setFormLoading(false);
      return;
    }

    // Create default variants: Control (A) + Variant (B)
    await supabase.from('experiment_variants').insert([
      { experiment_id: exp.id, name: 'Controle (A)', is_control: true, weight: formTraffic },
      { experiment_id: exp.id, name: 'Variante (B)', is_control: false, weight: 100 - formTraffic },
    ]);

    setFormLoading(false);
    setShowModal(false);
    resetForm();
    showToast('Experimento criado', 'success');
    fetchData();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === 'running') updates.started_at = new Date().toISOString();
    if (newStatus === 'completed') updates.ended_at = new Date().toISOString();

    await supabase.from('experiments').update(updates).eq('id', id);
    showToast(
      newStatus === 'running' ? 'Experimento iniciado' :
      newStatus === 'paused' ? 'Experimento pausado' :
      'Experimento concluído',
      'success'
    );
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('experiments').delete().eq('id', id);
    showToast('Experimento removido', 'success');
    fetchData();
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1>Testes A/B</h1>
            <p>{experiments.length} experimento{experiments.length !== 1 ? 's' : ''}</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => { resetForm(); setShowModal(true); }}>
            <Icon name="plus-default" size={16} />
            Novo experimento
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : experiments.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Nenhum experimento criado</h3>
            <p>Crie um teste A/B para otimizar suas landing pages</p>
          </div>
        ) : (
          <div className={styles.experimentsList}>
            {experiments.map((exp) => (
              <div key={exp.id} className={styles.experimentCard}>
                <div className={styles.experimentInfo}>
                  <div className={styles.experimentTopRow}>
                    <span className={styles.experimentName}>{exp.name}</span>
                    <div className={styles.statusWrapper}>
                      <button
                        className={`${styles.statusBadge} ${statusClass[exp.status]}`}
                        onClick={() => setOpenStatusMenu(openStatusMenu === exp.id ? null : exp.id)}
                      >
                        {statusLabels[exp.status]}
                        <span className={styles.statusChevron}>
                          <Icon name="chevron-down" size={12} />
                        </span>
                      </button>
                      {openStatusMenu === exp.id && (
                        <>
                          <div className={styles.statusMenuBackdrop} onClick={() => setOpenStatusMenu(null)} />
                          <div className={styles.statusMenu}>
                            {['draft', 'running', 'paused', 'completed'].map((s) => (
                              <button
                                key={s}
                                className={`${styles.statusMenuItem} ${exp.status === s ? styles.statusMenuItemActive : ''}`}
                                onClick={() => { handleStatusChange(exp.id, s); setOpenStatusMenu(null); }}
                              >
                                <span className={styles.statusMenuDot} style={{ color: statusColors[s] }}>
                                  <svg viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
                                </span>
                                {statusLabels[s]}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.experimentMeta}>
                    <span>{exp.page_name}</span>
                    <span>{exp.type === 'block' ? 'Bloco' : 'Página'}</span>
                    <span>{exp.traffic_percentage}% / {100 - exp.traffic_percentage}%</span>
                  </div>
                </div>
                <div className={styles.experimentActions}>
                  <button className={styles.btnSmall} onClick={() => router.push(`/experiments/${exp.id}`)}>
                    Editar variantes
                  </button>
                  {exp.status === 'draft' && (
                    <button className={styles.btnStart} onClick={() => handleStatusChange(exp.id, 'running')}>
                      Iniciar
                    </button>
                  )}
                  {exp.status === 'running' && (
                    <>
                      <button className={styles.btnPause} onClick={() => handleStatusChange(exp.id, 'paused')}>
                        Pausar
                      </button>
                      <button className={styles.btnSmall} onClick={() => handleStatusChange(exp.id, 'completed')}>
                        Concluir
                      </button>
                    </>
                  )}
                  {exp.status === 'paused' && (
                    <>
                      <button className={styles.btnStart} onClick={() => handleStatusChange(exp.id, 'running')}>
                        Retomar
                      </button>
                      <button className={styles.btnSmall} onClick={() => handleStatusChange(exp.id, 'completed')}>
                        Concluir
                      </button>
                    </>
                  )}
                  {(exp.status === 'draft' || exp.status === 'completed') && (
                    <button className={styles.btnSmallDanger} onClick={() => handleDelete(exp.id)}>
                      Remover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Novo experimento</h2>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome do experimento</label>
              <input className={styles.formInput} value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ex: Hero CTA vermelho vs azul" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Descrição (opcional)</label>
              <input className={styles.formInput} value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Objetivo do teste..." />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Página</label>
                <select className={styles.formSelect} value={formPageId} onChange={(e) => setFormPageId(e.target.value)}>
                  <option value="">Selecione...</option>
                  {pages.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tipo</label>
                <select className={styles.formSelect} value={formType} onChange={(e) => setFormType(e.target.value as any)}>
                  <option value="block">Bloco (A/B de um componente)</option>
                  <option value="page">Página (A/B da página inteira)</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Distribuição de tráfego: {formTraffic}% Controle / {100 - formTraffic}% Variante</label>
              <input type="range" min="10" max="90" value={formTraffic} onChange={(e) => setFormTraffic(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>

            {formError && <p className={styles.formError}>{formError}</p>}

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowModal(false)}>Cancelar</button>
              <button className={styles.btnSubmit} onClick={handleCreate} disabled={formLoading}>
                {formLoading ? 'Criando...' : 'Criar experimento'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
