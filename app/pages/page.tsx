// @ts-nocheck
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Icon } from '@/components/Icon/Icon';
import type { Page, Vertical } from '@/types/database';
import styles from './pages.module.css';

type PageWithVertical = Page & { vertical?: Vertical | null };

export default function PagesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [pages, setPages] = useState<PageWithVertical[]>([]);
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageWithVertical | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formVerticalId, setFormVerticalId] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [generatingThumbnail, setGeneratingThumbnail] = useState<string | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchData = useCallback(async () => {
    const [{ data: pgs }, { data: verts }] = await Promise.all([
      supabase.from('pages').select('*').order('updated_at', { ascending: false }),
      supabase.from('verticals').select('*').order('name'),
    ]);

    const vertMap = new Map((verts || []).map((v: Vertical) => [v.id, v]));
    const pagesWithVerticals: PageWithVertical[] = (pgs || []).map((p: Page) => ({
      ...p,
      vertical: p.vertical_id ? vertMap.get(p.vertical_id) || null : null,
    }));

    setPages(pagesWithVerticals);
    setVerticals(verts || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const resetForm = () => {
    setFormName('');
    setFormSlug('');
    setFormVerticalId('');
    setFormError('');
    setFormLoading(false);
    setSelectedPage(null);
  };

  // ---- Create ----
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

    const insertData: any = {
      name: formName.trim(),
      slug: formSlug.trim(),
      status: 'draft',
    };
    if (formVerticalId) {
      insertData.vertical_id = formVerticalId;
    }

    const { data: newPage, error } = await supabase
      .from('pages')
      .insert(insertData)
      .select()
      .single();

    if (error || !newPage) {
      setFormError('Erro ao criar página');
      setFormLoading(false);
      return;
    }

    await supabase.from('page_versions').insert({
      page_id: newPage.id,
      content: { blocks: [] },
      version_type: 'draft',
    });

    setShowCreateModal(false);
    resetForm();
    showToast('Página criada com sucesso', 'success');
    fetchData();
  };

  // ---- Duplicate ----
  const openDuplicate = (page: PageWithVertical) => {
    setSelectedPage(page);
    setFormName(`${page.name} (cópia)`);
    setFormSlug(`${page.slug}-copia`);
    setFormVerticalId(page.vertical_id || '');
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

    // Fetch source content
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

    const content = sourceVersion?.content ?? { blocks: [] };

    const insertData: any = {
      name: formName.trim(),
      slug: formSlug.trim(),
      status: 'draft',
    };
    if (formVerticalId) {
      insertData.vertical_id = formVerticalId;
    }

    const { data: newPage, error } = await supabase
      .from('pages')
      .insert(insertData)
      .select()
      .single();

    if (error || !newPage) {
      setFormError('Erro ao duplicar página');
      setFormLoading(false);
      return;
    }

    await supabase.from('page_versions').insert({
      page_id: newPage.id,
      content,
      version_type: 'draft',
    });

    setShowDuplicateModal(false);
    resetForm();
    showToast('Página duplicada com sucesso', 'success');
    fetchData();
  };

  // ---- Delete ----
  const openDelete = (page: PageWithVertical) => {
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
    fetchData();
  };

  // ---- Publish / Unpublish ----
  const handleTogglePublish = async (page: PageWithVertical) => {
    if (page.status === 'published') {
      const { error } = await supabase
        .from('pages')
        .update({ status: 'draft' })
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

      if (!version || !version.content?.blocks?.length) {
        showToast('Página sem blocos — não é possível publicar', 'error');
        return;
      }

      await supabase.from('page_versions').insert({
        page_id: page.id,
        content: version.content,
        version_type: 'published',
      });

      const { error } = await supabase
        .from('pages')
        .update({ status: 'published' })
        .eq('id', page.id);

      if (error) {
        showToast('Erro ao publicar', 'error');
        return;
      }
      showToast('Página publicada!', 'success');

      // Generate thumbnail screenshot in background
      fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: page.id, slug: page.slug }),
      }).catch(() => {});
    }

    fetchData();
  };

  // ---- Generate Thumbnail ----
  const handleGenerateThumbnail = async (page: PageWithVertical) => {
    setGeneratingThumbnail(page.id);
    try {
      const res = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId: page.id, slug: page.slug }),
      });
      if (res.ok) {
        showToast('Thumbnail gerada!', 'success');
        fetchData();
      } else {
        showToast('Erro ao gerar thumbnail', 'error');
      }
    } catch {
      showToast('Erro ao gerar thumbnail', 'error');
    }
    setGeneratingThumbnail(null);
  };

  // ---- Formatting ----
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // ---- Filtering ----
  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesVertical =
      !verticalFilter ||
      (verticalFilter === '__none__' ? !p.vertical_id : p.vertical_id === verticalFilter);
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesVertical && matchesStatus;
  });

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1>Páginas</h1>
            <p>
              {pages.length} página{pages.length !== 1 ? 's' : ''}
              {filteredPages.length !== pages.length && ` · ${filteredPages.length} exibida${filteredPages.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={() => { resetForm(); setShowCreateModal(true); }}>
            <Icon name="plus-default" size={16} />
            Nova página
          </button>
        </div>

        {/* Toolbar */}
        {pages.length > 0 && (
          <div className={styles.toolbar}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Buscar páginas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={styles.filterSelect}
              value={verticalFilter}
              onChange={(e) => setVerticalFilter(e.target.value)}
            >
              <option value="">Todas as verticais</option>
              <option value="__none__">Ecossistema</option>
              {verticals.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="published">Publicada</option>
              <option value="draft">Rascunho</option>
            </select>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : pages.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Nenhuma página criada</h3>
            <p>Crie sua primeira landing page para começar</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Nenhum resultado</h3>
            <p>Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className={styles.pagesList}>
            {filteredPages.map((page) => (
              <div key={page.id} className={styles.pageCard}>
                <div className={styles.pageInfo}>
                  <span className={styles.pageName}>{page.name}</span>
                  <div className={styles.pageMeta}>
                    <span className={`${styles.statusBadge} ${page.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {page.status === 'published' ? 'Publicada' : 'Rascunho'}
                    </span>
                    <span className={styles.verticalBadge}>
                      {page.vertical ? (
                        <>
                          <span className={styles.verticalDot} style={{ backgroundColor: page.vertical.color || '#888' }} />
                          {page.vertical.name}
                        </>
                      ) : (
                        'Ecossistema'
                      )}
                    </span>
                  </div>
                  <div className={styles.pageMeta}>
                    <span className={styles.pageSlug}>/{page.slug}</span>
                    <span className={styles.pageDate}>{formatDate(page.updated_at)}</span>
                  </div>
                </div>

                <div className={styles.pageActions}>
                  <button className={styles.btnSmall} onClick={() => router.push(`/editor/${page.id}`)}>
                    Editar
                  </button>
                  <button className={styles.btnSmall} onClick={() => openDuplicate(page)}>
                    Duplicar
                  </button>
                  {page.status === 'published' && (
                    <button className={styles.btnSmall} onClick={() => handleGenerateThumbnail(page)}>
                      {generatingThumbnail === page.id ? 'Gerando...' : 'Thumbnail'}
                    </button>
                  )}
                  {page.status === 'draft' ? (
                    <button className={styles.btnPublish} onClick={() => handleTogglePublish(page)}>
                      Publicar
                    </button>
                  ) : (
                    <button className={styles.btnSmall} onClick={() => handleTogglePublish(page)}>
                      Despublicar
                    </button>
                  )}
                  <button className={styles.btnSmallDanger} onClick={() => openDelete(page)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Nova Página</h2>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome da página</label>
              <input
                className={styles.formInput}
                value={formName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Página iFood Pago"
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Slug (URL)</label>
              <input
                className={styles.formInput}
                value={formSlug}
                onChange={(e) => { setFormSlug(e.target.value); setFormError(''); }}
                placeholder="pagina-ifood-pago"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Vertical</label>
              <select
                className={styles.formSelect}
                value={formVerticalId}
                onChange={(e) => setFormVerticalId(e.target.value)}
              >
                <option value="">Ecossistema (sem vertical)</option>
                {verticals.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            {formError && <p className={styles.formError}>{formError}</p>}

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowCreateModal(false)}>Cancelar</button>
              <button className={styles.btnSubmit} onClick={handleCreate} disabled={formLoading}>
                {formLoading ? 'Criando...' : 'Criar página'}
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
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
              Duplicando <strong>{selectedPage.name}</strong>
            </p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nome da cópia</label>
              <input
                className={styles.formInput}
                value={formName}
                onChange={(e) => handleNameChange(e.target.value)}
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Slug (URL)</label>
              <input
                className={styles.formInput}
                value={formSlug}
                onChange={(e) => { setFormSlug(e.target.value); setFormError(''); }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Vertical</label>
              <select
                className={styles.formSelect}
                value={formVerticalId}
                onChange={(e) => setFormVerticalId(e.target.value)}
              >
                <option value="">Ecossistema (sem vertical)</option>
                {verticals.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            {formError && <p className={styles.formError}>{formError}</p>}

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowDuplicateModal(false)}>Cancelar</button>
              <button className={styles.btnSubmit} onClick={handleDuplicate} disabled={formLoading}>
                {formLoading ? 'Duplicando...' : 'Duplicar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && selectedPage && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Deletar Página</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
              Tem certeza que deseja deletar <strong>{selectedPage.name}</strong>? Essa ação não pode ser desfeita.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
              <button
                className={styles.btnSmallDanger}
                onClick={handleDelete}
                disabled={formLoading}
                style={{ padding: '10px 20px', height: '44px' }}
              >
                {formLoading ? 'Deletando...' : 'Deletar'}
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
