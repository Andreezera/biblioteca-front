import { Aluno } from "./aluno";
import { Exemplar } from "./exemplar";

export interface Emprestimo {
  id: number
  dataEmprestimo: string;
  dataDevolucao: string;
  dataPrevistaDevolucao: string;
  foiDevolvido: boolean;
  cliente: Aluno;
  exemplar: Exemplar;
}
