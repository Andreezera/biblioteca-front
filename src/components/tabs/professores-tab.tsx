import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { ProfessoresTable } from "../tables/professores-table";
import { useNavigate } from "react-router-dom";

export function ProfessoresTab() {
  const navigate = useNavigate();

  function handleAdd() {
    navigate("/professores/novo");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Professores</h1>
          <Button onPress={handleAdd} size="sm" className="gap-2">
            <PlusCircle className="size-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <ProfessoresTable />
      </CardBody>
    </Card>
  );
}
