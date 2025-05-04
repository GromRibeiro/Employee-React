import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function EditModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-gray-200 rounded-s p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-800 text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}