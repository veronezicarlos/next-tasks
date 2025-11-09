import Link from "next/link";
import { completeTask, getTasks, createTask } from "./actions/tasks";
import FormTasks, { FormTasksType } from "@/components/FormTasks";
import DeleteButton from "@/components/DeleteButton"; 

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; title?: string; description?: string }>;
}) {
  const { id, title, description } = await searchParams;
  const tasks = await getTasks();

  async function handleSubmit(data: FormTasksType) {
    "use server";
    await createTask(data);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">📝 Lista de Tarefas</h1>

      <FormTasks
        defaultValues={{
          id: id ? parseInt(id) : undefined,
          title: title || "",
          description: description || "",
        }}
        onSubmit={handleSubmit}
      />

      <ul className="mt-4">
        {(tasks || []).map(
          (t: {
            id: number;
            title: string;
            description: string;
            completed?: boolean;
          }) => (
            <li
              key={t.id}
              className={`border-b py-4 px-4 flex justify-between items-center ${
                t.completed
                  ? "bg-green-100 line-through text-gray-500"
                  : "bg-white"
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

                  <DeleteButton id={t.id} />

                  <form action={completeTask}>
                    <input type="hidden" name="id" value={t.id} />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Complete
                    </button>
                  </form>
                </div>
              ) : (
                <p className="mt-2 text-green-600 font-semibold">
                  ✅ Tarefa concluída
                </p>
              )}
            </li>
          )
        )}
      </ul>
    </main>
  );
}
