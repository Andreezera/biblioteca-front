import { getAutores } from "@/api/autores-service";
import { getCategorias } from "@/api/categorias-service";
import { getEditoras } from "@/api/editoras-service";
import { createLivro, getLivro, updateLivro } from "@/api/livros-service";
import { Autor } from "@/models/autor";
import { Categoria } from "@/models/categoria";
import { Editora } from "@/models/editora";
import { Livro } from "@/models/livro";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface DataState {
  editoras: Editora[];
  categorias: Categoria[];
  autores: Autor[];
}

export function LivrosPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = React.useState<Livro>({});
  const [data, setData] = React.useState<DataState>({
    editoras: [],
    categorias: [],
    autores: [],
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isNew = id === "novo";

  React.useEffect(() => {
    function fetchData() {
      setIsLoading(true);

      getLivro(Number(id))
        .then((data) => setFormData(data))
        .catch(() => toast.error("Erro ao buscar o livro!"))
        .finally(() => setIsLoading(false));
    }

    !isNew && fetchData();
  }, [id, isNew]);

  React.useEffect(() => {
    function fetchDropdownData() {
      setIsLoading(true);

      Promise.all([getEditoras(), getCategorias(), getAutores()])
        .then(([editoras, categorias, autores]) => {
          setData({ editoras, categorias, autores });
        })
        .finally(() => setIsLoading(false));
    }

    fetchDropdownData();
  }, []);

  function onChangeValue(value: string, key: keyof Livro) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const action = isNew
      ? createLivro(formData)
      : updateLivro(formData, Number(id));

    action
      .then(() => {
        toast.success("Livro salvo com sucesso!");
        setFormData({});
        navigate("/");
      })
      .catch(() => toast.error("Erro ao salvar livro!"))
      .finally(() => setIsLoading(false));
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="fixed inset-0 flex flex-col w-full items-center justify-center">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Card className="max-w-full">
            <CardHeader>{isNew ? "Novo" : "Editar"} Livro</CardHeader>
            <CardBody className="overflow-hidden">
              <div className="flex flex-col gap-y-5">
                <Input
                  label="Nome"
                  isRequired
                  value={formData.nome}
                  onChange={(e) => onChangeValue(e.target.value, "nome")}
                  disabled={isLoading}
                />
                <Input
                  type="number"
                  label="Ano"
                  isRequired
                  value={formData.ano?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "ano")}
                  disabled={isLoading}
                />
                <Select
                  label="Autor"
                  isRequired
                  selectedKeys={[formData.idAutor?.toString() ?? ""]}
                  onChange={(e) => onChangeValue(e.target.value, "idAutor")}
                  disabled={isLoading}
                >
                  {data.autores.map(({ id, nome }) => (
                    <SelectItem key={id.toString()}>{nome}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="Categoria"
                  isRequired
                  selectedKeys={[formData.idCategoria?.toString() ?? ""]}
                  value={formData.idCategoria?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "idCategoria")}
                  disabled={isLoading}
                >
                  {data.categorias.map(({ id, nome }) => (
                    <SelectItem key={id}>{nome}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="Editora"
                  isRequired
                  selectedKeys={[formData.idEditora?.toString() ?? ""]}
                  value={formData.idEditora?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "idEditora")}
                  disabled={isLoading}
                >
                  {data.editoras.map(({ id, nome }) => (
                    <SelectItem key={id}>{nome}</SelectItem>
                  ))}
                </Select>
              </div>
            </CardBody>
            <CardFooter className="gap-2 justify-between">
              <Button onPress={handleBack} color="danger" variant="light">
                Voltar
              </Button>
              <Button type="submit" color="primary" disabled={isLoading}>
                Salvar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
