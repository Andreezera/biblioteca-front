import { deleteAluno, getAlunos } from "@/api/alunos-service";
import { Aluno } from "@/models/aluno";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Edit2, Loader2, Trash } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AlunosTable() {
  const navigate = useNavigate();

  const [data, setData] = React.useState<Aluno[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<number | null>(null);

  React.useEffect(() => fetchData(), []);

  function fetchData() {
    setIsFetching(true);
    getAlunos()
      .then(setData)
      .finally(() => setIsFetching(false));
  }

  function handleEdit(id: number) {
    navigate(`/alunos/${id}`);
  }

  function handleDelete(id: number) {
    setIsLoading(true);
    setCurrentId(id);

    deleteAluno(id)
      .then(() => {
        fetchData();
        toast.success("Aluno deletado com sucesso!");
      })
      .catch(() => toast.error("Erro ao deletar aluno!"))
      .finally(() => setIsLoading(false));
  }

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  return (
    <Table removeWrapper aria-label="Table">
      <TableHeader>
        <TableColumn>RA</TableColumn>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome, email, ra }) => (
          <TableRow key={id}>
            <TableCell width="50">{ra}</TableCell>
            <TableCell>{nome}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell width="50">
              {id && (
                <div className="flex items-center gap-2">
                  <Button
                    onPress={() => handleEdit(id)}
                    isIconOnly
                    variant="flat"
                    size="sm"
                    disabled={isLoading}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    onPress={() => handleDelete(id)}
                    isIconOnly
                    variant="flat"
                    size="sm"
                    disabled={isLoading && currentId === id}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
