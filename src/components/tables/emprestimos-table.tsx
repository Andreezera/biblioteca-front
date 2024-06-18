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
import { Check, Loader2, Stamp, X } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";

export function EmprestimosTable() {
  const [data, setData] = React.useState<Emprestimo[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
        <TableColumn>Cliente</TableColumn>
        <TableColumn>Livro</TableColumn>
        <TableColumn>Cod Exemplar</TableColumn>
        <TableColumn>Data Empréstimo</TableColumn>
        <TableColumn>Data Prevista Devolução</TableColumn>
        <TableColumn>Data Devolução</TableColumn>
        <TableColumn>Devolvido</TableColumn>
        <TableColumn> </TableColumn>
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
              <TableCell>{cliente?.nome}</TableCell>
              <TableCell>{exemplar?.livro.nome}</TableCell>
              <TableCell>{exemplar?.id}</TableCell>
              <TableCell>{dataEmprestimo}</TableCell>
              <TableCell>{dataPrevistaDevolucao}</TableCell>
              <TableCell>{dataDevolucao}</TableCell>
              <TableCell width="50">
                {foiDevolvido ? (
                  <Check className="size-4" />
                ) : (
                  <X className="size-4" />
                )}
              </TableCell>
              <TableCell width="50">
                {!foiDevolvido && id && (
                  <Button
                    onPress={() => handleGiveBack(id)}
                    isIconOnly
                    variant="flat"
                    size="sm"
                    disabled={isLoading}
                  >
                    <Stamp className="size-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
