export interface Livro {
  id?: string;
  ano?: number;
  nome?: string;
  autor?: string | number;
  categoria?: string | number;
  editora?: string | number;
  qtdExemplares?: number;
}
