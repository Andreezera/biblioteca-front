import {
  Button,
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmprestimosTable } from "../tables/emprestimos-table";

export function EmprestimosTab() {
  const navigate = useNavigate();

  function handleAdd() {
    navigate("/emprestimos");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Empréstimos</h1>
          <Button onPress={handleAdd} size="sm" className="gap-2">
            <PlusCircle className="size-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <EmprestimosTable />
      </CardBody>
    </Card>
  );
}
