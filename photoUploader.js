import React, { useRef, useState } from 'react';
import { useResumeStore } from './store.js';

const h = React.createElement;
const OUTPUT_SIZE = 320;

function cropToSquareDataUrl(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement('canvas');
        canvas.width = OUTPUT_SIZE;
        canvas.height = OUTPUT_SIZE;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, side, side, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function PhotoUploader() {
  const photo = useResumeStore((s) => s.resume.photo);
  const setPhoto = useResumeStore((s) => s.setPhoto);
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large (max 8MB).');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const dataUrl = await cropToSquareDataUrl(file);
      setPhoto(dataUrl);
    } catch (err) {
      setError('Could not process that image.');
    } finally {
      setBusy(false);
    }
  }

  return h(
    'div',
    { className: 'photo-uploader' },
    photo
      ? h('img', { src: photo, alt: '', className: 'photo-circle' })
      : h('div', { className: 'photo-circle photo-placeholder' }, 'Photo'),
    h(
      'div',
      null,
      h(
        'button',
        { type: 'button', onClick: () => inputRef.current.click(), disabled: busy },
        busy ? 'Processing…' : photo ? 'Replace photo' : 'Upload photo'
      ),
      photo && h('button', { type: 'button', className: 'link-btn', onClick: () => setPhoto(null) }, 'Remove'),
      h('input', {
        ref: inputRef,
        type: 'file',
        accept: 'image/*',
        onChange: handleFile,
        style: { display: 'none' },
      }),
      h('p', { className: 'hint' }, 'Cropped and resized on your device. Never uploaded anywhere.'),
      error && h('p', { className: 'error-text' }, error)
    )
  );
}
