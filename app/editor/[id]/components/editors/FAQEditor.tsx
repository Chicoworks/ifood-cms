'use client';

import type { FAQBlock } from '@/types/database';
import styles from '../../editor.module.css';

interface Props {
  block: FAQBlock;
  onUpdate: (block: FAQBlock) => void;
}

export function FAQEditor({ block, onUpdate }: Props) {
  const update = (field: string, value: any) => {
    onUpdate({ ...block, data: { ...block.data, [field]: value } });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = [...block.data.items];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...block.data.items, { id: Date.now(), question: '', answer: '' }]);
  };

  const removeItem = (index: number) => {
    update('items', block.data.items.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Badge</label>
          <input className={styles.fieldInput} value={block.data.badge} onChange={(e) => update('badge', e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Título</label>
          <input className={styles.fieldInput} value={block.data.title} onChange={(e) => update('title', e.target.value)} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Descrição</label>
        <textarea className={styles.fieldTextarea} value={block.data.description} onChange={(e) => update('description', e.target.value)} />
      </div>

      <div className={styles.arraySection}>
        <div className={styles.arraySectionHeader}>
          <span className={styles.arraySectionTitle}>Perguntas ({block.data.items.length})</span>
          <button className={styles.addItemBtn} onClick={addItem}>+ Pergunta</button>
        </div>
        {block.data.items.map((item, i) => (
          <div key={item.id} className={styles.arrayItem}>
            <button className={styles.removeItemBtn} onClick={() => removeItem(i)}>x</button>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Pergunta</label>
              <input className={styles.fieldInput} value={item.question} onChange={(e) => updateItem(i, 'question', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Resposta</label>
              <textarea className={styles.fieldTextarea} value={item.answer} onChange={(e) => updateItem(i, 'answer', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
