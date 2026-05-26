'use client';

import type { BlockType } from '@/types/database';
import { Icon } from '@/components/Icon/Icon';
import styles from '../editor.module.css';

interface BlockSelectorProps {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

const typeIcons: Record<string, string> = {
  navbar: 'burger-menu-three',
  hero: 'photo-image-default',
  vision: 'barchart-default',
  growth: 'rocket-ship',
  integrated: 'plugin-addon-puzzle',
  results: 'text-quotes-paragraph',
  faq: 'file-02-question-mark',
  footer: 'window-dock-bottom',
};

const blockOptions: { type: BlockType; label: string; description: string }[] = [
  { type: 'hero', label: 'Hero', description: 'Seção principal com título e CTA' },
  { type: 'vision', label: 'Social Proof', description: 'Números e credibilidade' },
  { type: 'growth', label: 'Growth', description: 'Cards com tabs (slider)' },
  { type: 'integrated', label: 'Features', description: 'Lista de funcionalidades' },
  { type: 'results', label: 'Depoimentos', description: 'Testimonials de clientes' },
  { type: 'faq', label: 'FAQ', description: 'Perguntas e respostas' },
  { type: 'navbar', label: 'Navbar', description: 'Menu de navegação' },
  { type: 'footer', label: 'Footer', description: 'Rodapé com links' },
];

export function BlockSelector({ onSelect, onClose }: BlockSelectorProps) {
  return (
    <div className={styles.selectorOverlay} onClick={onClose}>
      <div className={styles.selectorModal} onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar bloco</h2>
        <div className={styles.selectorGrid}>
          {blockOptions.map((opt) => (
            <button key={opt.type} className={styles.selectorItem} onClick={() => onSelect(opt.type)}>
              <span className={styles.selectorItemIcon}>
                <Icon name={typeIcons[opt.type] || 'grid-dashboard-bento'} size={20} />
              </span>
              <div className={styles.selectorItemInfo}>
                <h3>{opt.label}</h3>
                <p>{opt.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
