'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './ImageUpload.module.css';

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || 'http://localhost:3000';

function resolveImageUrl(url: string): string {
  if (!url) return '';
  // Relative paths like /icons/foo.svg belong to the landing page
  if (url.startsWith('/')) return `${LANDING_URL}${url}`;
  return url;
}

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [imgError, setImgError] = useState(false);
  const prevValueRef = useRef(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset error state when value changes (new image uploaded)
  if (value !== prevValueRef.current) {
    prevValueRef.current = value;
    if (imgError) setImgError(false);
  }

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = `uploads/${fileName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const url = `${supabaseUrl}/storage/v1/object/images/${filePath}`;

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));

        xhr.open('POST', url);
        xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`);
        xhr.setRequestHeader('apikey', supabaseKey);
        xhr.setRequestHeader('x-upsert', 'false');
        xhr.setRequestHeader('Cache-Control', 'max-age=3600');
        xhr.send(file);
      });

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onChange(urlData.publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
    }

    setUploading(false);
    setProgress(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      {value ? (
        <div className={styles.preview}>
          {imgError ? (
            <div className={styles.previewFallback}>
              <span className={styles.previewFallbackUrl}>{value}</span>
            </div>
          ) : (
            <img
              src={resolveImageUrl(value)}
              alt="Preview"
              className={styles.previewImage}
              onError={() => setImgError(true)}
            />
          )}
          {uploading && (
            <div className={styles.previewProgress}>
              <span className={styles.progressText}>Enviando... {progress}%</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          <div className={styles.previewActions}>
            <button className={styles.changeBtn} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? 'Enviando...' : 'Trocar'}
            </button>
            <button className={styles.removeBtn} onClick={handleRemove} disabled={uploading}>
              Remover
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${dragOver ? styles.dropzoneActive : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className={styles.progressContainer}>
              <span className={styles.progressText}>Enviando... {progress}%</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.uploadIcon}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className={styles.dropText}>Clique ou arraste uma imagem</span>
              <span className={styles.dropHint}>JPG, PNG, WebP, SVG</span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
}
