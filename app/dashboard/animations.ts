'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize dashboard animations
 * Apply GSAP scroll animations and microinteractions
 */
export function initDashboardAnimations() {
  // Animate greeting on mount
  const greeting = document.querySelector('[data-animation="greeting"]');
  if (greeting) {
    gsap.from(greeting, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: 'power2.out',
    });
  }

  // Animate filter buttons with stagger
  const filterButtons = document.querySelectorAll('[data-animation="filter-button"]');
  if (filterButtons.length) {
    gsap.from(filterButtons, {
      duration: 0.6,
      opacity: 0,
      x: -10,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2,
    });
  }

  // Animate metric cards on scroll
  const metricCards = document.querySelectorAll('[data-animation="metric-card"]');
  if (metricCards.length) {
    metricCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: index * 0.05,
      });
    });
  }

  // Promo card special animation
  const promoCard = document.querySelector('[data-animation="promo-card"]');
  if (promoCard) {
    gsap.from(promoCard, {
      scrollTrigger: {
        trigger: promoCard,
        start: 'top 85%',
        once: true,
      },
      duration: 0.8,
      opacity: 0,
      scale: 0.95,
      ease: 'back.out(1.7)',
    });
  }

  // Add hover animations to interactive elements
  setupHoverAnimations();

  // Setup parallax effect for cards
  setupParallaxEffects();
}

/**
 * Setup hover animations for buttons and cards
 */
function setupHoverAnimations() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        duration: 0.3,
        y: -2,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        ease: 'power2.out',
      });
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('[data-animation="metric-card"], [data-animation="promo-card"]');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -4,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        ease: 'power2.out',
      });
    });
  });
}

/**
 * Setup parallax effect for scrolling
 */
function setupParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax="true"]');

  parallaxElements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        scrub: 1,
        markers: false,
      },
      y: -50,
      ease: 'none',
    });
  });
}

/**
 * Animate page transitions
 */
export function animatePageTransition() {
  const content = document.querySelector('[data-animation="page-content"]');
  if (content) {
    gsap.from(content, {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.inOut',
    });
  }
}

/**
 * Cleanup animations
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
