import { Aluno } from "./aluno";
import { Exemplar } from "./extemplar";

export interface Emprestimo {
  id: string
  dataEmprestimo: string;
  dataDevolucao: string;
  dataPrevistaDevolucao: string;
  foiDevolvido: boolean;
  cliente: Aluno;
  exemplar: Exemplar;
}
