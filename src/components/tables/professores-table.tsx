import { getProfessores } from "@/api/professores-service";
import { Professor } from "@/models/professor";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function ProfessoresTable() {
  const [data, setData] = React.useState<Professor[]>([]);

  React.useEffect(() => {
    getProfessores().then(setData);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableColumn>RP</TableColumn>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Email</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome, rp, email }) => (
          <TableRow key={id}>
            <TableCell>{rp}</TableCell>
            <TableCell>{nome}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
