'use client';

import { useState } from "react";
import { deleteTask } from "@/app/actions/tasks";

type DeleteButtonProps = {
  id: number;
  onDeleted?: () => void;
};

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    const formData = new FormData();
    formData.append("id", id.toString());
    await deleteTask(formData);
    setShowConfirm(false);
    onDeleted?.();
  }

  return (
    <>
      
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>

    
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tem certeza que deseja excluir esta tarefa?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Sim, excluir
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}