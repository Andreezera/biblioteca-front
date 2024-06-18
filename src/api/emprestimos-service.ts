import { api } from "@/lib/axios";
import { Emprestimo } from "@/models/emprestimo";

export type GetEmprestimosParams = { atrasado?: boolean; ativo?: boolean };

export async function getEmprestimos(params?: GetEmprestimosParams) {
  const { data } = await api.get<Emprestimo[]>("/emprestimos", {
    params,
  });
  return data;
}

export async function getClienteEmprestimo(clientId: number) {
  const { data } = await api.get<Emprestimo>(
    `/emprestimos/cliente/${clientId}`
  );
  return data;
}

export async function createEmprestimo(body: Emprestimo) {
  await api.post("/emprestimos/cadastrar", body);
}

export async function devolverEmprestimo(id: number) {
  await api.put(`/emprestimos/${id}/devolver`);
}
