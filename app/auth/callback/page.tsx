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
      // Parse the hash fragment from the URL (#access_token=...&refresh_token=...)
      const hash = window.location.hash;
      if (!hash) {
        router.replace('/login');
        return;
      }

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (!accessToken || !refreshToken) {
        router.replace('/login');
        return;
      }

      // Manually set the session with the tokens from the hash
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error || !data.session) {
        console.error('[Callback] setSession error:', error);
        router.replace('/login');
        return;
      }

      const email = data.session.user.email || '';
      const domain = email.split('@')[1];

      if (domain !== ALLOWED_DOMAIN) {
        await supabase.auth.signOut();
        router.replace('/login?error=domain');
        return;
      }

      // Sync cms_users profile
      const u = data.session.user;
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
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-primary)' }}>
      Autenticando...
    </div>
  );
}
