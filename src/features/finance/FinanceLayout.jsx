import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import MonthCard from "./MonthCard"; // Your new component

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#111" : "#f9fafb")};
`;

function FinanceLayout({ monthlyData }) {
  const { isDarkMode } = useDarkMode();

  return (
    <Grid $isDarkMode={isDarkMode}>
      {monthlyData.map((month) => (
        <MonthCard
          key={month.month}
          month={month.month}
          backgroundImage={month.backgroundImage}
          resourcePath={"finance"}
          isDarkMode={isDarkMode}
        />
      ))}
    </Grid>
  );
}

export default FinanceLayout;
