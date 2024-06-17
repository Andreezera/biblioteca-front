import { getAutores } from "@/api/autores-service";
import { Autor } from "@/models/autor";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function AutoresTable() {
  const [data, setData] = React.useState<Autor[]>([]);

  React.useEffect(() => {
    getAutores().then(setData);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableColumn>Código</TableColumn>
        <TableColumn>Nome</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome }) => (
          <TableRow key={id}>
            <TableCell width="10" className="text-center">{id}</TableCell>
            <TableCell>{nome}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
