'use client';
import { useState } from 'react';
import { deleteTask } from '@/app/actions/tasks';

export default function DeleteButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('id', id.toString());
    await deleteTask(formData);
    setOpen(false);
  };

  return (
    <>
   
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>

    
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 font-semibold text-gray-800">
              Tem certeza que deseja excluir esta tarefa?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Sim
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}