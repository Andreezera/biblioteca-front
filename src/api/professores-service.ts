import { api } from "@/lib/axios";
import { Professor } from "@/models/professor";

export async function getProfessores() {
  const { data } = await api.get<Professor[]>("/professores");
  return data;
}

export async function getProfessor(id: number) {
  const { data } = await api.get<Professor>(`/professores/${id}`);
  return data;
}

export async function createProfessor(body: Professor) {
  await api.post("/professores", body);
}

export async function updateProfessor(body: Professor, id: number) {
  await api.put(`/professores/${id}`, body);
}

export async function deleteProfessor(id: number) {
  await api.delete(`/professores/${id}`);
}
