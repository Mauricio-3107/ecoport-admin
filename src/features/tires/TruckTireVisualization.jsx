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
// import { DarkModeContext } from "../../context/DarkModeContext";

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const StatusSummary = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSection = styled.div``;

const BadgesContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CustomBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1.5rem;
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
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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
`;

const LegendItemContent = styled.div``;

const LegendItemSubtitle = styled.div`
  font-size: 1.5rem;
  color: var(--color-grey-600);
`;

const LegendNote = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: var(--color-grey-600);
  font-style: italic;
`;

const TruckTireVisualization = ({ initialTires }) => {
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

    if (isRightSide) {
      // For right side tires, position tooltip slightly to the left of the tire
      // but not as far as before, using a smaller offset
      x = rect.left - svgContainerRect.left - 270; // Less offset
    } else {
      // For left side tires, keep the current positioning
      x = rect.right - svgContainerRect.left + 10;
    }

    y = rect.top - svgContainerRect.top;

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
          <Heading as="h3">
            Click on any tire to view details and update information
          </Heading>
        </HeaderSection>

        <BadgesContainer>
          <CustomBadge>
            <HiOutlineCheckCircle size={22} color="var(--color-green-300)" />
            <span>{statusCounts.good} Good</span>
          </CustomBadge>
          <CustomBadge>
            <HiOutlineExclamationTriangle
              size={22}
              color="var(--color-yellow-300)"
            />
            <span>{statusCounts.warning} Warning</span>
          </CustomBadge>
          <CustomBadge>
            <HiOutlineInformationCircle
              size={22}
              color="var(--color-red-300)"
            />
            <span>{statusCounts.critical} Critical</span>
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
          <TireTooltip
            tire={selectedTire}
            isEditing={isEditing}
            position={tooltipPosition}
            onClose={handleCloseTooltip}
            onUpdateTire={handleUpdateTire}
          />
        )}
      </TruckContainer>

      {/* Legend */}
      <LegendContainer>
        <Heading as="h5">Mileage Status Legend</Heading>
        <LegendGrid>
          <LegendItem>
            <StatusIndicator color="var(--color-green-300)" />
            <LegendItemContent>
              <Heading as="h2">Good Condition</Heading>
              <LegendItemSubtitle>Less than 30,000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
          <LegendItem>
            <StatusIndicator color="var(--color-yellow-300)" />
            <LegendItemContent>
              <Heading as="h2">Warning</Heading>
              <LegendItemSubtitle>30,000 - 40,000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
          <LegendItem>
            <StatusIndicator color="var(--color-red-300)" />
            <LegendItemContent>
              <Heading as="h2">Critical</Heading>
              <LegendItemSubtitle>More than 40,000 km</LegendItemSubtitle>
            </LegendItemContent>
          </LegendItem>
        </LegendGrid>

        <LegendNote>
          Note: Tire colors indicate the mileage status. Click on any tire to
          view details and update information.
        </LegendNote>
      </LegendContainer>
    </Container>
  );
};

export default TruckTireVisualization;
