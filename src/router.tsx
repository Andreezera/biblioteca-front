import { createBrowserRouter } from "react-router-dom";
import { AlunosPage } from "./pages/alunos";
import { HomePage } from "./pages/home";
import { LivrosPage } from "./pages/livros";
import { LoginPage } from "./pages/login";
import { ProfessoresPage } from "./pages/professores";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
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
    path: "/emprestimos/:id",
    element: <LivrosPage />,
  },
]);
