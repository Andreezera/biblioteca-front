import { api } from "@/lib/axios";
import { Livro } from "@/models/livro";

export async function getLivros() {
  const { data } = await api.get<Livro[]>("/livros");
  return data;
}

export async function getLivro(id: number) {
  const { data } = await api.get<Livro>(`/livros/${id}`);
  return data;
}

export async function createLivro(body: Livro) {
  await api.post("/livros", body);
}

export async function updateLivro(body: Livro, id: number) {
  await api.put(`/livros/${id}`, body);
}

export async function deleteLivro(id: number) {
  await api.delete(`/livros/${id}`);
}

export async function addExemplar(body: {
  livroId: number;
  quantidade: number;
}) {
  await api.post("/livros/exemplares", body);
}

export async function removeExemplar(id: number) {
  await api.delete(`/livros/exemplares/${id}`);
}
