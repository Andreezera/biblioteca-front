import { createBrowserRouter } from "react-router-dom";
import { PrivateWrapper } from "./components/private-wrapper";
import { AlunosPage } from "./pages/alunos";
import { HomePage } from "./pages/home";
import { LivrosPage } from "./pages/livros";
import { LoginPage } from "./pages/login";
import { ProfessoresPage } from "./pages/professores";
import { EmprestimosPage } from "./pages/emprestimos";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <PrivateWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/professores/:id",
        element: <ProfessoresPage />,
      },
      {
        path: "/alunos/:id",
        element: <AlunosPage />,
      },
      {
        path: "/livros/:id",
        element: <LivrosPage />,
      },
      {
        path: "/emprestimos",
        element: <EmprestimosPage />,
      },
    ],
  },
]);
