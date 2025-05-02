import styled from "styled-components";
import useMediaQuery from "../../hooks/useMediaQuery";

const TruckSvgContainer = styled.svg`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    transform: scale(2.5);
    /* transform-origin: top; */
  }
`;

const TireCircle = styled.circle`
  fill: ${(props) => props.color};
  stroke: var(--color-grey-500);
  stroke-width: 2;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    stroke: var(--color-indigo-700);
  }

  /* @media screen and (max-width: 768px) {
    r: 26;
  } */
`;

const TireText = styled.text`
  font-size: 12px;
  fill: var(--color-grey-800);
  text-anchor: middle;
  font-weight: bold;
  pointer-events: none;

  /* @media screen and (max-width: 768px) {
    font-size: 13px;
  } */
`;

const AxleLabel = styled.text`
  font-size: 14px;
  fill: var(--color-grey-500);
  font-weight: 500;
`;

const SectionLabel = styled.text`
  font-size: 16px;
  fill: var(--color-grey-700);
  font-weight: 600;
  text-anchor: middle;
`;

const LegendTitle = styled.text`
  font-size: 12px;
  font-weight: 500;
  fill: var(--color-grey-500);
`;

const LegendItem = styled.text`
  font-size: 11px;
  fill: var(--color-grey-500);
`;

const TruckSvg = ({ tires, getTireStatusColor, onTireClick }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const is6axle = tires.length > 18;
  const pxOffset = is6axle ? 75 : 0;
  const pxOffset3Axle = is6axle ? 60 : 0;
  // Map of tire positions to coordinates
  const tirePositions = {
    // Front axle (tractor) - 2 tires
    FL1: { x: 350, y: 100 },
    FR1: { x: 450, y: 100 },

    // Second axle (tractor) - 4 tires
    "2L1": { x: 320, y: 180 },
    "2L2": { x: 270, y: 180 },
    "2R1": { x: 480, y: 180 },
    "2R2": { x: 530, y: 180 },

    // Gap between tractor and trailer

    // Third axle (trailer) - 4 tires
    "3L1": { x: 320, y: 320 - pxOffset3Axle },
    "3L2": { x: 270, y: 320 - pxOffset3Axle },
    "3R1": { x: 480, y: 320 - pxOffset3Axle },
    "3R2": { x: 530, y: 320 - pxOffset3Axle },

    // Fourth axle (trailer) - 4 tires
    "4L1": { x: 320, y: 390 },
    "4L2": { x: 270, y: 390 },
    "4R1": { x: 480, y: 390 },
    "4R2": { x: 530, y: 390 },

    // Fifth axle (trailer) - 4 tires
    "5L1": { x: 320, y: 460 },
    "5L2": { x: 270, y: 460 },
    "5R1": { x: 480, y: 460 },
    "5R2": { x: 530, y: 460 },

    // Sixth axle (trailer) - 4 tires
    "6L1": { x: 320, y: 530 },
    "6L2": { x: 270, y: 530 },
    "6R1": { x: 480, y: 530 },
    "6R2": { x: 530, y: 530 },
  };

  return (
    <TruckSvgContainer viewBox={`0 0 800 ${550 + pxOffset}`}>
      {/* Truck chassis */}
      <g id="truckChassis">
        {/* Tractor body */}
        <rect
          x="300"
          y="50"
          width="200"
          height={`${170 + pxOffset}`}
          fill="var(--color-silver-100)"
          stroke="#94A3B8"
          strokeWidth="2"
          rx="10"
        />

        {/* Trailer body */}
        <rect
          x="250"
          y={`${270 + pxOffset}`}
          width="300"
          height="230"
          fill="var(--color-silver-100)"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {/* Connection between tractor and trailer */}
        <line
          x1="400"
          y1={`${220 + pxOffset}`}
          x2="400"
          y2={`${270 + pxOffset}`}
          stroke="#94A3B8"
          strokeWidth="4"
        />

        {/* Axle lines - Tractor */}
        <line
          x1="300"
          y1="100"
          x2="500"
          y2="100"
          stroke="#94A3B8"
          strokeWidth="4"
        />
        <line
          x1="250"
          y1="180"
          x2="550"
          y2="180"
          stroke="#94A3B8"
          strokeWidth="4"
        />

        {/* Axle lines - Trailer */}
        {/* 3rd Axle */}
        <line
          x1="250"
          y1={`${320 - pxOffset3Axle}`}
          x2="550"
          y2={`${320 - pxOffset3Axle}`}
          stroke="#94A3B8"
          strokeWidth="4"
        />
        {/* 4th Axle */}
        <line
          x1="250"
          y1="390"
          x2="550"
          y2="390"
          stroke="#94A3B8"
          strokeWidth="4"
        />
        {/* 5th Axle */}
        <line
          x1="250"
          y1="460"
          x2="550"
          y2="460"
          stroke="#94A3B8"
          strokeWidth="4"
        />
        {/* 6th Axle */}
        {is6axle && (
          <line
            x1="250"
            y1="530"
            x2="550"
            y2="530"
            stroke="#94A3B8"
            strokeWidth="4"
          />
        )}

        {/* Axle labels */}
        {isMobile ? null : (
          <>
            <AxleLabel x="570" y="105">
              1st Axle
            </AxleLabel>
            <AxleLabel x="570" y="185">
              2nd Axle
            </AxleLabel>
            <AxleLabel x="570" y={`${325 - pxOffset3Axle}`}>
              3rd Axle
            </AxleLabel>
            <AxleLabel x="570" y="395">
              4th Axle
            </AxleLabel>
            <AxleLabel x="570" y="465">
              5th Axle
            </AxleLabel>
            {is6axle && (
              <AxleLabel x="570" y="535">
                6th Axle
              </AxleLabel>
            )}
          </>
        )}

        {/* Section labels */}
        <SectionLabel x="400" y="30">
          Tracto
        </SectionLabel>
        <SectionLabel x="400" y={`${250 + pxOffset}`}>
          Semirremolque
        </SectionLabel>
      </g>

      {/* Tires */}
      {tires.map((tire) => {
        const position = tirePositions[tire.tireId];
        if (!position) return null;

        return (
          <g
            key={tire.id}
            className="tire-element"
            data-tire-id={tire.tireId}
            transform={`translate(${position.x}, ${position.y})`}
            onClick={(e) => onTireClick(tire, e)}
          >
            <TireCircle
              cx="0"
              cy="0"
              r="22"
              color={getTireStatusColor(tire.odometerKm)}
            />
            <TireText x="0" y="5">
              {tire.tireId}
            </TireText>
          </g>
        );
      })}

      {/* Legend for naming convention */}
      {isMobile ? null : (
        <g transform="translate(40, 80)">
          <LegendTitle>Tire ID Format:</LegendTitle>
          <LegendItem y="20">FL1 = Front Left</LegendItem>
          <LegendItem y="40">2L1 = Second Axle Left Inner</LegendItem>
          <LegendItem y="60">2L2 = Second Axle Left Outer</LegendItem>
          <LegendItem y="80">4R1 = Fourth Axle Right Inner</LegendItem>
          <LegendItem y="100">4R2 = Fourth Axle Right Outer</LegendItem>
        </g>
      )}
    </TruckSvgContainer>
  );
};

export default TruckSvg;
