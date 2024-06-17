import { api } from "@/lib/axios";
import { Autor } from "@/models/autor";

export async function getAutores() {
  const { data } = await api.get<Autor[]>("/autores");
  return data;
}
