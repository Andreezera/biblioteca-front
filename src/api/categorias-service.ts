import { api } from "@/lib/axios";
import { Categoria } from "@/models/categoria";

export async function getCategorias() {
  const { data } = await api.get<Categoria[]>("/categorias");
  return data;
}
