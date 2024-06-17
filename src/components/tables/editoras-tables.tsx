import { getEditoras } from "@/api/editoras-service";
import { Editora } from "@/models/editora";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function EditorasTable() {
  const [data, setData] = React.useState<Editora[]>([]);

  React.useEffect(() => {
    getEditoras().then(setData);
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
