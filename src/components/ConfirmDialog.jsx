import * as Dialog from "@radix-ui/react-dialog";
import "./ConfirmDialog.css"; // Optional: Style the modal


export default function ConfirmDialog({ open, onOpenChange, onConfirm, onCancel }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed z-50 bg-white p-6 rounded-xl shadow-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm">
          <Dialog.Title className="text-lg font-bold">Confirm Deletion</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this session? This action cannot be undone.
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
