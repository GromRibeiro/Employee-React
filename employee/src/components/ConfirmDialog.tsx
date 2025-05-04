interface ConfirmDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    mensagem: string;
  }
  
  export default function ConfirmDialog({
    isOpen,
    onCancel,
    onConfirm,
    mensagem,
  }: ConfirmDialogProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">{mensagem}</h2>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-fuchsia-800 text-white rounded hover:bg-fuchsia-600"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }