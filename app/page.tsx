'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FormTasks, { FormTasksType } from "@/components/FormTasks";
import DeleteButton from "@/components/DeleteButton";
import { getTasks, createTask, completeTask } from "./actions/tasks";

type Task = {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
};

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>(
    id ? 'pending' : 'all'
  );

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(data: FormTasksType) {
    await createTask(data);
    setFilter('pending');
    loadTasks();
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">📝 Lista de Tarefas</h1>

      <FormTasks
        defaultValues={{
          id: id ? parseInt(id) : undefined,
          title,
          description,
        }}
        onSubmit={handleSubmit}
      />

      <div className="mt-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-400 text-white' : 'bg-yellow-200'}`}
          onClick={() => setFilter('pending')}
        >
          Pendentes
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-green-400 text-white' : 'bg-green-200'}`}
          onClick={() => setFilter('completed')}
        >
          Concluídas
        </button>
      </div>

      <ul className="mt-4">
        {filteredTasks.map((t) => (
          <li
            key={t.id}
            className={`border-b py-4 px-4 flex justify-between items-center ${
              t.completed ? "bg-green-100 line-through text-gray-500" : "bg-white"
            } rounded-lg mb-2 shadow-sm`}
          >
            <div className="flex flex-col max-w-[70%]">
              <h3 className="font-bold text-lg text-gray-800">{t.title}</h3>
              <p className="text-gray-600 mt-1">{t.description}</p>
            </div>

            {!t.completed ? (
              <div className="flex gap-2">
               <Link
                 href={`/edit?id=${t.id}&title=${t.title}&description=${t.description}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Editar
                  </Link>
                <DeleteButton id={t.id} onDeleted={loadTasks} />

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await completeTask(formData);
                    loadTasks();
                  }}
                >
                  <input type="hidden" name="id" value={t.id} />
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Complete
                  </button>
                </form>
              </div>
            ) : (
              <p className="mt-2 text-green-600 font-semibold">✅ Tarefa concluída</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
