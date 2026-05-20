'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import type { Page } from '@/types/database';
import styles from './home.module.css';

type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

interface ActivityLog {
  id: string;
  page: string;
  action: 'created' | 'edited' | 'deleted';
  timestamp: Date;
}

export default function HomePage() {
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchPages = useCallback(async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      showToast('Erro ao carregar páginas', 'error');
      return;
    }
    setPages(data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Slug generator
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormName(value);
    setFormSlug(generateSlug(value));
    setFormError('');
  };

  // Create page
  const handleCreate = async () => {
    if (!formName.trim() || !formSlug.trim()) {
      setFormError('Nome e slug são obrigatórios');
      return;
    }

    setFormLoading(true);

    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', formSlug);

    if (existing && existing.length > 0) {
      setFormError('Esse slug já está em uso');
      setFormLoading(false);
      return;
    }

    const { data: newPage, error } = await supabase
      .from('pages')
      // @ts-ignore
      .insert({ name: formName, slug: formSlug, status: 'draft' as const })
      .select()
      .single();

    if (error) {
      setFormError('Erro ao criar página');
      setFormLoading(false);
      return;
    }

    await supabase.from('page_versions').insert({
      // @ts-ignore
      page_id: newPage.id,
      content: { blocks: [] },
      version_type: 'draft' as const,
    });

    setShowCreateModal(false);
    resetForm();
    showToast('Página criada com sucesso', 'success');
    fetchPages();
  };

  // Duplicate page
  const openDuplicate = (page: Page) => {
    setSelectedPage(page);
    setFormName(`${page.name} (cópia)`);
    setFormSlug(`${page.slug}-copia`);
    setFormError('');
    setShowDuplicateModal(true);
  };

  const handleDuplicate = async () => {
    if (!selectedPage || !formName.trim() || !formSlug.trim()) {
      setFormError('Nome e slug são obrigatórios');
      return;
    }

    setFormLoading(true);

    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', formSlug);

    if (existing && existing.length > 0) {
      setFormError('Esse slug já está em uso');
      setFormLoading(false);
      return;
    }

    let { data: sourceVersion } = await supabase
      .from('page_versions')
      .select('content')
      .eq('page_id', selectedPage.id)
      .eq('version_type', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!sourceVersion) {
      const { data: pubVersion } = await supabase
        .from('page_versions')
        .select('content')
        .eq('page_id', selectedPage.id)
        .eq('version_type', 'published')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      sourceVersion = pubVersion;
    }

    const content = (sourceVersion as any)?.content ?? { blocks: [] };

    const { data: newPage, error } = await supabase
      .from('pages')
      // @ts-ignore
      .insert({ name: formName, slug: formSlug, status: 'draft' as const })
      .select()
      .single();

    if (error) {
      setFormError('Erro ao duplicar página');
      setFormLoading(false);
      return;
    }

    await supabase.from('page_versions').insert({
      // @ts-ignore
      page_id: newPage.id,
      content,
      version_type: 'draft' as const,
    });

    setShowDuplicateModal(false);
    resetForm();
    showToast('Página duplicada com sucesso', 'success');
    fetchPages();
  };

  // Delete page
  const openDelete = (page: Page) => {
    setSelectedPage(page);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedPage) return;
    setFormLoading(true);

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', selectedPage.id);

    if (error) {
      showToast('Erro ao deletar página', 'error');
      setFormLoading(false);
      return;
    }

    setShowDeleteConfirm(false);
    setSelectedPage(null);
    setFormLoading(false);
    showToast('Página deletada', 'success');
    fetchPages();
  };

  // Publish / Unpublish
  const handleTogglePublish = async (page: Page) => {
    if (page.status === 'published') {
      const { error } = await supabase
        .from('pages')
        // @ts-ignore
        .update({ status: 'draft' as const })
        .eq('id', page.id);

      if (error) {
        showToast('Erro ao despublicar', 'error');
        return;
      }
      showToast('Página despublicada', 'success');
    } else {
      const { data: version } = await supabase
        .from('page_versions')
        .select('content')
        .eq('page_id', page.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!version || !(version as any).content?.blocks?.length) {
        showToast('Página sem blocos — não é possível publicar', 'error');
        return;
      }

      await supabase.from('page_versions').insert({
        // @ts-ignore
        page_id: page.id,
        content: (version as any).content,
        version_type: 'published' as const,
      });

      const { error } = await supabase
        .from('pages')
        // @ts-ignore
        .update({ status: 'published' as const })
        .eq('id', page.id);

      if (error) {
        showToast('Erro ao publicar', 'error');
        return;
      }
      showToast('Página publicada!', 'success');
    }

    fetchPages();
  };

  // Helpers
  const resetForm = () => {
    setFormName('');
    setFormSlug('');
    setFormError('');
    setFormLoading(false);
    setSelectedPage(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFirstName = () => {
    const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';
    return fullName.split(' ')[0];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const DocIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  // Stats
  const totalPages = pages.length;
  const publishedPages = pages.filter(p => p.status === 'published').length;
  const draftPages = pages.filter(p => p.status === 'draft').length;
  const featuredPage = pages[0];

  // Format relative time
  const formatTime = (date: Date) => {
    const now = new Date();
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (hours < 1) return 'agora mesmo';
    if (hours === 1) return 'há 1 hora';
    if (hours < 24) return `há ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'ontem';
    return `há ${days}d`;
  };

  // Mock activity data based on pages
  const generateActivityLog = (): ActivityLog[] => {
    if (pages.length === 0) return [];
    return pages.slice(0, 4).map((page, index) => ({
      id: page.id,
      page: page.name,
      action: index % 3 === 0 ? 'created' : index % 3 === 1 ? 'edited' : 'deleted',
      timestamp: new Date(new Date().getTime() - (index + 1) * 60 * 60 * 1000),
    }));
  };

  const activityLog = generateActivityLog();

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        {/* ====== HERO SECTION ====== */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroGreeting}>
              {getGreeting()}, <strong>{getFirstName()}</strong>
            </h1>
            <p className={styles.heroSubtext}>
              <strong>{totalPages}</strong> página{totalPages !== 1 ? 's' : ''} •
              <strong>{publishedPages}</strong> ao vivo •
              <strong>{draftPages}</strong> rascunho{draftPages !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Stats in hero */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>{totalPages}</p>
                <p className={styles.statLabel}>Páginas</p>
              </div>
              <p className={`${styles.statChange} ${totalPages > 5 ? styles.statChangeUp : styles.statChangeDown}`}>
                {totalPages > 5 ? '↑' : '↓'} {Math.abs(totalPages - 5)}
              </p>
            </div>

            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>{publishedPages}</p>
                <p className={styles.statLabel}>Publicadas</p>
              </div>
              <p className={`${styles.statChange} ${publishedPages > 3 ? styles.statChangeUp : styles.statChangeDown}`}>
                {publishedPages > 3 ? '↑' : '↓'} {Math.abs(publishedPages - 3)}
              </p>
            </div>

            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>{draftPages}</p>
                <p className={styles.statLabel}>Rascunhos</p>
              </div>
              <p className={`${styles.statChange} ${styles.statChangeDown}`}>
                −{Math.max(0, draftPages - 1)}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.heroCTA}>
            <button
              className={styles.btnCreatePage}
              onClick={() => { resetForm(); setShowCreateModal(true); }}
            >
              <PlusIcon />
              <span>Criar Nova Página</span>
            </button>
          </div>
        </section>

        {/* ====== CONTENT ====== */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>Carregando...</div>
          ) : pages.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><DocIcon /></span>
              <h3>Comece criando sua primeira página</h3>
              <p>Crie, edite e publique landing pages em minutos</p>
              <button
                className={styles.btnCreatePage}
                onClick={() => { resetForm(); setShowCreateModal(true); }}
              >
                <PlusIcon />
                <span>Criar Primeira Página</span>
              </button>
            </div>
          ) : (
            <>
              {/* Featured Section */}
              {featuredPage && (
                <section className={styles.featuredSection}>
                  <h2 className={styles.featuredTitle}>Página Recente</h2>
                  <div className={styles.featuredCard}>
                    <div className={styles.featuredImage}>
                      <DocIcon />
                    </div>

                    <div className={styles.featuredInfo}>
                      <h3 className={styles.featuredName}>{featuredPage.name}</h3>
                      <div className={styles.featuredMeta}>
                        <span className={`${styles.pageCardStatus} ${featuredPage.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                          {featuredPage.status === 'published' ? '✓ Publicado' : '○ Rascunho'}
                        </span>
                        <span className={styles.featuredMetaDot}></span>
                        <span>{formatDate(featuredPage.updated_at)}</span>
                      </div>
                    </div>

                    <div className={styles.featuredActions}>
                      <button className={styles.actionBtn} onClick={() => window.location.href = `/editor/${featuredPage.id}`}>Editar</button>
                      <button className={styles.actionBtn} onClick={() => openDuplicate(featuredPage)}>Copiar</button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleTogglePublish(featuredPage)}
                      >
                        {featuredPage.status === 'published' ? 'Ocultar' : 'Publicar'}
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Pages Grid - Bento Layout */}
              <section className={styles.pagesSection}>
                <h2 className={styles.featuredTitle}>Suas Páginas</h2>

                <div className={styles.pagesGrid}>
                  {/* Page Cards */}
                  {pages.slice(0, 6).map((page) => (
                    <div key={page.id} className={styles.pageCard} onClick={() => window.location.href = `/editor/${page.id}`}>
                      <div className={styles.pageCardContent}>
                        <div className={styles.pageCardImage}>
                          <DocIcon />
                        </div>
                        <div>
                          <h3 className={styles.pageCardTitle}>{page.name}</h3>
                          <div className={styles.pageCardMeta}>
                            <span className={`${styles.pageCardStatus} ${page.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                              {page.status === 'published' ? '✓ Pub' : '○ Draft'}
                            </span>
                            <span className={styles.pageCardMetaDot}></span>
                            <span>{formatDate(page.updated_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Activity Card - Tall */}
                  {pages.length > 0 && (
                    <div className={styles.activityCard}>
                      <h3 className={styles.activityTitle}>Atividade</h3>
                      <ul className={styles.activityList}>
                        {activityLog.map((activity) => (
                          <li key={activity.id} className={styles.activityItem}>
                            <span className={styles.activityDot}></span>
                            <span>
                              Página <strong>{activity.page}</strong> foi {
                                activity.action === 'created' ? 'criada' :
                                activity.action === 'edited' ? 'editada' : 'deletada'
                              } {formatTime(activity.timestamp)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Criar Nova Página</h2>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome da Página</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Página Principal"
                value={formName}
                onChange={(e) => handleNameChange(e.target.value)}
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Slug</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="pagina-principal"
                value={formSlug}
                onChange={(e) => { setFormSlug(e.target.value); setFormError(''); }}
              />
            </div>

            {formError && <div className={styles.formError}>{formError}</div>}

            <div className={styles.modalActions}>
              <button
                className={styles.btnSecondary}
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.btnPrimary}
                onClick={handleCreate}
                disabled={formLoading}
              >
                {formLoading ? 'Criando...' : 'Criar Página'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Modal */}
      {showDuplicateModal && selectedPage && (
        <div className={styles.modalOverlay} onClick={() => setShowDuplicateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Duplicar Página</h2>
            <p style={{ marginBottom: '20px' }}>Duplicando <strong>{selectedPage.name}</strong></p>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome da cópia</label>
              <input type="text" className={styles.formInput} value={formName} onChange={(e) => handleNameChange(e.target.value)} autoFocus />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Slug (URL)</label>
              <input type="text" className={styles.formInput} value={formSlug} onChange={(e) => { setFormSlug(e.target.value); setFormError(''); }} />
              {formError && <p className={styles.formError}>{formError}</p>}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setShowDuplicateModal(false)}>Cancelar</button>
              <button className={styles.btnPrimary} onClick={handleDuplicate} disabled={formLoading}>{formLoading ? 'Duplicando...' : 'Duplicar'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && selectedPage && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Deletar Página</h2>
            <p style={{ marginBottom: '20px' }}>Tem certeza que deseja deletar <strong>{selectedPage.name}</strong>? Essa ação não pode ser desfeita.</p>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
              <button className={styles.btnSecondary} onClick={handleDelete} disabled={formLoading} style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>{formLoading ? 'Deletando...' : 'Deletar'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
