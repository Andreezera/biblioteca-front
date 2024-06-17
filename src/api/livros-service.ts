import { api } from "@/lib/axios";
import { Livro } from "@/models/livro";

export async function getLivros() {
  const { data } = await api.get<Livro[]>("/livros");
  return data;
}

export async function getLivro(id: string) {
  const { data } = await api.get<Livro>(`/livros/${id}`);
  return data;
}

export async function createLivro(data: Livro) {
  await api.post("/livros", data);
}

export async function updateLivro(data: Livro, id: string) {
  await api.put(`/livros/${id}`, data);
}

export async function deleteLivro(id: string) {
  await api.delete(`/livros/${id}`);
}
