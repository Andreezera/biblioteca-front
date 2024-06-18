import { createProfessor, getProfessor, updateProfessor } from "@/api/professores-service";
import { Professor } from "@/models/professor";
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

export function EmprestimosPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = React.useState<Professor>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isNew = id === "novo";

  React.useEffect(() => {
    function fetchData() {
      setIsLoading(true);

      getProfessor(Number(id))
        .then((data) => setFormData(data))
        .catch(() => toast.error("Erro ao buscar o professor!"))
        .finally(() => setIsLoading(false));
    }

    !isNew && fetchData();
  }, [id, isNew]);

  function onChangeValue(value: string, key: keyof Professor) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const action = isNew
      ? createProfessor(formData)
      : updateProfessor(formData, Number(id));

    action
      .then(() => {
        toast.success("Professor salvo com sucesso!");
        setFormData({});
        navigate("/");
      })
      .catch(() => toast.error("Erro ao salvar professor!"))
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
            <CardHeader>{isNew ? "Novo" : "Editar"} Professor</CardHeader>
            <CardBody className="overflow-hidden">
              <div className="flex flex-col gap-y-5">
                <Input
                  label="Nome"
                  value={formData.nome}
                  onChange={(e) => onChangeValue(e.target.value, "nome")}
                  disabled={isLoading}
                />
                <Input
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={(e) => onChangeValue(e.target.value, "email")}
                  disabled={isLoading}
                />
                <Input
                  label="CPF"
                  value={formData.cpf}
                  onChange={(e) => onChangeValue(e.target.value, "cpf")}
                  disabled={isLoading}
                />
                <Input
                  label="Telefone"
                  value={formData.telefone?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "telefone")}
                  disabled={isLoading}
                />
                <Input
                  label="RP"
                  value={formData.rp?.toString()}
                  onChange={(e) => onChangeValue(e.target.value, "rp")}
                  disabled={isLoading}
                />
                <Input
                  label="Departamento"
                  value={formData.departamento}
                  onChange={(e) =>
                    onChangeValue(e.target.value, "departamento")
                  }
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
