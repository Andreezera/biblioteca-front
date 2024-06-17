import { getCategorias } from "@/api/categorias-service";
import { Categoria } from "@/models/categoria";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import * as React from "react";

export function CategoriasTable() {
  const [data, setData] = React.useState<Categoria[]>([]);

  React.useEffect(() => {
    getCategorias().then(setData);
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
