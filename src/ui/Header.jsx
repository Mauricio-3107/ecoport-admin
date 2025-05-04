import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    padding: 1.2rem 2rem;
    gap: 1.2rem;
    position: sticky; /* 👈 clave */
    top: 0; /* 👈 anclado arriba */
    z-index: 1000; /* 👈 asegúrate que esté encima de otros elementos */
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
