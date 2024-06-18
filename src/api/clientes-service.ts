import { api } from "@/lib/axios";
import { Cliente } from "@/models/cliente";

export async function getClientes() {
  const { data } = await api.get<Cliente[]>("/clientes");
  return data;
}
