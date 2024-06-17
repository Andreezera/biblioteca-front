import { Livro } from "@/models/livro";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

type LivrosTableProps = {
  data?: Livro[];
};

export function LivrosTable({ data = [] }: LivrosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Ano</TableColumn>
        <TableColumn>Autor</TableColumn>
        <TableColumn>Categoria</TableColumn>
        <TableColumn>Editora</TableColumn>
        <TableColumn>Quantidade</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(
          ({ id, nome, autor, ano, categoria, editora, qtdExemplares }) => (
            <TableRow key={id}>
              <TableCell>{nome}</TableCell>
              <TableCell>{ano}</TableCell>
              <TableCell>{autor}</TableCell>
              <TableCell>{categoria}</TableCell>
              <TableCell>{editora}</TableCell>
              <TableCell>{qtdExemplares}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
