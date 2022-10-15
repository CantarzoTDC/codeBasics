import { useState, useEffect, FormEvent } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Container, Content, Logo } from "./styles";

import { api } from "../../services/api";

interface Iuser {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export function SignIn() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<Iuser[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    try {
      console.log("opa");
      const schema = Yup.object().shape({
        password: Yup.string().required("A senha é obrigatória"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });

      await schema.validate({ email, password });

      // const response = await api.post("/sign-in", {
      //   email,
      //   password,
      // });

      navigate("/");

      // console.log(response.data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(
          "Ocorreu um erro ao fazer login, verifique as credenciais",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <Logo>
            <h1>
              <span>codeBasics</span>
            </h1>
          </Logo>
          <form onClick={(e) => handleSignIn(e)}>
            <h1>Faça seu logon</h1>
            <Input
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Entrar</button>
          </form>
        </div>
      </Content>

      <img
        src="https://cdn.dribbble.com/userupload/3512197/file/original-dd8e590e4245ba420453f432c7880787.jpg?compress=1&resize=752x"
        alt=""
      />
    </Container>
  );
}
