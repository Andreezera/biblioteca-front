import { api } from "@/lib/axios";
import { Aluno } from "@/models/aluno";

export async function getAlunos() {
  const { data } = await api.get<Aluno[]>("/alunos");
  return data;
}

export async function getAluno(id: string) {
  const { data } = await api.get<Aluno>(`/alunos/${id}`);
  return data;
}

export async function createAluno(data: Aluno) {
  await api.post("/alunos", data);
}

export async function updateAluno(data: Aluno, id: string) {
  await api.put(`/alunos/${id}`, data);
}

export async function deleteAluno(id: string) {
  await api.delete(`/alunos/${id}`);
}
