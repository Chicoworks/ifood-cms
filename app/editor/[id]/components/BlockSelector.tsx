'use client';

import type { BlockType } from '@/types/database';
import styles from '../editor.module.css';

interface BlockSelectorProps {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

const blockOptions: { type: BlockType; label: string; description: string; icon: string }[] = [
  { type: 'hero', label: 'Hero', description: 'Seção principal com título e CTA', icon: '🏠' },
  { type: 'vision', label: 'Social Proof', description: 'Números e credibilidade', icon: '📊' },
  { type: 'growth', label: 'Growth', description: 'Cards com tabs (slider)', icon: '📈' },
  { type: 'integrated', label: 'Features', description: 'Lista de funcionalidades', icon: '⚡' },
  { type: 'results', label: 'Depoimentos', description: 'Testimonials de clientes', icon: '💬' },
  { type: 'faq', label: 'FAQ', description: 'Perguntas e respostas', icon: '❓' },
  { type: 'navbar', label: 'Navbar', description: 'Menu de navegação', icon: '🔗' },
  { type: 'footer', label: 'Footer', description: 'Rodapé com links', icon: '📋' },
];

export function BlockSelector({ onSelect, onClose }: BlockSelectorProps) {
  return (
    <div className={styles.selectorOverlay} onClick={onClose}>
      <div className={styles.selectorModal} onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar bloco</h2>
        <div className={styles.selectorGrid}>
          {blockOptions.map((opt) => (
            <button key={opt.type} className={styles.selectorItem} onClick={() => onSelect(opt.type)}>
              <div className={styles.selectorItemIcon}>{opt.icon}</div>
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
