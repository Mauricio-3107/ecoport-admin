import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    align-content: start; /* <- Push content to the top */
    padding: 4rem 1.2rem 2rem; /* Top padding adds breathing space */
    gap: 2.4rem;
  }

  @media screen and (min-width: 769px) {
    align-content: center;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Inicia sesión en tu cuenta</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
