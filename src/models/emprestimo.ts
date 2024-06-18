import { Cliente } from "./cliente";
import { Exemplar } from "./exemplar";

export interface Emprestimo {
  id?: number;
  dataEmprestimo?: string;
  dataDevolucao?: string;
  dataPrevistaDevolucao?: string;
  foiDevolvido?: boolean;
  idCliente?: number;
  exemplarId?: number;
  cliente?: Cliente;
  exemplar?: Exemplar;
}
