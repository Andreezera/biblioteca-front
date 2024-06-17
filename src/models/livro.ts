export interface Livro {
  id?: number;
  ano?: number;
  nome?: string;
  autor?: string | number;
  categoria?: string | number;
  editora?: string | number;
  qtdExemplares?: number;
}
