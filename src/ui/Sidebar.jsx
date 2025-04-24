import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 26rem;
  z-index: 1000;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media screen and (max-width: 768px) {
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }
`;
const NavContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3rem;

  @media screen and (max-width: 768px) {
    // Guarantees enough space for all items to show
    max-height: calc(100vh - 30rem); // adjust if needed
  }
`;

const BottomLine = styled.div`
  height: 1px;
  width: 80%;
  background-color: var(--color-grey-200);
  margin: 2rem auto 1rem auto;
`;

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <StyledSidebar className={isOpen ? "active" : ""}>
        <Logo />
        <NavContainer>
          <MainNav />
          <BottomLine />
        </NavContainer>
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
