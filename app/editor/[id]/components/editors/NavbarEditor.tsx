'use client';

import type { NavbarBlock } from '@/types/database';
import styles from '../../editor.module.css';
import { ImageUpload } from '../ImageUpload';

interface Props {
  block: NavbarBlock;
  onUpdate: (block: NavbarBlock) => void;
}

export function NavbarEditor({ block, onUpdate }: Props) {
  const update = (field: string, value: any) => {
    onUpdate({ ...block, data: { ...block.data, [field]: value } });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const items = [...block.data.items];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...block.data.items, { label: '', href: '#', has_dropdown: false }]);
  };

  const removeItem = (index: number) => {
    update('items', block.data.items.filter((_, i) => i !== index));
  };

  return (
    <>
      <ImageUpload
        label="Logo"
        value={block.data.logo}
        onChange={(url) => update('logo', url)}
      />

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Texto do CTA</label>
        <input className={styles.fieldInput} value={block.data.cta_text} onChange={(e) => update('cta_text', e.target.value)} />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Link do CTA</label>
        <input className={styles.fieldInput} value={block.data.cta_link} onChange={(e) => update('cta_link', e.target.value)} />
      </div>

      <div className={styles.arraySection}>
        <div className={styles.arraySectionHeader}>
          <span className={styles.arraySectionTitle}>Itens do menu ({block.data.items.length})</span>
          <button className={styles.addItemBtn} onClick={addItem}>+ Item</button>
        </div>
        {block.data.items.map((item, i) => (
          <div key={i} className={styles.arrayItem}>
            <button className={styles.removeItemBtn} onClick={() => removeItem(i)}>x</button>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Label</label>
                <input className={styles.fieldInput} value={item.label} onChange={(e) => updateItem(i, 'label', e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Link</label>
                <input className={styles.fieldInput} value={item.href || ''} onChange={(e) => updateItem(i, 'href', e.target.value || null)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
