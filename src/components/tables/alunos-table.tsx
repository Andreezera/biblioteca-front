import { getAlunos } from "@/api/alunos-service";
import { Aluno } from "@/models/aluno";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function AlunosTable() {
  const [data, setData] = React.useState<Aluno[]>([]);

  React.useEffect(() => {
    getAlunos().then(setData);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableColumn>RA</TableColumn>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Email</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome, email, ra }) => (
          <TableRow key={id}>
            <TableCell>{ra}</TableCell>
            <TableCell>{nome}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
