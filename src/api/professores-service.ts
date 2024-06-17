import { api } from "@/lib/axios";
import { Professor } from "@/models/professor";

export async function getProfessores() {
  const { data } = await api.get<Professor[]>("/professores");
  return data;
}

export async function getProfessor(id: string) {
  const { data } = await api.get<Professor>(`/professores/${id}`);
  return data;
}

export async function createProfessor(data: Professor) {
  await api.post("/professores", data);
}

export async function updateProfessor(data: Professor, id: string) {
  await api.put(`/professores/${id}`, data);
}

export async function deleteProfessor(id: string) {
  await api.delete(`/professores/${id}`);
}
