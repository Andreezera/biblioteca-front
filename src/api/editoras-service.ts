import { api } from "@/lib/axios";
import { Editora } from "@/models/editora";

export async function getEditoras() {
  const { data } = await api.get<Editora[]>("/editoras");
  return data;
}
