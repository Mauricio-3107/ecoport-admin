import { BsFuelPump } from "react-icons/bs";
import { GiMovementSensor } from "react-icons/gi";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineGlobeAmericas,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineWrench,
} from "react-icons/hi2";
import { LiaOilCanSolid, LiaTruckPickupSolid } from "react-icons/lia";
import { MdAccountBalance } from "react-icons/md";
import { PiMoneyLight, PiTireLight } from "react-icons/pi";
import { SiRedbull } from "react-icons/si";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <SiRedbull />
            <span>Inicio</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/trucks">
            <HiOutlineTruck />
            <span>Camiones</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/drivers">
            <HiOutlineUser />
            <span>Conductores</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/trips">
            <HiOutlineGlobeAmericas />
            <span>Viajes</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/clients">
            <HiOutlineBriefcase />
            <span>Clientes</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/company">
            <HiOutlineDocumentText />
            <span>Empresa</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/pickup">
            <LiaTruckPickupSolid />
            <span>Camioneta</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/fuel">
            <BsFuelPump />
            <span>Combustible</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/activity">
            <GiMovementSensor />
            <span>Actividad</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/maintenance">
            <HiOutlineWrench />
            <span>Mantenimiento</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/oil">
            <LiaOilCanSolid />
            <span>Aceite</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/tires">
            <PiTireLight />
            <span>Neumáticos</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/tripCosts">
            <PiMoneyLight />
            <span>Gastos viaje</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/finance">
            <MdAccountBalance />
            <span>Finanzas</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
