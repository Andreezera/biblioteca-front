import {
  addExemplar,
  deleteLivro,
  getLivros,
  removeExemplar,
} from "@/api/livros-service";
import { Livro } from "@/models/livro";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Edit2, Loader2, Minus, Plus, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LivrosTable() {
  const navigate = useNavigate();

  const [data, setData] = React.useState<Livro[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentId, setCurrentId] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setIsFetching(true);
    getLivros()
      .then(setData)
      .finally(() => setIsFetching(false));
  }

  function handleEdit(id: number) {
    navigate(`/livros/${id}`);
  }

  function handleDelete(id: number) {
    setIsLoading(true);
    setCurrentId(id);

    deleteLivro(id)
      .then(() => {
        fetchData();
        toast.success("Livro deletado com sucesso!");
      })
      .catch(() => toast.error("Erro ao deletar livro!"))
      .finally(() => setIsLoading(false));
  }

  function handleAddExemplar(id: number, quantidade: number) {
    setIsLoading(true);
    setCurrentId(id);

    addExemplar({ livroId: id, quantidade: quantidade + 1 })
      .then(() => {
        fetchData();
        toast.success("Exemplar adicionado com sucesso!");
      })
      .catch(() => toast.error("Erro ao adicionar exemplar!"))
      .finally(() => setIsLoading(false));
  }

  function handleRemoveExemplar(id: number) {
    setIsLoading(true);
    setCurrentId(id);

    removeExemplar(id)
      .then(() => {
        fetchData();
        toast.success("Exemplar removido com sucesso!");
      })
      .catch(() => toast.error("Erro ao remover exemplar!"))
      .finally(() => setIsLoading(false));
  }

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  return (
    <>
      <Table aria-label="Table">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Ano</TableColumn>
          <TableColumn>Autor</TableColumn>
          <TableColumn>Categoria</TableColumn>
          <TableColumn>Editora</TableColumn>
          <TableColumn>Quantidade</TableColumn>
          <TableColumn> </TableColumn>
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
                <TableCell>
                  {id && (
                    <div className="flex items-center gap-2">
                      <Button
                        onPress={() => handleRemoveExemplar(id)}
                        isIconOnly
                        variant="flat"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <Button
                        onPress={() =>
                          handleAddExemplar(id, qtdExemplares ?? 0)
                        }
                        isIconOnly
                        variant="flat"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Plus className="size-4" />
                      </Button>
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
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}
