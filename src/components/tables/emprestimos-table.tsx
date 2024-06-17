import { getEmprestimos } from "@/api/emprestimos-service";
import { Emprestimo } from "@/models/emprestimo";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function EmprestimosTable() {
  const [data, setData] = React.useState<Emprestimo[]>([]);

  React.useEffect(() => {
    getEmprestimos().then(setData);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableColumn>Livro</TableColumn>
        <TableColumn>Autor</TableColumn>
        <TableColumn>Data Empréstimo</TableColumn>
        <TableColumn>Data Prevista Devolução</TableColumn>
        <TableColumn>Data Devolução</TableColumn>
        <TableColumn>Devolvido</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            id,
            dataEmprestimo,
            dataDevolucao,
            dataPrevistaDevolucao,
            exemplar,
            cliente,
            foiDevolvido,
          }) => (
            <TableRow key={id}>
              <TableCell>{exemplar.livro.nome}</TableCell>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{dataEmprestimo}</TableCell>
              <TableCell>{dataPrevistaDevolucao}</TableCell>
              <TableCell>{dataDevolucao}</TableCell>
              <TableCell>{foiDevolvido}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
