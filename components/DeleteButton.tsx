'use client';
import { deleteTask } from "@/app/actions/tasks";

type DeleteButtonProps = {
  id: number;
  onDeleted?: () => void; 
};

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await deleteTask(formData);
        if (onDeleted) onDeleted(); 
      }}
      className="inline-block ml-2"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </form>
  );
}
