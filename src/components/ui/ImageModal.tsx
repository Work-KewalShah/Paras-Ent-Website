'use client';

import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative max-w-xl max-h-[70vh] outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-image-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-1 bg-white/20 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          aria-label="Close image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Image */}
        <img
          src={`/images/${src}`}
          alt={alt}
          className="w-full h-full object-contain rounded-lg border border-[var(--color-border,#2A2A2A)] bg-[var(--color-bg-secondary,#141414)] p-4"
          id="modal-image-title"
        />
      </div>
    </div>,
    document.body
  );
};

// Focus trap utility
export const useFocusTrap = (isOpen: boolean, onClose: () => void, ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Tab handling could be added for full trap, but for now Escape and clicks suffice
    };

    document.addEventListener('keydown', handleKeyDown);
    // Attempt to focus the close button or image
    const closeBtn = ref.current?.querySelector('button[aria-label="Close image"]');
    if (closeBtn) {
      (closeBtn as HTMLElement).focus();
    } else {
      ref.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, ref]);
};