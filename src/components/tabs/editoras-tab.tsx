import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { EditorasTable } from "../tables/editoras-tables";

export function EditorasTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Editoras</h1>
        </div>
      </CardHeader>
      <CardBody>
        <EditorasTable />
      </CardBody>
    </Card>
  );
}
