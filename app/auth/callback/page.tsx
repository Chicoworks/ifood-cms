// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ALLOWED_DOMAIN = 'ifood.com.br';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Listen for the SIGNED_IN event that Supabase fires after OAuth redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === 'SIGNED_IN' && session) {
        const email = session.user.email || '';
        const domain = email.split('@')[1];

        if (domain !== ALLOWED_DOMAIN) {
          await supabase.auth.signOut();
          router.replace('/login?error=domain');
          return;
        }

        // Sync cms_users profile
        const u = session.user;
        try {
          await supabase.from('cms_users').upsert({
            auth_id: u.id,
            email: u.email || '',
            full_name: u.user_metadata?.full_name || '',
            avatar_url: u.user_metadata?.avatar_url || '',
          }, { onConflict: 'auth_id' });
        } catch (err) {
          console.error('[Callback] upsert error:', err);
        }

        router.replace('/');
      } else if (_event === 'INITIAL_SESSION' && !session) {
        // No session found, go back to login
        router.replace('/login');
      }
    });

    // Safety fallback
    const timeout = setTimeout(() => router.replace('/login'), 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-primary)' }}>
      Autenticando...
    </div>
  );
}
