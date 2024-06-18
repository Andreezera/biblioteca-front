import { createAluno, getAluno, updateAluno } from "@/api/alunos-service";
import { Aluno } from "@/models/aluno";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function AlunosPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = React.useState<Aluno>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isNew = id === "novo";

  React.useEffect(() => {
    function fetchData() {
      setIsLoading(true);

      getAluno(Number(id))
        .then((data) => setFormData(data))
        .catch(() => toast.error("Erro ao buscar o aluno!"))
        .finally(() => setIsLoading(false));
    }

    !isNew && fetchData();
  }, [id, isNew]);

  function onChangeValue(value: string, key: keyof Aluno) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const action = isNew
      ? createAluno(formData)
      : updateAluno(formData, Number(id));

    action
      .then(() => {
        toast.success("Aluno salvo com sucesso!");
        setFormData({});
        navigate("/");
      })
      .catch(() => toast.error("Erro ao salvar aluno!"))
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
            <CardHeader>{isNew ? "Novo" : "Editar"} Aluno</CardHeader>
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
                  type="email"
                  label="Email"
                  isRequired
                  value={formData.email}
                  onChange={(e) => onChangeValue(e.target.value, "email")}
                  disabled={isLoading}
                />
                <Input
                  label="CPF"
                  isRequired
                  value={formData.cpf}
                  onChange={(e) => onChangeValue(e.target.value, "cpf")}
                  disabled={isLoading}
                />
                <Input
                  label="Telefone"
                  isRequired
                  value={formData.telefone?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "telefone")}
                  disabled={isLoading}
                />
                <Input
                  label="RP"
                  isRequired
                  value={formData.ra?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "ra")}
                  disabled={isLoading}
                />
                <Input
                  label="Departamento"
                  isRequired
                  value={formData.curso}
                  onChange={(e) => onChangeValue(e.target.value, "curso")}
                  disabled={isLoading}
                />
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
