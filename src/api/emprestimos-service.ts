import { api } from "@/lib/axios";
import { Emprestimo } from "@/models/emprestimo";

export async function getEmprestimos() {
  const { data } = await api.get<Emprestimo[]>("/emprestimos");
  return data;
}

export async function getClienteEmprestimo(clientId: string) {
  const { data } = await api.get<Emprestimo>(
    `/emprestimos/cliente/${clientId}`
  );
  return data;
}

export async function createEmprestimo(data: Emprestimo) {
  await api.post("/emprestimos", data);
}

export async function devolverEmprestimo(id: string) {
  await api.put(`/emprestimos/${id}/devolver`);
}
