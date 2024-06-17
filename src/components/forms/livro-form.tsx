import { getAutores } from "@/api/autores-service";
import { getCategorias } from "@/api/categorias-service";
import { getEditoras } from "@/api/editoras-service";
import { createLivro } from "@/api/livros-service";
import { Autor } from "@/models/autor";
import { Categoria } from "@/models/categoria";
import { Editora } from "@/models/editora";
import { Livro } from "@/models/livro";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

type LivroFormProps = {
  livro?: Livro;
  children(onOpen: () => void): React.ReactNode;
  onSucess?(): void;
};

export function LivroForm({ children, livro, onSucess }: LivroFormProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [formData, setFormData] = React.useState<Livro>({});
  const [editoras, setEditoras] = React.useState<Editora[]>([]);
  const [categorias, setCategorias] = React.useState<Categoria[]>([]);
  const [autores, setAutores] = React.useState<Autor[]>([]);

  React.useEffect(() => {
    getEditoras().then(setEditoras);
    getCategorias().then(setCategorias);
    getAutores().then(setAutores);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createLivro(formData);
    onClose();

    setTimeout(() => {
      setFormData({});
      onSucess?.();
    }, 1000);
  }

  function onChangeValue(value: string, key: keyof Livro) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {livro?.id ? "Editar" : "Novo"} Livro
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-y-5">
                  <Input
                    label="Nome"
                    onChange={(e) => onChangeValue(e.target.value, "nome")}
                  />
                  <Input
                    type="number"
                    label="Ano"
                    onChange={(e) => onChangeValue(e.target.value, "ano")}
                    minLength={4}
                    maxLength={4}
                  />
                  <Select
                    label="Autor"
                    onChange={(e) => onChangeValue(e.target.value, "autor")}
                  >
                    {autores.map(({ id, nome }) => (
                      <SelectItem key={id}>{nome}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Categoria"
                    onChange={(e) => onChangeValue(e.target.value, "categoria")}
                  >
                    {categorias.map(({ id, nome }) => (
                      <SelectItem key={id}>{nome}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Editora"
                    onChange={(e) => onChangeValue(e.target.value, "editora")}
                  >
                    {editoras.map(({ id, nome }) => (
                      <SelectItem key={id}>{nome}</SelectItem>
                    ))}
                  </Select>
                </div>
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
