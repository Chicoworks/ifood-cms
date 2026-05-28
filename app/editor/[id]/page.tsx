// @ts-nocheck
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Page, PageContent, Block, BlockType } from '@/types/database';
import { Icon } from '@/components/Icon/Icon';
import styles from './editor.module.css';
import {
  HERO_TYPES,
  CONTENT_TYPES,
  FOOTER_TYPES,
  CONTENT_CATEGORIES,
  BLOCK_TYPE_LABELS,
  createBlock,
  duplicateBlock,
  type GroupKey,
  type ContentType,
} from './block-config';

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || 'http://localhost:3000';

type StructureGroup = {
  key: GroupKey;
  label: string;
  icon: string;
  singleton: boolean;
};

const STRUCTURE_GROUPS: StructureGroup[] = [
  { key: 'hero', label: 'Hero', icon: 'window-dock-top', singleton: true },
  { key: 'content', label: 'Content', icon: 'window-fullscreen', singleton: false },
  { key: 'footer', label: 'Footer', icon: 'window-dock-bottom', singleton: true },
];

const HERO_SET = new Set<BlockType>(HERO_TYPES);
const CONTENT_SET = new Set<BlockType>(CONTENT_TYPES as unknown as BlockType[]);
const FOOTER_SET = new Set<BlockType>(FOOTER_TYPES);

function splitBlocks(blocks: Block[]) {
  const hero: Block[] = [];
  const content: Block[] = [];
  const footer: Block[] = [];
  for (const b of blocks) {
    if (HERO_SET.has(b.type)) hero.push(b);
    else if (FOOTER_SET.has(b.type)) footer.push(b);
    else if (CONTENT_SET.has(b.type)) content.push(b);
  }
  return { hero, content, footer };
}

