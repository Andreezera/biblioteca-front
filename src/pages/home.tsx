import "@/styles/globals.css";

import { AlunosTab } from "@/components/tabs/alunos-tab";
import { AutoresTab } from "@/components/tabs/autores-tab";
import { CategoriasTab } from "@/components/tabs/categorias-tab";
import { EditorasTab } from "@/components/tabs/editoras-tab";
import { EmprestimosTab } from "@/components/tabs/emprestimos-tab";
import { LivrosTab } from "@/components/tabs/livros-tab";
import { ProfessoresTab } from "@/components/tabs/professores-tab";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { LogOut, Square, User } from "lucide-react";
import React from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

type TabKey =
  | "emprestimos"
  | "livros"
  | "alunos"
  | "professores"
  | "autores"
  | "categorias"
  | "editoras";

type TabItem = {
  component?: React.ReactNode;
  key?: TabKey;
  title?: string;
  icon?: React.ReactNode;
};

const tabs: TabItem[] = [
  {
    key: "emprestimos",
    title: "Empréstimos",
    component: <EmprestimosTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "livros",
    title: "Livros",
    component: <LivrosTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "alunos",
    title: "Alunos",
    component: <AlunosTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "professores",
    title: "Professores",
    component: <ProfessoresTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "autores",
    title: "Autores",
    component: <AutoresTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "categorias",
    title: "Categorias",
    component: <CategoriasTab />,
    icon: <User className="size-4" />,
  },
  {
    key: "editoras",
    title: "Editoras",
    component: <EditorasTab />,
    icon: <User className="size-4" />,
  },
];

export function HomePage() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <>
      <Navbar maxWidth="2xl">
        <NavbarBrand>
          <Square />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              onClick={() => {
                signOut();
                navigate(0);
              }}
              isIconOnly
              color="danger"
              variant="flat"
            >
              <LogOut className="size-4" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="p-5">
        <div className="flex w-full flex-col container mx-auto">
          <Tabs variant="light" aria-label="Tabs">
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                title={
                  <div className="flex items-center space-x-2">
                    {tab.icon}
                    <span>{tab.title}</span>
                  </div>
                }
              >
                {tab.component}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
