'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { initDashboardAnimations, cleanupAnimations } from './animations';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'ecosystem'>('home');

  // Initialize GSAP animations on mount
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      initDashboardAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupAnimations();
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getFirstName = () => {
    const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';
    return fullName.split(' ')[0];
  };

  // Get user avatar from metadata or use default
  const userAvatar = user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

  return (
    <div className={styles.window}>
      {/* OS Header */}
      <div className={styles.osHeader}>
        {/* Left Actions */}
        <div className={styles.actionsLeft}>
          <button className={styles.iconButton} title="Menu" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        {/* Center - Store Info & Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.storeInfo}>
            <img
              src={userAvatar}
              alt="Store"
              className={styles.storeAvatar}
            />
            <div className={styles.storeText}>
              <p className={styles.storeName}>Projeto Ecossistema</p>
              <div className={styles.statusDot}></div>
            </div>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'home' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Início</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <button
              className={`${styles.tab} ${activeTab === 'ecosystem' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('ecosystem')}
            >
              <span>Página Ecossistema</span>
              <span className={styles.badge}>2</span>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className={styles.actionsRight}>
          <button className={styles.iconButton} title="Notifications" aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className={styles.notificationDot}></span>
          </button>

          <button className={styles.iconButton} title="Settings" aria-label="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>

          <button className={styles.accountButton} title={user?.email}>
            <img
              src={userAvatar}
              alt="Account"
              className={styles.accountAvatar}
            />
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.menuButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Início</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentPage}>
        {/* Greeting */}
        <div className={styles.greeting} data-animation="greeting">
          <h1>
            {getGreeting()}, {getFirstName()}!
          </h1>
        </div>

        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <button className={styles.filterButton} data-animation="filter-button">
              <span>Canais</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className={styles.filterButton} data-animation="filter-button">
              <span>Lojas</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className={styles.filterButton} data-animation="filter-button">
              <span>Este mês</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          <button className={styles.performanceButton}>
            Conferir desempenho
          </button>
        </div>

        {/* Operational Section */}
        <section className={styles.section}>
          <div className={styles.cardsContainer}>
            {[0, 1].map((idx) => (
              <div key={idx} className={styles.largeCard} data-animation="metric-card">
                <div className={styles.cardTop}>
                  <div className={styles.skeleton} style={{ width: '122px', height: '12.25px' }}></div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.skeleton} style={{ width: '94px', height: '21px' }}></div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div className={styles.skeleton} style={{ width: '12px', height: '10.5px' }}></div>
                    <div className={styles.skeleton} style={{ width: '15px', height: '10.5px' }}></div>
                  </div>
                </div>

                {/* Sub cards */}
                <div className={styles.subCards}>
                  {[0, 1].map((subIdx) => (
                    <div key={subIdx} className={styles.smallCard}>
                      <div className={styles.cardTop}>
                        <div className={styles.skeleton} style={{ width: '185px', height: '12.25px' }}></div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.skeleton} style={{ width: '94px', height: '21px' }}></div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <div className={styles.skeleton} style={{ width: '12px', height: '10.5px' }}></div>
                          <div className={styles.skeleton} style={{ width: '15px', height: '10.5px' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Section */}
        <section className={styles.section}>
          <div className={styles.promoContainer}>
            {/* iFood Shop Card */}
            <div className={styles.promoCard} data-animation="promo-card">
              <div className={styles.promoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className={styles.promoContent}>
                <h3 className={styles.promoTitle}>Compre no iFood Shop</h3>
                <p className={styles.promoDesc}>Há 12 itens com o estoque baixo, compre mais insumos via iFood Shop</p>
                <p className={styles.promoSubtext}>Descontos de R$ 100 na primeira compra</p>
              </div>
              <button className={styles.promoButton}>Comprar no iFood Shop</button>
            </div>

            {/* Secondary metric cards */}
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className={styles.smallCard}>
                <div className={styles.cardTop}>
                  <div className={styles.skeleton} style={{ width: '58px', height: '12.25px' }}></div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.skeleton} style={{ width: '94px', height: '21px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
