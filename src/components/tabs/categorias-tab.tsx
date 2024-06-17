import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CategoriasTable } from "../tables/categorias-table";

export function CategoriasTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Categorias</h1>
        </div>
      </CardHeader>
      <CardBody>
        <CategoriasTable />
      </CardBody>
    </Card>
  );
}
