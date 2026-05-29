// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ALLOWED_DOMAIN = 'ifood.com.br';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('[Callback] Starting...');

      const hash = window.location.hash;
      console.log('[Callback] Hash length:', hash.length);

      if (!hash) {
        console.log('[Callback] No hash, redirecting to login');
        router.replace('/login');
        return;
      }

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      console.log('[Callback] Tokens found:', !!accessToken, !!refreshToken);

      if (!accessToken || !refreshToken) {
        console.log('[Callback] Missing tokens, redirecting to login');
        router.replace('/login');
        return;
      }

      console.log('[Callback] Calling setSession...');
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      console.log('[Callback] setSession response:', !!data.session, error);

      if (error || !data.session) {
        console.error('[Callback] setSession error:', error);
        router.replace('/login');
        return;
      }

      const email = data.session.user.email || '';
      const domain = email.split('@')[1];

      console.log('[Callback] Email domain:', domain);

      if (domain !== ALLOWED_DOMAIN) {
        console.log('[Callback] Domain not allowed:', domain);
        await supabase.auth.signOut();
        router.replace('/login?error=domain');
        return;
      }

      console.log('[Callback] Domain OK, syncing profile...');
      const u = data.session.user;
      try {
        await supabase.from('cms_users').upsert({
          auth_id: u.id,
          email: u.email || '',
          full_name: u.user_metadata?.full_name || '',
          avatar_url: u.user_metadata?.avatar_url || '',
        }, { onConflict: 'auth_id' });
        console.log('[Callback] Profile synced');
      } catch (err) {
        console.error('[Callback] upsert error:', err);
      }

      console.log('[Callback] Redirecting to /');
      router.replace('/');
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-primary)' }}>
      Autenticando...
    </div>
  );
}
