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
import { Loader2 } from "lucide-react";
import * as React from "react";

export function CategoriasTable() {
  const [data, setData] = React.useState<Categoria[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setIsFetching(true);
    getCategorias()
      .then(setData)
      .finally(() => setIsFetching(false));
  }

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  return (
    <Table removeWrapper aria-label="Table">
      <TableHeader>
        <TableColumn>Código</TableColumn>
        <TableColumn>Nome</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome }) => (
          <TableRow key={id}>
            <TableCell width="10" className="text-center">
              {id}
            </TableCell>
            <TableCell>{nome}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
