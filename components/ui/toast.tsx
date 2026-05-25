'use client';

import styles from './toast.module.css';

interface ToastProps {
  toast: { message: string; type: 'success' | 'error' } | null;
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  );
}
