import React from "react";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg w-80'>
        <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
        <div className='flex justify-end mt-6 space-x-3'>
          <button
            onClick={onCancel}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none'
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
