// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ALLOWED_DOMAIN = 'ifood.com.br';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log('[Callback] mounted, URL hash:', window.location.hash.substring(0, 50));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('[Callback] event:', _event, '| user:', session?.user?.email ?? 'none');

      if (_event === 'SIGNED_IN' && session) {
        const email = session.user.email || '';
        const domain = email.split('@')[1];

        if (domain !== ALLOWED_DOMAIN) {
          await supabase.auth.signOut();
          router.replace('/login?error=domain');
          return;
        }

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
      }
    });

    const timeout = setTimeout(() => {
      console.warn('[Callback] timeout - no SIGNED_IN event received');
      router.replace('/login');
    }, 15000);

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
