'use client';

import { useEffect, useCallback } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
  children?: React.ReactNode;
  actions: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  variant = 'default',
  children,
  actions,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  const iconVariantClass =
    variant === 'danger' ? styles.iconDanger : styles.iconDefault;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {icon && (
          <div className={`${styles.icon} ${iconVariantClass}`}>{icon}</div>
        )}
        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>
        {description && (
          <p id="modal-description" className={styles.description}>
            {description}
          </p>
        )}
        {children && <div className={styles.body}>{children}</div>}
        <div className={styles.actions}>{actions}</div>
      </div>
    </div>
  );
}
