import Link from 'next/link';
import { completeTask, deleteTask, getTasks, createTask } from './actions/tasks';
import FormTasks, { FormTasksType } from '@/components/FormTasks';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; title?: string; description?: string }>;
}) {
  const { id, title, description } = await searchParams;
  const tasks = await getTasks();

  async function handleSubmit(data: FormTasksType) {
    'use server';
    await createTask(data);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">📝 Lista de Tarefas</h1>

      <FormTasks
        defaultValues={{
          id: id ? parseInt(id) : undefined,
          title: title || '',
          description: description || '',
        }}
        onSubmit={handleSubmit}
      />

      <ul className="mt-4">
        {tasks.map((t: { id: number; title: string; description: string }) => (
          <li key={t.id} className="border-b py-2">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>

           
            <Link
              href={`/?id=${t.id}&title=${t.title}&description=${t.description}`}
              className="inline-block ml-2 bg-yellow-500 text-white p-2 rounded"
            >
              Edit
            </Link>

         
            <form action={deleteTask} className="inline-block ml-2">
              <input type="hidden" name="id" value={t.id} />
              <button
                type="submit"
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </form>

           
            <form action={completeTask} className="inline-block ml-2">
              <input type="hidden" name="id" value={t.id} />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Complete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}