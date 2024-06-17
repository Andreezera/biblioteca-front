import { devolverEmprestimo, getEmprestimos } from "@/api/emprestimos-service";
import { Emprestimo } from "@/models/emprestimo";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { HandCoins, Loader2 } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";

export function EmprestimosTable() {
  const [data, setData] = React.useState<Emprestimo[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getEmprestimos().then(setData);
  }, []);

  function fetchData() {
    setIsFetching(true);
    getEmprestimos()
      .then(setData)
      .finally(() => setIsFetching(false));
  }

  function handleGiveBack(id: number) {
    setIsLoading(true);

    devolverEmprestimo(id)
      .then(() => {
        fetchData();
        toast.success("Emprestimo devolvido com sucesso!");
      })
      .catch(() => toast.error("Erro ao devolver emprestimo!"))
      .finally(() => setIsLoading(false));
  }

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  return (
    <Table aria-label="Table">
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
              <TableCell>
                <Button
                  onPress={() => handleGiveBack(id)}
                  isIconOnly
                  variant="flat"
                  size="sm"
                  disabled={isLoading}
                >
                  <HandCoins className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
