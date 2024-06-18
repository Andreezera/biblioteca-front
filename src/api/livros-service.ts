import { api } from "@/lib/axios";
import { Exemplar } from "@/models/exemplar";
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

export async function getExemplares() {
  const { data } = await api.get<Exemplar[]>("/livros/exemplares");
  return data;
}

export async function addExemplar(body: {
  idLivro: number;
  quantidade: number;
}) {
  await api.post("/livros/exemplares", body);
}
