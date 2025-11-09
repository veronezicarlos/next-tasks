'use server';

import { FormTasksType } from '@/components/FormTasks';
import API from '@/lib/API';
import { revalidatePath } from 'next/cache';



export async function getTasks() {
  try {
    const { data } = await API.get('/tasks');
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function createTask(formData: FormTasksType) {
  try {
    const { title, description } = formData;
    await API.post('/tasks', { title, description });
    revalidatePath('/');
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

export async function getTaskById(id: number) {
  try {
    const { data } = await API.get(`/tasks/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
}

export async function editTask(formData: FormTasksType) {
  try {
    console.log("🔍 Editando tarefa:", formData);
    const { id, title, description } = formData;
    await API.put(`/tasks/${id}`, { title, description });
    revalidatePath("/");
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

export async function deleteTask(formData: FormData) {
  const id = formData.get('id');
  if (!id) return;
  try {
    await API.delete(`/tasks/${id}`);
    revalidatePath('/');
  } catch (err) {
    console.error('Erro ao deletar:', err);
  }
}

export async function completeTask(formData: FormData) {
  const id = formData.get('id');
  if (!id) return;

  try {
    await API.patch(`/tasks/${id}`, { completed: true });
    revalidatePath('/');
  } catch (err) {
    console.error('Erro ao completar:', err);
  }

  
}

