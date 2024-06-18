import { api } from "@/lib/axios";
import { Professor } from "@/models/professor";

export async function getProfessores() {
  const { data } = await api.get<Professor[]>("/clientes/professores");
  return data;
}

export async function getProfessor(id: number) {
  const { data } = await api.get<Professor>(`/clientes/professores/${id}`);
  return data;
}

export async function createProfessor(body: Professor) {
  await api.post("/clientes/professores", body);
}

export async function updateProfessor(body: Professor, id: number) {
  await api.put(`/clientes/professores/${id}`, body);
}

export async function deleteProfessor(id: number) {
  await api.delete(`/clientes/professores/${id}`);
}
