// File: MonthCard.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

// Helper: Convert month in "YYYY-MM" format to literal Spanish text.
const monthNamesSpanish = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function formatMonthLiteral(monthStr) {
  // Expect monthStr in "YYYY-MM" format, e.g., "2025-03"
  const [year, month] = monthStr.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNamesSpanish[monthIndex]} ${year}`;
}

// Styled components

const StyledMonthCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 4px 6px
    ${(props) =>
      props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  background-color: ${(props) => (props.$isDarkMode ? "#444" : "#fff")};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  /* Slight desaturation by default */
  filter: brightness(95%) grayscale(50%);
  transition: filter 0.3s ease-in-out;

  ${StyledMonthCard}:hover & {
    filter: brightness(100%) grayscale(0%);
  }
`;

// Overlay always visible: shows month in literal Spanish on the bottom left
const AlwaysOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

// Overlay visible only on hover: shows a larger title and a navigation button
const HoverOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${StyledMonthCard}:hover & {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#fff")};
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$isDarkMode ? "#3B8FCC" : "#007BFF")};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;

function MonthCard({ month, backgroundImage, resourcePath }) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const monthLiteral = formatMonthLiteral(month);

  const handleNavigation = () => {
    // Navigate to the details view for this month, e.g. /finance/2025-03
    navigate(`/${resourcePath}/${month}`);
  };

  return (
    <StyledMonthCard $isDarkMode={isDarkMode}>
      <BackgroundImage src={backgroundImage} alt={`Mes ${month}`} />
      <AlwaysOverlay>{monthLiteral}</AlwaysOverlay>
      <HoverOverlay>
        <Title $isDarkMode={isDarkMode}>{month}</Title>
        <Button $isDarkMode={isDarkMode} onClick={handleNavigation}>
          Ver Detalles
        </Button>
      </HoverOverlay>
    </StyledMonthCard>
  );
}

export default MonthCard;
