import { getLivros } from "@/api/livros-service";
import { Livro } from "@/models/livro";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import React from "react";
import { LivroForm } from "../forms/livro-form";
import { LivrosTable } from "../tables/livros-table";

export function LivrosTab() {
  const [data, setData] = React.useState<Livro[]>([]);

  function fetchLivros() {
    getLivros().then(setData);
  }

  React.useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg">Livros</h1>
          <LivroForm onSucess={fetchLivros}>
            {(onOpen) => (
              <Button size="sm" className="gap-2" onClick={onOpen}>
                <PlusCircle className="size-4" />
                <span>Adicionar</span>
              </Button>
            )}
          </LivroForm>
        </div>
      </CardHeader>
      <CardBody>
        <LivrosTable data={data} />
      </CardBody>
    </Card>
  );
}
