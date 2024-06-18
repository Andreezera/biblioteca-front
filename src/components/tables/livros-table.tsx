import { addExemplar, deleteLivro, getLivros } from "@/api/livros-service";
import { Livro } from "@/models/livro";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Edit2, Loader2, Plus, Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LivrosTable() {
  const navigate = useNavigate();

  const [data, setData] = React.useState<Livro[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

  if (isFetching) {
    return <Loader2 className="mx-auto animate-spin size-10" />;
  }

  function handleOpenModal(id: number) {
    onOpen();
    setCurrentId(id);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const quantidade = Number(formData.get("quantidade") as string);

    addExemplar({ idLivro: Number(currentId), quantidade })
      .then(() => {
        fetchData();
        toast.success("Exemplar(es) adicionado(s) com sucesso!");
        onClose();
      })
      .catch(() => toast.error("Erro ao adicionar exemplar(es)!"))
      .finally(() => setIsLoading(false));
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
                        onPress={() => handleOpenModal(id)}
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Adicionar exemplar</ModalHeader>
              <ModalBody>
                <Input
                  label="Quantidade"
                  type="number"
                  name="quantidade"
                  disabled={isLoading}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary">
                  Salvar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
