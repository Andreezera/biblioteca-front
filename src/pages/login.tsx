import { login, register, setToken } from "@/api/auth-service";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [selected, setSelected] = React.useState<React.Key>("login");
  const navigate = useNavigate();

  async function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { token } = await login({ email, password });

    setToken(token);

    navigate("/");
  }

  async function handleSubmitSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    register({ email, password, role });

    setSelected("login");
  }

  return (
    <div className="fixed inset-0 flex flex-col w-full items-center justify-center">
      <Card className="max-w-full w-[340px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs"
            selectedKey={selected as string}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Entrar">
              <form
                onSubmit={handleSubmitLogin}
                className="flex flex-col gap-4"
              >
                <Input isRequired label="Email" type="email" name="email" />
                <Input
                  isRequired
                  label="Senha"
                  type="password"
                  name="password"
                />
                <p className="text-center text-small">
                  Precisa criar uma conta?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Cadastre-se
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Entrar
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Cadastre-se">
              <form
                onSubmit={handleSubmitSignUp}
                className="flex flex-col gap-4 h-[300px]"
              >
                <Input isRequired label="Email" type="email" name="email" />
                <Input
                  isRequired
                  label="Senha"
                  type="password"
                  name="password"
                />
                <Input isRequired label="Tipo" type="role" />
                <p className="text-center text-small">
                  Já tem uma conta?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Entrar
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Cadastre-se
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
