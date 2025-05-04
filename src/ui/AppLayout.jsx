import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    padding-top: 7rem; // Add space for fixed header (~56px + gap)
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ToggleButton = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    top: 1.8rem;
    left: 2rem;
    z-index: 1100;
    background: none;
    border: none;
    font-size: 3rem;
    color: var(--color-grey-700);
  }
`;

const HeaderWrapper = styled.div`
  grid-area: header;
  z-index: 900; // So it stays above Sidebar if needed
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999; // slightly above ToggleButton
    background-color: var(--color-grey-0);
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // ☰
  return (
    <StyledAppLayout>
      <ToggleButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
        {isSidebarOpen ? <IoMdClose size={25} /> : <RiMenu2Fill size={25} />}
      </ToggleButton>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
