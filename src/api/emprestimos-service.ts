import { api } from "@/lib/axios";
import { Emprestimo } from "@/models/emprestimo";

export async function getEmprestimos() {
  const { data } = await api.get<Emprestimo[]>("/emprestimos");
  return data;
}

export async function getClienteEmprestimo(clientId: number) {
  const { data } = await api.get<Emprestimo>(
    `/emprestimos/cliente/${clientId}`
  );
  return data;
}

export async function createEmprestimo(body: Emprestimo) {
  await api.post("/emprestimos", body);
}

export async function devolverEmprestimo(id: number) {
  await api.put(`/emprestimos/${id}/devolver`);
}
