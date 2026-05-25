'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import styles from './status-badge.module.css';

export type StatusType = 'draft' | 'running' | 'paused' | 'completed' | 'published';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
  withChevron?: boolean;
  onStatusChange?: (newStatus: StatusType) => void;
  /** Custom list of statuses for dropdown. Defaults to experiment statuses. */
  dropdownStatuses?: StatusType[];
}

const STATUS_LABELS: Record<StatusType, string> = {
  draft: 'Rascunho',
  running: 'Rodando',
  paused: 'Pausado',
  completed: 'Concluído',
  published: 'Publicado',
};

const STATUS_COLORS: Record<StatusType, string> = {
  draft: '#9fa0aa',
  running: '#4cd8b9',
  paused: '#ebb400',
  completed: '#787878',
  published: '#4cd8b9',
};

/** Statuses available in the dropdown (experiments only, no "published"). */
const DROPDOWN_STATUSES: StatusType[] = ['draft', 'running', 'paused', 'completed'];

export function StatusBadge({
  status,
  size = 'sm',
  withChevron,
  onStatusChange,
  dropdownStatuses,
}: StatusBadgeProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isInteractive = typeof onStatusChange === 'function';
  const showChevron = isInteractive || withChevron;

  const badgeClasses = [
    styles.badge,
    styles[size],
    styles[status],
    isInteractive ? styles.interactive : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleToggle = useCallback(() => {
    if (isInteractive) {
      setOpen((prev) => !prev);
    }
  }, [isInteractive]);

  const handleSelect = useCallback(
    (newStatus: StatusType) => {
      if (newStatus !== status) {
        onStatusChange?.(newStatus);
      }
      setOpen(false);
    },
    [onStatusChange, status],
  );

  const chevronElement = showChevron ? (
    <span className={`${styles.chevron}${open ? ` ${styles.chevronOpen}` : ''}`}>
      <Icon name="chevron-down" size={12} />
    </span>
  ) : null;

  // Static mode: plain span
  if (!isInteractive) {
    return (
      <span className={badgeClasses}>
        {STATUS_LABELS[status]}
        {chevronElement}
      </span>
    );
  }

  // Interactive mode: button + dropdown
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={badgeClasses}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {STATUS_LABELS[status]}
        {chevronElement}
      </button>

      {open && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className={styles.menu} role="listbox" aria-label="Alterar status">
            {(dropdownStatuses || DROPDOWN_STATUSES).map((s) => (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={s === status}
                className={`${styles.menuItem}${s === status ? ` ${styles.menuItemActive}` : ''}`}
                onClick={() => handleSelect(s)}
              >
                <span
                  className={styles.menuDot}
                  style={{ backgroundColor: STATUS_COLORS[s] }}
                />
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StatusBadge;
