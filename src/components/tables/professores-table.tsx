import { deleteProfessor, getProfessores } from "@/api/professores-service";
import { Professor } from "@/models/professor";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Loader2, Edit2, Trash } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ProfessoresTable() {
  const navigate = useNavigate();

  const [data, setData] = React.useState<Professor[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<number | null>(null);

  React.useEffect(() => fetchData(), []);

  function fetchData() {
    setIsFetching(true);
    getProfessores()
      .then(setData)
      .finally(() => setIsFetching(false));
  }

  function handleEdit(id: number) {
    navigate(`/professores/${id}`);
  }

  function handleDelete(id: number) {
    setIsLoading(true);
    setCurrentId(id);

    deleteProfessor(id)
      .then(() => {
        fetchData();
        toast.success("Professor deletado com sucesso!");
      })
      .catch(() => toast.error("Erro ao deletar professor!"))
      .finally(() => setIsLoading(false));
  }

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  return (
    <Table removeWrapper aria-label="Table">
      <TableHeader>
        <TableColumn>RP</TableColumn>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {data.map(({ id, nome, rp, email }) => (
          <TableRow key={id}>
            <TableCell width="50">{rp}</TableCell>
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
