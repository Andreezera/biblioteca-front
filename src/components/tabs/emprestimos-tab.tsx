import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { EmprestimosTable } from "../tables/emprestimos-table";
import { useNavigate } from "react-router-dom";

export function EmprestimosTab() {
  const navigate = useNavigate();

  function handleAdd() {
    navigate("/emprestimos/novo");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Emprestimos</h1>
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
