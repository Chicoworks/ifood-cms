'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Experiment, ExperimentVariant, Block, PageContent } from '@/types/database';
import { HeroEditor } from '../../editor/[id]/components/editors/HeroEditor';
import { VisionEditor } from '../../editor/[id]/components/editors/VisionEditor';
import { GrowthEditor } from '../../editor/[id]/components/editors/GrowthEditor';
import { IntegratedEditor } from '../../editor/[id]/components/editors/IntegratedEditor';
import { ResultsEditor } from '../../editor/[id]/components/editors/ResultsEditor';
import { FAQEditor } from '../../editor/[id]/components/editors/FAQEditor';
import { NavbarEditor } from '../../editor/[id]/components/editors/NavbarEditor';
import { FooterEditor } from '../../editor/[id]/components/editors/FooterEditor';
import styles from './experiment-detail.module.css';

const typeLabels: Record<string, string> = {
  navbar: 'Navbar',
  hero: 'Hero',
  vision: 'Social Proof',
  growth: 'Growth',
  integrated: 'Features',
  results: 'Depoimentos',
  faq: 'FAQ',
  footer: 'Footer',
};

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  running: 'Rodando',
  paused: 'Pausado',
  completed: 'Concluído',
};

export default function ExperimentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const experimentId = params.id as string;

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [variants, setVariants] = useState<ExperimentVariant[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Variant B editing state
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [variantBlockData, setVariantBlockData] = useState<any>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load experiment, variants, and page blocks
  useEffect(() => {
    async function load() {
      // Fetch experiment
      // @ts-ignore
      const { data: exp } = await supabase
        .from('experiments')
        .select('*')
        .eq('id', experimentId)
        .single();

      if (!exp) { router.push('/experiments'); return; }
      setExperiment(exp);

      // Fetch variants
      // @ts-ignore
      const { data: vars } = await supabase
        .from('experiment_variants')
        .select('*')
        .eq('experiment_id', experimentId)
        .order('is_control', { ascending: false });

      setVariants((vars as any) || []);

      // Fetch page blocks (from latest draft or published version)
      // @ts-ignore
      let versionData = await supabase
        .from('page_versions')
        .select('content')
        // @ts-ignore
        .eq('page_id', exp.page_id)
        .eq('version_type', 'draft')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!versionData.data) {
        // @ts-ignore
        const pubVersionData = await supabase
          .from('page_versions')
          .select('content')
          // @ts-ignore
          .eq('page_id', exp.page_id)
          .eq('version_type', 'published')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        versionData = pubVersionData;
      }

      const content = (versionData.data as any)?.content as PageContent | null;
      setBlocks(content?.blocks ?? []);

      // If variant B already has a target block, load it
      const variantB = ((vars as any) || []).find((v: any) => !v.is_control);
      if (variantB?.target_block_id) {
        setSelectedBlockId(variantB.target_block_id);
        if (variantB.block_data) {
          setVariantBlockData(variantB.block_data);
        } else {
          // Initialize with original block data
          const originalBlock = (content?.blocks ?? []).find(b => b.id === variantB.target_block_id);
          if (originalBlock) setVariantBlockData(JSON.parse(JSON.stringify(originalBlock.data)));
        }
      }

      setLoading(false);
    }

    load();
  }, [experimentId, router]);

  // When user selects a block to test
  const handleSelectBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setVariantBlockData(JSON.parse(JSON.stringify(block.data)));
    }
  };

  // Save variant B configuration
  const handleSave = async () => {
    const variantB = variants.find(v => !v.is_control);
    if (!variantB || !selectedBlockId || !variantBlockData) return;

    setSaving(true);

    // @ts-ignore
    const { error } = await (supabase as any)
      .from('experiment_variants')
      .update({
        target_block_id: selectedBlockId,
        block_data: variantBlockData,
      })
      .eq('id', variantB.id);

    if (error) {
      showToast('Erro ao salvar variante', 'error');
    } else {
      showToast('Variante salva', 'success');
    }

    setSaving(false);
  };

  // Render the appropriate editor for the selected block type
  const renderVariantEditor = () => {
    if (!selectedBlockId || !variantBlockData) return null;

    const originalBlock = blocks.find(b => b.id === selectedBlockId);
    if (!originalBlock) return null;

    // Create a fake block object for the editor
    const fakeBlock = { ...originalBlock, data: variantBlockData } as Block;
    const onUpdate = (updated: Block) => setVariantBlockData(updated.data);

    switch (originalBlock.type) {
      case 'hero': return <HeroEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'vision': return <VisionEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'growth': return <GrowthEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'integrated': return <IntegratedEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'results': return <ResultsEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'faq': return <FAQEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'navbar': return <NavbarEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      case 'footer': return <FooterEditor block={fakeBlock as any} onUpdate={onUpdate as any} />;
      default: return <p>Editor não disponível</p>;
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!experiment) return null;

  const variantB = variants.find(v => !v.is_control);
  const isConfigured = variantB?.target_block_id && variantB?.block_data;

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/experiments')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div>
            <h1 className={styles.title}>{experiment.name}</h1>
            <span className={styles.subtitle}>
              {statusLabels[experiment.status]} &middot; {experiment.type === 'block' ? 'Teste de bloco' : 'Teste de página'} &middot; {experiment.traffic_percentage}% / {100 - experiment.traffic_percentage}%
            </span>
          </div>
        </div>
        <div className={styles.topBarRight}>
          <button className={styles.btnSave} onClick={handleSave} disabled={saving || !selectedBlockId}>
            {saving ? 'Salvando...' : 'Salvar variante'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.content}>
        {experiment.type === 'block' ? (
          <div className={styles.columns}>
            {/* Left: Block selector */}
            <div className={styles.leftColumn}>
              <h2 className={styles.sectionTitle}>1. Selecione o bloco para testar</h2>
              <div className={styles.blockList}>
                {blocks.map((block) => (
                  <button
                    key={block.id}
                    className={`${styles.blockItem} ${selectedBlockId === block.id ? styles.blockItemActive : ''}`}
                    onClick={() => handleSelectBlock(block.id)}
                  >
                    <span className={styles.blockIcon}>{block.type.charAt(0).toUpperCase()}</span>
                    <div className={styles.blockInfo}>
                      <span className={styles.blockName}>{typeLabels[block.type] || block.type}</span>
                      <span className={styles.blockId}>{block.id}</span>
                    </div>
                    {selectedBlockId === block.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EB0033" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Variant editor */}
            <div className={styles.rightColumn}>
              {selectedBlockId ? (
                <>
                  <div className={styles.editorHeader}>
                    <h2 className={styles.sectionTitle}>2. Edite a Variante B</h2>
                    <span className={styles.editorHint}>Altere os campos que deseja testar</span>
                  </div>

                  <div className={styles.editorCompare}>
                    {/* Original */}
                    <div className={styles.editorPanel}>
                      <div className={styles.panelLabel}>
                        <span className={styles.panelBadgeA}>A</span>
                        Controle (original)
                      </div>
                      <div className={styles.panelBody}>
                        <div className={styles.panelDisabled}>
                          {(() => {
                            const block = blocks.find(b => b.id === selectedBlockId);
                            if (!block) return null;
                            const fakeBlock = block as Block;
                            const noop = () => {};
                            switch (block.type) {
                              case 'hero': return <HeroEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'vision': return <VisionEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'growth': return <GrowthEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'integrated': return <IntegratedEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'results': return <ResultsEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'faq': return <FAQEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'navbar': return <NavbarEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              case 'footer': return <FooterEditor block={fakeBlock as any} onUpdate={noop as any} />;
                              default: return null;
                            }
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Variant */}
                    <div className={styles.editorPanel}>
                      <div className={styles.panelLabel}>
                        <span className={styles.panelBadgeB}>B</span>
                        Variante
                      </div>
                      <div className={styles.panelBody}>
                        {renderVariantEditor()}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.placeholder}>
                  <p>Selecione um bloco na lista ao lado para configurar a variante B</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <p>Para testes de página, configure a página alternativa na tabela de variantes</p>
          </div>
        )}
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
