'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Icon } from '@/components/Icon/Icon';
import type { Page } from '@/types/database';
import styles from './home.module.css';

interface ActivityLog {
  id: string;
  page: string;
  action: 'created' | 'edited' | 'deleted';
  timestamp: Date;
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = useCallback(async () => {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false });

    setPages(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

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

  // Stats
  const totalPages = pages.length;
  const publishedPages = pages.filter(p => p.status === 'published').length;
  const draftPages = pages.filter(p => p.status === 'draft').length;

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
              <strong> {publishedPages}</strong> ao vivo •
              <strong> {draftPages}</strong> rascunho{draftPages !== 1 ? 's' : ''}
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
              onClick={() => router.push('/pages')}
            >
              <Icon name="plus-default" size={16} />
              <span>Gerenciar Páginas</span>
            </button>
          </div>
        </section>

        {/* ====== CONTENT ====== */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>Carregando...</div>
          ) : pages.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><Icon name="file-default" size={20} /></span>
              <h3>Comece criando sua primeira página</h3>
              <p>Crie, edite e publique landing pages em minutos</p>
              <button
                className={styles.btnCreatePage}
                onClick={() => router.push('/pages')}
              >
                <Icon name="plus-default" size={16} />
                <span>Criar Primeira Página</span>
              </button>
            </div>
          ) : (
            <>
              {/* Recent Pages */}
              <section className={styles.pagesSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.featuredTitle}>Páginas Recentes</h2>
                  <button className={styles.viewAllLink} onClick={() => router.push('/pages')}>
                    Ver todas →
                  </button>
                </div>

                <div className={styles.pagesGrid}>
                  {pages.slice(0, 4).map((page, idx) => {
                    const fallbackGradients = [
                      { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', glow: 'rgba(15, 52, 96, 0.5)' },
                      { bg: 'linear-gradient(135deg, #2d1b36 0%, #44133a 50%, #6b1d47 100%)', glow: 'rgba(107, 29, 71, 0.5)' },
                      { bg: 'linear-gradient(135deg, #1a2a1a 0%, #1e3a1e 50%, #2d5a2d 100%)', glow: 'rgba(45, 90, 45, 0.5)' },
                      { bg: 'linear-gradient(135deg, #2a1f0f 0%, #3d2e12 50%, #5a4318 100%)', glow: 'rgba(90, 67, 24, 0.5)' },
                    ];
                    const fallback = fallbackGradients[idx % fallbackGradients.length];
                    const hasThumbnail = !!page.thumbnail_url;
                    const bgStyle = hasThumbnail
                      ? { backgroundImage: `url(${page.thumbnail_url})` }
                      : { background: fallback.bg };

                    return (
                      <div
                        key={page.id}
                        className={styles.pageCard}
                        style={{ '--card-glow': hasThumbnail ? 'rgba(235, 0, 51, 0.3)' : fallback.glow } as React.CSSProperties}
                        onClick={() => router.push(`/editor/${page.id}`)}
                      >
                        <div className={styles.pageCardBg} style={bgStyle} />
                        <div className={styles.pageCardOverlay} />
                        <div className={styles.pageCardContent}>
                          <span className={`${styles.pageCardStatus} ${page.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                            {page.status === 'published' ? 'Publicada' : 'Rascunho'}
                          </span>
                          <h3 className={styles.pageCardTitle}>{page.name}</h3>
                          <span className={styles.pageCardSlug}>/{page.slug}</span>
                          <div className={styles.pageCardMeta}>
                            <span>{formatDate(page.updated_at)}</span>
                          </div>
                          <div className={styles.pageCardAction}>
                            <span>Editar página</span>
                            <span className={styles.pageCardArrow}>
                              <Icon name="chevron-right" size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Activity Card */}
                  {activityLog.length > 0 && (
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
    </div>
  );
}
