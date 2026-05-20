'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { WebGLShader } from '@/components/WebGLShader/WebGLShader';
import styles from './login.module.css';

const quotes = [
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs', role: 'Co-founder, Apple' },
  { text: 'Good design is obvious. Great design is transparent.', author: 'Joe Sparano', role: 'Designer' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames', role: 'Designer & Architect' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', role: 'Polymath' },
  { text: 'People ignore design that ignores people.', author: 'Frank Chimero', role: 'Designer & Writer' },
  { text: 'Design is intelligence made visible.', author: 'Alina Wheeler', role: 'Brand Consultant' },
  { text: 'Every great design begins with an even better story.', author: 'Lorinda Mamo', role: 'Designer' },
  { text: 'White space is to be regarded as an active element, not a passive background.', author: 'Jan Tschichold', role: 'Typographer' },
  { text: 'Make it simple, but significant.', author: 'Don Draper', role: 'Mad Men' },
  { text: 'A user interface is like a joke. If you have to explain it, it\'s not that good.', author: 'Martin LeBlanc', role: 'CEO, Iconfinder' },
  { text: 'Design creates culture. Culture shapes values. Values determine the future.', author: 'Robert L. Peters', role: 'Designer' },
  { text: 'Less, but better.', author: 'Dieter Rams', role: 'Industrial Designer, Braun' },
  { text: 'Content precedes design. Design in the absence of content is not design, it\'s decoration.', author: 'Jeffrey Zeldman', role: 'Web Designer' },
  { text: 'If you think good design is expensive, you should look at the cost of bad design.', author: 'Ralf Speth', role: 'CEO, Jaguar Land Rover' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs', role: 'Software Engineer' },
];

export default function LoginPage() {
  const searchParams = useSearchParams();
  const domainError = searchParams.get('error') === 'domain';

  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          hd: 'ifood.com.br',
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'https://www.googleapis.com/auth/analytics.readonly',
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className={styles.page}>
      {/* Full-screen WebGL background with rounded corners */}
      <div className={styles.backdrop}>
        <WebGLShader />
        <div className={styles.backdropOverlay} />
      </div>

      {/* Content layer — sits on top of the shader */}
      <div className={styles.content}>
        {/* Quote — bottom left */}
        <div className={styles.quoteArea}>
          <blockquote className={styles.quoteText}>
            {quote.text}
          </blockquote>
          <div className={styles.quoteAttribution}>
            <span className={styles.quoteAuthor}>{quote.author}</span>
            <span className={styles.quoteRole}>{quote.role}</span>
          </div>
        </div>

        {/* Login card — floating on the right */}
        <div className={styles.loginCard}>
          {/* Form */}
          <div className={styles.formArea}>
            <h1 className={styles.formTitle}>Acesse o iFood Pages</h1>
            <p className={styles.formSubtitle}>
              Faça login para acessar o painel de gerenciamento
            </p>

            {/* Google Sign-In */}
            <button className={styles.googleBtn} onClick={handleGoogleLogin}>
              <img src="/ifood-icon.png" alt="" width={22} height={22} className={styles.btnIcon} />
              Entrar com Google
            </button>

            {/* Error */}
            {domainError && (
              <p className={styles.error}>Acesso permitido apenas para emails @ifood.com.br</p>
            )}
          </div>

          <div className={styles.cardFooter}>
            iFood &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
