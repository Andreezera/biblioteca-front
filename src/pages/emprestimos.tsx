import { getClientes } from "@/api/clientes-service";
import { createEmprestimo } from "@/api/emprestimos-service";
import { getExemplares } from "@/api/livros-service";
import { Cliente } from "@/models/cliente";
import { Emprestimo } from "@/models/emprestimo";
import { Exemplar } from "@/models/exemplar";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DataState {
  exemplares: Exemplar[];
  clientes: Cliente[];
}

export function EmprestimosPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<Emprestimo>({});
  const [data, setData] = React.useState<DataState>({
    exemplares: [],
    clientes: [],
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    function fetchDropdownData() {
      setIsLoading(true);

      Promise.all([getExemplares(), getClientes()])
        .then(([exemplares, clientes]) => {
          setData({ exemplares, clientes });
        })
        .finally(() => setIsLoading(false));
    }

    fetchDropdownData();
  }, []);

  function onChangeValue(value: string, key: keyof Emprestimo) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    createEmprestimo(formData)
      .then(() => {
        toast.success("Empréstimo salvo com sucesso!");
        setFormData({});
        navigate("/");
      })
      .catch(() => toast.error("Erro ao salvar empréstimo!"))
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
            <CardHeader>Novo Emprestimo</CardHeader>
            <CardBody className="overflow-hidden">
              <div className="flex flex-col gap-y-5">
                <DatePicker
                  label="Data de Devolução"
                  onChange={(e) => onChangeValue(e.toString(), "dataDevolucao")}
                  isRequired
                  minValue={today(getLocalTimeZone())}
                  isDisabled={isLoading}
                />
                <Select
                  label="Exemplar"
                  isRequired
                  onChange={(e) => onChangeValue(e.target.value, "exemplarId")}
                  disabled={isLoading}
                >
                  {data.exemplares.map(({ id, livro }) => (
                    <SelectItem key={id}>{`[#${id}] ${livro.nome}`}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="Cliente"
                  isRequired
                  onChange={(e) => onChangeValue(e.target.value, "idCliente")}
                  disabled={isLoading}
                >
                  {data.clientes.map(({ id, nome }) => (
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
