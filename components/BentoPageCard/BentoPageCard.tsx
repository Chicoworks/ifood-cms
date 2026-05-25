'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Icon } from '@/components/Icon/Icon';
import { StatusBadge } from '@/components/ui/status-badge';
import type { StatusType } from '@/components/ui/status-badge';
import type { Page } from '@/types/database';
import styles from './BentoPageCard.module.css';

interface BentoPageCardProps {
  pages: Page[];
  formatDate: (dateStr: string) => string;
}

const FALLBACK_GRADIENTS = [
  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { bg: 'linear-gradient(135deg, #2d1b36 0%, #44133a 50%, #6b1d47 100%)' },
  { bg: 'linear-gradient(135deg, #1a2a1a 0%, #1e3a1e 50%, #2d5a2d 100%)' },
  { bg: 'linear-gradient(135deg, #2a1f0f 0%, #3d2e12 50%, #5a4318 100%)' },
];

const STATUS_COLORS: Record<string, string> = {
  published: '#4cd8b9',
  draft: '#9fa0aa',
  running: '#4cd8b9',
  paused: '#ebb400',
  completed: '#787878',
};

export function BentoPageCard({ pages, formatDate }: BentoPageCardProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const depth1Ref = useRef<HTMLDivElement>(null);
  const depth2Ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activePage = pages[activeIndex];

  // ===== Entrance animation =====
  useEffect(() => {
    if (!cardRef.current || pages.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    // Card entrance
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Depth layers stagger
    const depthLayers = [depth2Ref.current, depth1Ref.current].filter(Boolean);
    if (depthLayers.length) {
      tl.fromTo(depthLayers,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      );
    }

    return () => { tl.kill(); };
  }, [pages.length]);

  // ===== Tab indicator positioning =====
  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (!activeTab || !indicatorRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.to(indicatorRef.current, {
      y: activeTab.offsetTop,
      height: activeTab.offsetHeight,
      duration: prefersReducedMotion ? 0 : 0.3,
      ease: 'power2.out',
    });
  }, [activeIndex]);

  // ===== Content enter animation =====
  useEffect(() => {
    if (!contentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, x: 0 });
      return;
    }

    const direction = activeIndex > prevIndexRef.current ? 1 : -1;

    gsap.fromTo(contentRef.current,
      { opacity: 0, x: direction * 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'back.out(1.4)',
        onComplete: () => { isAnimatingRef.current = false; },
      }
    );

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ===== Tab change handler =====
  const handleTabChange = useCallback((newIndex: number) => {
    if (newIndex === activeIndex || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !contentRef.current) {
      setActiveIndex(newIndex);
      return;
    }

    const direction = newIndex > activeIndex ? 1 : -1;

    gsap.to(contentRef.current, {
      opacity: 0,
      x: -direction * 30,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
      },
    });
  }, [activeIndex]);

  if (pages.length === 0) return null;

  const fallback = FALLBACK_GRADIENTS[activeIndex % FALLBACK_GRADIENTS.length];
  const hasThumbnail = !!activePage?.thumbnail_url;
  const previewStyle = hasThumbnail
    ? { backgroundImage: `url(${activePage.thumbnail_url})` }
    : { background: fallback.bg };

  return (
    <div className={styles.bentoCard} ref={cardRef}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>Workspace</span>
          <h2 className={styles.title}>
            Gerencie e edite suas landing pages em um só lugar
          </h2>
        </div>
        <button className={styles.viewAll} onClick={() => router.push('/pages')}>
          Ver todas
          <Icon name="chevron-right" size={12} />
        </button>
      </div>

      {/* Window with depth layers */}
      <div className={styles.depthContainer}>
        <div className={styles.depthLayer2} ref={depth2Ref} />
        <div className={styles.depthLayer1} ref={depth1Ref} />

        <div className={styles.windowFrame}>
          {/* Chrome bar */}
          <div className={styles.windowChrome}>
            <div className={styles.windowDots}>
              <span className={styles.dot} style={{ background: '#FF5F57' }} />
              <span className={styles.dot} style={{ background: '#FEBC2E' }} />
              <span className={styles.dot} style={{ background: '#28C840' }} />
            </div>
            <span className={styles.windowLabel}>CMS Workspace</span>
          </div>

          {/* Body: sidebar + content */}
          <div className={styles.windowBody}>
            {/* Sidebar tabs */}
            <div className={styles.sidebarPanel}>
              <span className={styles.sidebarLabel}>Páginas</span>
              <div className={styles.tabList}>
                <div className={styles.tabIndicator} ref={indicatorRef} />
                {pages.map((page, idx) => (
                  <button
                    key={page.id}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    className={`${styles.tabItem}${activeIndex === idx ? ` ${styles.tabItemActive}` : ''}`}
                    onClick={() => handleTabChange(idx)}
                  >
                    <span
                      className={styles.tabDot}
                      style={{ backgroundColor: STATUS_COLORS[page.status] || '#9fa0aa' }}
                    />
                    <span className={styles.tabLabel}>{page.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className={styles.contentArea}>
              <div className={styles.contentInner} ref={contentRef}>
                {activePage && (
                  <>
                    <div className={styles.contentHeader}>
                      <span className={styles.contentEyebrow}>{activePage.name}</span>
                      <span className={styles.contentDescription}>
                        /{activePage.slug}
                      </span>
                    </div>

                    <div className={styles.contentPreview} style={previewStyle} />

                    <div className={styles.contentMeta}>
                      <StatusBadge status={activePage.status as StatusType} size="sm" />
                      <span className={styles.contentDate}>
                        {formatDate(activePage.updated_at)}
                      </span>
                    </div>

                    <div
                      className={styles.contentAction}
                      onClick={() => router.push(`/editor/${activePage.id}`)}
                    >
                      <span>Editar página</span>
                      <span className={styles.contentArrow}>
                        <Icon name="chevron-right" size={14} />
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.contentFade} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
