import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { AutoresTable } from "../tables/autores-tables";

export function AutoresTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Autores</h1>
        </div>
      </CardHeader>
      <CardBody>
        <AutoresTable />
      </CardBody>
    </Card>
  );
}
