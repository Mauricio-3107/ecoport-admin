import { useState } from "react";
import TruckSvg from "./TruckSvg";
import TireTooltip from "./TireTooltip";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { useEditTires } from "./useEditTires";
import useMediaQuery from "../../hooks/useMediaQuery";
// import { DarkModeContext } from "../../context/DarkModeContext";

// Styled Components
const TooltipOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;

  @media screen and (max-width: 768px) {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
`;

const Container = styled.div`
  width: 100%;
  @media screen and (max-width: 768px) {
    min-width: 90%;
  }
`;

const StatusSummary = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderSection = styled.div``;

const BadgesContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.2rem;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const CustomBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 1.4rem;
    font-size: 1.3rem;
    min-width: 7.5rem;
    span {
      margin-top: 0.3rem;
      font-weight: 500;
      text-align: center;
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const TruckContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0, white);
  border-radius: 0.5rem;
  overflow: visible;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  @media screen and (max-width: 768px) {
    aspect-ratio: 10 / 19;
  }
`;

const LegendContainer = styled.div`
  margin-top: 1.5rem;
  background-color: var(--color-grey-0, white);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 1rem;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey-0, white);
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
`;

const StatusIndicator = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
  flex-shrink: 0;
  background-color: ${(props) => props.color};
  @media (min-width: 768px) {
    margin-right: 0.75rem;
  }
`;

const LegendItemContent = styled.div``;

const LegendItemSubtitle = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-600);
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    font-style: italic;
  }
`;

const LegendNote = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  font-style: italic;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TruckTireVisualization = ({ initialTires }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [tires, setTires] = useState(initialTires);
  const [selectedTire, setSelectedTire] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isEditing, editTires } = useEditTires();

  // Function to get color based on mileage
  const getTireStatusColor = (mileage) => {
    if (mileage > 40000) return "var(--color-red-300)"; // danger/critical
    if (mileage > 30000) return "var(--color-yellow-300)"; // warning
    return "var(--color-green-300)"; // success/good
  };

  // Calculate tire status counts for summary
  const statusCounts = {
    good: tires.filter((tire) => tire.odometerKm <= 30000).length,
    warning: tires.filter(
      (tire) => tire.odometerKm > 30000 && tire.odometerKm <= 40000
    ).length,
    critical: tires.filter((tire) => tire.odometerKm > 40000).length,
  };

  // Handle tire click to show tooltip
  const handleTireClick = (tire, event) => {
    event.stopPropagation();

    // Get position for the tooltip
    const rect = event.currentTarget.getBoundingClientRect();
    const svgContainerRect = document
      .getElementById("truckVisualization")
      ?.getBoundingClientRect() || { left: 0, top: 0 };
    // Adjust tooltip position based on where the tire is on the screen
    const isRightSide = tire.tireId.includes("R");

    // UPDATED CALCULATION: Adjust positioning for right side tires
    let x, y;

    if (isMobile) {
      // 🟢 Mobile: Tooltip appears **below the tire**, centered
      if (isRightSide) {
        x = rect.left - svgContainerRect.left - 200;
      } else {
        x = rect.right - svgContainerRect.left - 50;
      }
      y = rect.bottom - svgContainerRect.top + 10;
    } else {
      // 🖥️ Desktop: Keep side logic
      if (isRightSide) {
        x = rect.left - svgContainerRect.left - 260;
      } else {
        x = rect.right - svgContainerRect.left + 10;
      }
      y = rect.top - svgContainerRect.top;
    }

    setTooltipPosition({ x, y });
    setSelectedTire(tire);
    setIsTooltipVisible(true);
  };
  // Handle closing the tooltip
  const handleCloseTooltip = () => {
    setIsTooltipVisible(false);
    setSelectedTire(null);
  };

  const handleUpdateTire = (id, updates) => {
    editTires({ newTiresData: updates, id: id });

    setTires((prevTires) =>
      prevTires.map((tire) => (tire.id === id ? { ...tire, ...updates } : tire))
    );

    // Ensure tooltip shows updated values
    setSelectedTire((prevTire) => ({
      ...prevTire,
      ...updates,
    }));
  };

  // Handle click outside to close tooltip
  const handleContainerClick = (event) => {
    if (
      !event.target.closest(".tire-element") &&
      !event.target.closest(".tire-tooltip")
    ) {
      handleCloseTooltip();
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      {/* Status Summary */}
      <StatusSummary>
        <HeaderSection>
          <p>
            Haz click en cualquier neumático para ver los detalles y actualizar
            la información
          </p>
        </HeaderSection>

        <BadgesContainer>
          <CustomBadge>
            <HiOutlineCheckCircle
              size={isMobile ? 14 : 22}
              color="var(--color-green-300)"
            />
            <span>{statusCounts.good} Óptimo</span>
          </CustomBadge>
          <CustomBadge>
            <HiOutlineExclamationTriangle
              size={isMobile ? 14 : 22}
              color="var(--color-yellow-300)"
            />
            <span>{statusCounts.warning} Precaución</span>
          </CustomBadge>
          <CustomBadge>
            <HiOutlineInformationCircle
              size={isMobile ? 14 : 22}
              color="var(--color-red-300)"
            />
            <span>{statusCounts.critical} Crítico</span>
          </CustomBadge>
        </BadgesContainer>
      </StatusSummary>

      <TruckContainer id="truckVisualization">
        <TruckSvg
          tires={tires}
          getTireStatusColor={getTireStatusColor}
          onTireClick={handleTireClick}
        />

        {isTooltipVisible && selectedTire && (
          <>
            <TooltipOverlay onClick={handleCloseTooltip} />
            <TireTooltip
              tire={selectedTire}
              isEditing={isEditing}
              position={tooltipPosition}
              onClose={handleCloseTooltip}
              onUpdateTire={handleUpdateTire}
            />
          </>
        )}
      </TruckContainer>

      {/* Legend */}
      <LegendContainer>
        <Heading as={`${isMobile ? "h6" : "h5"}`}>
          Estado del kilometraje
        </Heading>
        <LegendGrid>
          <LegendItem>
            <StatusIndicator color="var(--color-green-300)" />
            <LegendItemContent>
              <Heading as={`${isMobile ? "h7" : "h2"}`}>
                Óptima Condición
              </Heading>
              <LegendItemSubtitle>Menos de 30.000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
          <LegendItem>
            <StatusIndicator color="var(--color-yellow-300)" />
            <LegendItemContent>
              <Heading as={`${isMobile ? "h7" : "h2"}`}>Precaución</Heading>
              <LegendItemSubtitle>30.000 - 40.000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
          <LegendItem>
            <StatusIndicator color="var(--color-red-300)" />
            <LegendItemContent>
              <Heading as={`${isMobile ? "h7" : "h2"}`}>Crítico</Heading>
              <LegendItemSubtitle>Más de 40.000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
        </LegendGrid>

        <LegendNote>
          Nota: Los colores de los neumáticos indican el kilometraje. 
        </LegendNote>
      </LegendContainer>
    </Container>
  );
};

export default TruckTireVisualization;
