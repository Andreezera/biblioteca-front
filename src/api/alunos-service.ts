import { api } from "@/lib/axios";
import { Aluno } from "@/models/aluno";

export async function getAlunos() {
  const { data } = await api.get<Aluno[]>("/clientes/alunos");
  return data;
}

export async function getAluno(id: number) {
  const { data } = await api.get<Aluno>(`/clientes/alunos/${id}`);
  return data;
}

export async function createAluno(body: Aluno) {
  await api.post("/clientes/alunos", body);
}

export async function updateAluno(body: Aluno, id: number) {
  await api.put(`/clientes/alunos/${id}`, body);
}

export async function deleteAluno(id: number) {
  await api.delete(`/clientes/alunos/${id}`);
}