function combineBlocks(hero: Block[], content: Block[], footer: Block[]): Block[] {
  return [...hero, ...content, ...footer];
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [page, setPage] = useState<Page | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [iframeReady, setIframeReady] = useState(false);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadRef = useRef(true);
  const latestBlocksRef = useRef<Block[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // AI adaptation config
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSaving, setAiSaving] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    hero: true,
    content: true,
    footer: true,
  });
  const [activeGroup, setActiveGroup] = useState<GroupKey | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<ContentType | null>(
    CONTENT_CATEGORIES[0]?.type ?? null
  );
  const structureSectionRef = useRef<HTMLElement>(null);

  const grouped = useMemo(() => splitBlocks(blocks), [blocks]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const sendToIframe = useCallback((type: string, payload: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type, payload }, '*');
    }
  }, []);

  useEffect(() => {
    if (iframeReady) {
      sendToIframe('cms:update-all-blocks', { blocks });
    }
  }, [blocks, iframeReady, sendToIframe]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const { type } = event.data || {};
      if (type === 'landing:ready') setIframeReady(true);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Load page and content
  useEffect(() => {
    async function load() {
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();

      if (pageError || !pageData) {
        router.push('/');
        return;
      }

      setPage(pageData);
      setAiEnabled(pageData.ai_adaptation_enabled ?? false);
      setAiPrompt(pageData.ai_adaptation_prompt ?? '');

      let versionData = await supabase
        .from('page_versions')
        .select('content')
        .eq('page_id', pageId)
        .eq('version_type', 'draft')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!versionData.data) {
        const pubVersionData = await supabase
          .from('page_versions')
          .select('content')
          .eq('page_id', pageId)
          .eq('version_type', 'published')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        versionData = pubVersionData as typeof versionData;
      }

      const content = (versionData.data as any)?.content as PageContent | null;
      setBlocks(content?.blocks ?? []);
      setLoading(false);
    }

    load();
  }, [pageId, router]);

  const saveDraft = useCallback(async (updatedBlocks: Block[], silent = false) => {
    setSaving(true);
    const content: PageContent = { blocks: updatedBlocks };

    const { error } = await supabase.from('page_versions').insert({
      page_id: pageId,
      content: content as unknown as Record<string, unknown>,
      version_type: 'draft' as const,
    } as any);

    if (error) {
      showToast('Erro ao salvar', 'error');
    } else {
      setSaved(true);
      setLastSavedAt(new Date());
      if (!silent) showToast('Rascunho salvo', 'success');
    }
    setSaving(false);
  }, [pageId, showToast]);

  useEffect(() => {
    latestBlocksRef.current = blocks;
    if (initialLoadRef.current) {
      if (!loading) initialLoadRef.current = false;
      return;
    }
    if (saved) return;

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      saveDraft(latestBlocksRef.current, true);
    }, 1500);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [blocks, saved, loading, saveDraft]);

  const handlePublish = async () => {
    if (blocks.length === 0) {
      showToast('Adicione ao menos 1 bloco antes de publicar', 'error');
      return;
    }

    setSaving(true);

    await supabase.from('page_versions').insert({
      page_id: pageId,
      content: { blocks } as unknown as Record<string, unknown>,
      version_type: 'draft' as const,
    } as any);

    await supabase.from('page_versions').insert({
      page_id: pageId,
      content: { blocks } as unknown as Record<string, unknown>,
      version_type: 'published' as const,
    } as any);

    // @ts-ignore
    await supabase.from('pages').update({ status: 'published' as const }).eq('id', pageId);

    setSaving(false);
    setSaved(true);
    setLastSavedAt(new Date());
    showToast('Página publicada!', 'success');

    const { data } = await supabase.from('pages').select('*').eq('id', pageId).single();
    if (data) setPage(data);

    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const saveAiConfig = async () => {
    setAiSaving(true);
    // @ts-ignore
    const { error } = await supabase
      .from('pages')
      .update({
        ai_adaptation_enabled: aiEnabled,
        ai_adaptation_prompt: aiPrompt || null,
      })
      .eq('id', pageId);

    if (error) {
      showToast('Erro ao salvar config IA', 'error');
    } else {
      showToast('Config IA salva', 'success');
    }
    setAiSaving(false);
  };

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddClick = (key: GroupKey) => {
    setActiveGroup((prev) => (prev === key ? null : key));
    if (key === 'content') {
      setExpandedCategory(CONTENT_CATEGORIES[0]?.type ?? null);
    }
  };

  const updateBlocks = (nextBlocks: Block[]) => {
    setBlocks(nextBlocks);
    setSaved(false);
  };

  const handleSelectTheme = (groupKey: GroupKey, type: BlockType, theme: number) => {
    const newBlock = createBlock(type, theme);
    const { hero, content, footer } = grouped;
    let next: Block[];
    if (groupKey === 'hero') {
      next = combineBlocks([newBlock], content, footer);
    } else if (groupKey === 'footer') {
      next = combineBlocks(hero, content, [newBlock]);
    } else {
      next = combineBlocks(hero, [...content, newBlock], footer);
    }
    updateBlocks(next);
    setActiveGroup(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    updateBlocks(blocks.filter((b) => b.id !== blockId));
  };

  const handleDuplicateBlock = (blockId: string) => {
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const original = blocks[idx];
    if (HERO_SET.has(original.type) || FOOTER_SET.has(original.type)) {
      return;
    }
    const dup = duplicateBlock(original);
    const next = [...blocks.slice(0, idx + 1), dup, ...blocks.slice(idx + 1)];
    updateBlocks(next);
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const { hero, content, footer } = grouped;
    const idx = content.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= content.length) return;
    const nextContent = [...content];
    [nextContent[idx], nextContent[targetIdx]] = [nextContent[targetIdx], nextContent[idx]];
    updateBlocks(combineBlocks(hero, nextContent, footer));
  };

  useEffect(() => {
    if (!activeGroup) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        structureSectionRef.current &&
        !structureSectionRef.current.contains(e.target as Node)
      ) {
        setActiveGroup(null);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveGroup(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeGroup]);

  if (loading) {
    return <div className={styles.loading}>Carregando editor...</div>;
  }

  if (!page) return null;

  const iframeSrc = `${LANDING_URL}/p/${page.slug}?edit=true`;

  const getBlocksForGroup = (key: GroupKey): Block[] => {
    if (key === 'hero') return grouped.hero;
    if (key === 'footer') return grouped.footer;
    return grouped.content;
  };

  return (
    <div className={styles.editorLayout}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/')}>
            <Icon name="chevron-left" size={20} />
          </button>
          <div>
            <h1 className={styles.pageTitle}>{page.name}</h1>
            <span className={styles.pageSlug}>/{page.slug}</span>
          </div>
        </div>
        <div className={styles.topBarRight}>
          <span className={styles.saveStatus} aria-live="polite">
            {saving
              ? 'Salvando…'
              : !saved
                ? 'Alterações pendentes…'
                : lastSavedAt
                  ? `Salvo às ${formatTime(lastSavedAt)}`
                  : 'Salvo'}
          </span>
          <a
            className={styles.btnOutline}
            href={`${LANDING_URL}/p/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir página pública em nova aba"
          >
            <Icon name="eye-on" size={14} />
            <span>Abrir no browser</span>
          </a>
          <button className={styles.btnPublish} onClick={handlePublish} disabled={saving}>
            Publicar
          </button>
        </div>
      </header>

      {/* Main editor area */}
      <div className={styles.editorBody}>
        {/* Preview */}
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            className={styles.iframe}
            title="Preview"
          />
          {!iframeReady && (
            <div className={styles.iframeLoading}>Carregando preview...</div>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidePanel}>
          {/* AI card */}
          <div className={styles.card}>
            <button
              className={styles.cardHeader}
              onClick={() => setShowAiPanel(!showAiPanel)}
              type="button"
              style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
            >
              <span className={styles.cardHeaderLeft}>
                <span className={styles.cardIcon}>
                  <Icon name="bot" size={16} />
                </span>
                <span className={styles.cardTitleSecondary}>Personalização com IA</span>
              </span>
              <span
                className={styles.cardChevron}
                style={{ transform: showAiPanel ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}
              >
                <Icon name="chevron-down" size={20} />
              </span>
            </button>

            {showAiPanel && (
              <div className={styles.aiPanelBody}>
                <label className={styles.aiToggleRow}>
                  <span className={styles.aiToggleLabel}>Adaptar conteúdo por UTM</span>
                  <button
                    className={`${styles.aiToggleSwitch} ${aiEnabled ? styles.aiToggleSwitchOn : ''}`}
                    onClick={() => setAiEnabled(!aiEnabled)}
                    role="switch"
                    aria-checked={aiEnabled}
                  >
                    <span className={styles.aiToggleKnob} />
                  </button>
                </label>

                {aiEnabled && (
                  <div className={styles.aiPromptGroup}>
                    <label className={styles.aiPromptLabel}>Instruções para a IA (opcional)</label>
                    <textarea
                      className={styles.aiPromptInput}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ex: Adapte o tom para ser mais informal quando a campanha for de redes sociais."
                      rows={4}
                    />
                    <span className={styles.aiPromptHint}>
                      A IA usará os UTM params para adaptar textos automaticamente.
                    </span>
                  </div>
                )}

                <button
                  className={styles.aiSaveBtn}
                  onClick={saveAiConfig}
                  disabled={aiSaving}
                >
                  {aiSaving ? 'Salvando...' : 'Salvar configuração'}
                </button>
              </div>
            )}
          </div>

          {/* Estrutura */}
          <section className={styles.panelSection} ref={structureSectionRef}>
            <h2 className={styles.panelSectionLabel}>Estrutura</h2>

            {STRUCTURE_GROUPS.map((group) => {
              const isExpanded = expandedGroups[group.key];
              const isActive = activeGroup === group.key;
              const isDimmed = activeGroup !== null && activeGroup !== group.key;
              const groupBlocks = getBlocksForGroup(group.key);
              const showAddSlot = group.singleton ? groupBlocks.length === 0 : true;

              const cardClassName = [
                styles.card,
                styles.cardInteractive,
                isActive ? styles.cardActive : '',
                isDimmed ? styles.cardDimmed : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div key={group.key} className={styles.cardWrapper}>
                  <div className={cardClassName}>
                    <button
                      className={styles.cardHeader}
                      onClick={() => toggleGroup(group.key)}
                      type="button"
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
                    >
                      <span className={styles.cardHeaderLeft}>
                        <span className={styles.cardIcon}>
                          <Icon name={group.icon} size={16} />
                        </span>
                        <span className={styles.cardTitle}>{group.label}</span>
                      </span>
                      <span
                        className={styles.cardChevron}
                        style={{ transform: isExpanded ? 'none' : 'rotate(-90deg)', transition: 'transform 150ms' }}
                      >
                        <Icon name="chevron-down" size={20} />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className={styles.blockList}>
                        {groupBlocks.map((block, idx) => {
                          const canMoveUp = group.key === 'content' && idx > 0;
                          const canMoveDown = group.key === 'content' && idx < groupBlocks.length - 1;
                          const canDuplicate = group.key === 'content';
                          return (
                            <div key={block.id} className={styles.blockItem}>
                              <div className={styles.blockItemHeader}>
                                <div className={styles.blockItemLabelGroup}>
                                  <span className={styles.blockDragHandle} aria-label="Reordenar">
                                    <Icon name="draggable-six-dots" size={16} />
                                  </span>
                                  <span className={styles.blockItemLabel}>
                                    {BLOCK_TYPE_LABELS[block.type]} / Tema {block.theme ?? 1}
                                  </span>
                                </div>
                                <div className={styles.blockItemActions}>
                                  {group.key === 'content' && (
                                    <>
                                      <button
                                        type="button"
                                        className={styles.blockAction}
                                        onClick={() => handleMoveBlock(block.id, 'down')}
                                        disabled={!canMoveDown}
                                        aria-label="Mover para baixo"
                                      >
                                        <Icon name="chevron-big-down" size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        className={styles.blockAction}
                                        onClick={() => handleMoveBlock(block.id, 'up')}
                                        disabled={!canMoveUp}
                                        aria-label="Mover para cima"
                                      >
                                        <Icon name="chevron-big-up" size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        className={styles.blockAction}
                                        onClick={() => handleDuplicateBlock(block.id)}
                                        disabled={!canDuplicate}
                                        aria-label="Duplicar"
                                      >
                                        <Icon name="copy-default" size={16} />
                                      </button>
                                    </>
                                  )}
                                  <button
                                    type="button"
                                    className={styles.blockAction}
                                    onClick={() => handleDeleteBlock(block.id)}
                                    aria-label="Deletar"
                                  >
                                    <Icon name="delete-dustbin-01" size={16} />
                                  </button>
                                </div>
                              </div>
                              <div className={styles.blockItemForm}>
                                <span className={styles.blockItemFormText}>Form do tema</span>
                              </div>
                            </div>
                          );
                        })}

                        {showAddSlot && (
                          <button
                            type="button"
                            className={styles.addSlot}
                            onClick={() => handleAddClick(group.key)}
                            aria-label={`Adicionar bloco em ${group.label}`}
                            aria-expanded={isActive}
                          >
                            <span className={styles.addSlotIcon}>
                              <Icon name="plus-default" size={20} />
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {isActive && group.key !== 'content' && (
                    <div className={styles.templatePicker} role="dialog" aria-label={`Escolha o template do ${group.label.toLowerCase()}`}>
                      <h3 className={styles.templatePickerTitle}>
                        Escolha o template do {group.label.toLowerCase()}
                      </h3>
                      <div className={styles.themeList}>
                        {[1, 2, 3].map((n) => (
                          <button
                            key={n}
                            type="button"
                            className={styles.themeCard}
                            onClick={() => handleSelectTheme(group.key, group.key === 'hero' ? 'hero' : 'footer', n)}
                          >
                            <span className={styles.themePreview} aria-hidden="true" />
                            <span className={styles.themeLabel}>Tema {n}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isActive && group.key === 'content' && (
                    <div className={styles.templatePicker} role="dialog" aria-label="Escolha o bloco para o content">
                      {CONTENT_CATEGORIES.map((cat) => {
                        const isCatExpanded = expandedCategory === cat.type;
                        return (
                          <div key={cat.type} className={styles.categoryItem}>
                            <button
                              type="button"
                              className={styles.categoryHeader}
                              onClick={() =>
                                setExpandedCategory((prev) => (prev === cat.type ? null : cat.type))
                              }
                              aria-expanded={isCatExpanded}
                            >
                              <span className={styles.categoryLabel}>{cat.label}</span>
                              <span
                                className={styles.categoryChevron}
                                style={{ transform: isCatExpanded ? 'rotate(180deg)' : 'none' }}
                              >
                                <Icon name="chevron-down" size={20} />
                              </span>
                            </button>
                            {isCatExpanded && (
                              <div className={styles.themeList}>
                                {[1, 2, 3].map((n) => (
                                  <button
                                    key={n}
                                    type="button"
                                    className={styles.themeCard}
                                    onClick={() => handleSelectTheme('content', cat.type as BlockType, n)}
                                  >
                                    <span className={styles.themePreview} aria-hidden="true" />
                                    <span className={styles.themeLabel}>Tema {n}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </aside>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
