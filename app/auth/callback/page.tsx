// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ALLOWED_DOMAIN = 'ifood.com.br';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    let isProcessing = false;

    const handleCallback = async () => {
      if (isProcessing) return;
      isProcessing = true;

      const hash = window.location.hash;
      if (!hash) {
        router.replace('/login');
        return;
      }

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (!accessToken || \!refreshToken) {
        router.replace('/login');
        return;
      }

      try {
        let sessionSet = false;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session && \!sessionSet) {
            sessionSet = true;
            subscription.unsubscribe();

            const email = session.user.email || '';
            const domain = email.split('@')[1];

            if (domain \!== ALLOWED_DOMAIN) {
              await supabase.auth.signOut();
              router.replace('/login?error=domain');
              return;
            }

            try {
              await supabase.from('cms_users').upsert({
                auth_id: session.user.id,
                email: session.user.email || '',
                full_name: session.user.user_metadata?.full_name || '',
                avatar_url: session.user.user_metadata?.avatar_url || '',
              }, { onConflict: 'auth_id' });
            } catch (err) {
              console.error('[Callback] upsert error:', err);
            }

            router.replace('/');
          }
        });

        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        setTimeout(async () => {
          if (!sessionSet) {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
              sessionSet = true;
              subscription.unsubscribe();
              router.replace('/');
            } else {
              subscription.unsubscribe();
              router.replace('/login');
            }
          }
        }, 8000);
      } catch (err) {
        console.error('[Callback] Error:', err);
        router.replace('/login');
      }
    };

    setTimeout(handleCallback, 100);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-primary)' }}>
      Autenticando...
    </div>
  );
}
