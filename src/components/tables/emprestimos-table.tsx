import {
  GetEmprestimosParams,
  devolverEmprestimo,
  getEmprestimos,
} from "@/api/emprestimos-service";
import { Emprestimo } from "@/models/emprestimo";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  cn,
} from "@nextui-org/react";
import { isAfter, parse } from "date-fns";
import { Check, Loader2, Stamp, X } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";

export function EmprestimosTable() {
  const [data, setData] = React.useState<Emprestimo[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<GetEmprestimosParams>({});

  React.useEffect(() => {
    fetchData(formData);
  }, [formData]);

  function fetchData(params?: { atrasado?: boolean; ativo?: boolean }) {
    setIsFetching(true);
    getEmprestimos(params)
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

  function onChangeValue(
    value: boolean | undefined,
    key: keyof GetEmprestimosParams
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <form className="mb-5 flex items-center gap-5">
        <Checkbox
          isSelected={formData.atrasado}
          onValueChange={(e) => onChangeValue(e ? e : undefined, "atrasado")}
        >
          Atrasados
        </Checkbox>
        <Checkbox
          isSelected={formData.ativo}
          onValueChange={(e) => onChangeValue(e ? e : undefined, "ativo")}
        >
          Ativos
        </Checkbox>
      </form>
      <Table removeWrapper aria-label="Table">
        <TableHeader>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Cod Exemplar</TableColumn>
          <TableColumn>Livro</TableColumn>
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
                <TableCell className="text-center">{exemplar?.id}</TableCell>
                <TableCell>{exemplar?.livro.nome}</TableCell>
                <TableCell>{dataEmprestimo}</TableCell>
                <TableCell
                  className={cn({
                    "text-red-500":
                      !foiDevolvido &&
                      dataPrevistaDevolucao &&
                      isAfter(
                        new Date(),
                        parse(dataPrevistaDevolucao, "dd/MM/yyyy", new Date())
                      ),
                  })}
                >
                  {dataPrevistaDevolucao}
                </TableCell>
                <TableCell>{dataDevolucao}</TableCell>
                <TableCell width="50">
                  {foiDevolvido ? (
                    <Check className="size-4 mx-auto text-green-500" />
                  ) : (
                    <X className="size-4 mx-auto text-red-500" />
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
    </>
  );
}
