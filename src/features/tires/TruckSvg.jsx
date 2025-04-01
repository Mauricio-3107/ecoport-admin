import styled from "styled-components";
// import PropTypes from "prop-types";

const TruckSvgContainer = styled.svg`
  width: 100%;
  height: 100%;
`;

const TireCircle = styled.circle`
  fill: ${(props) => props.color};
  stroke: #64748b;
  stroke-width: 2;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    stroke: #206fee;
  }
`;

const TireText = styled.text`
  font-size: 12px;
  fill: #1e293b;
  text-anchor: middle;
  font-weight: bold;
  pointer-events: none;
`;

const AxleLabel = styled.text`
  font-size: 14px;
  fill: #64748b;
  font-weight: 500;
`;

const SectionLabel = styled.text`
  font-size: 16px;
  fill: #334155;
  font-weight: 600;
  text-anchor: middle;
`;

const LegendTitle = styled.text`
  font-size: 12px;
  font-weight: 500;
  fill: #475569;
`;

const LegendItem = styled.text`
  font-size: 11px;
  fill: #64748b;
`;

const TruckSvg = ({ tires, getTireStatusColor, onTireClick }) => {
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
    "3L1": { x: 320, y: 320 },
    "3L2": { x: 270, y: 320 },
    "3R1": { x: 480, y: 320 },
    "3R2": { x: 530, y: 320 },

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
  };

  return (
    <TruckSvgContainer viewBox="0 0 800 550">
      {/* Truck chassis */}
      <g id="truckChassis">
        {/* Tractor body */}
        <rect
          x="300"
          y="50"
          width="200"
          height="170"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="2"
          rx="10"
        />

        {/* Trailer body */}
        <rect
          x="250"
          y="270"
          width="300"
          height="230"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {/* Connection between tractor and trailer */}
        <line
          x1="400"
          y1="220"
          x2="400"
          y2="270"
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
        <line
          x1="250"
          y1="320"
          x2="550"
          y2="320"
          stroke="#94A3B8"
          strokeWidth="4"
        />
        <line
          x1="250"
          y1="390"
          x2="550"
          y2="390"
          stroke="#94A3B8"
          strokeWidth="4"
        />
        <line
          x1="250"
          y1="460"
          x2="550"
          y2="460"
          stroke="#94A3B8"
          strokeWidth="4"
        />

        {/* Axle labels */}
        <AxleLabel x="570" y="105">
          1st Axle
        </AxleLabel>
        <AxleLabel x="570" y="185">
          2nd Axle
        </AxleLabel>
        <AxleLabel x="570" y="325">
          3rd Axle
        </AxleLabel>
        <AxleLabel x="570" y="395">
          4th Axle
        </AxleLabel>
        <AxleLabel x="570" y="465">
          5th Axle
        </AxleLabel>

        {/* Section labels */}
        <SectionLabel x="400" y="30">
          Tracto
        </SectionLabel>
        <SectionLabel x="400" y="250">
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
              color={getTireStatusColor(tire.mileage)}
            />
            <TireText x="0" y="5">
              {tire.tireId}
            </TireText>
          </g>
        );
      })}

      {/* Legend for naming convention */}
      <g transform="translate(40, 80)">
        <LegendTitle>Tire ID Format:</LegendTitle>
        <LegendItem y="20">FL1 = Front Left</LegendItem>
        <LegendItem y="40">2L1 = Second Axle Left Inner</LegendItem>
        <LegendItem y="60">2L2 = Second Axle Left Outer</LegendItem>
        <LegendItem y="80">4R1 = Fourth Axle Right Inner</LegendItem>
        <LegendItem y="100">4R2 = Fourth Axle Right Outer</LegendItem>
      </g>
    </TruckSvgContainer>
  );
};

// PropTypes for component validation
// TruckSvg.propTypes = {
//   tires: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       tireId: PropTypes.string.isRequired,
//       position: PropTypes.string.isRequired,
//       axle: PropTypes.number.isRequired,
//       mileage: PropTypes.number.isRequired,
//       brand: PropTypes.string.isRequired,
//       size: PropTypes.string.isRequired,
//       dateReset: PropTypes.instanceOf(Date).isRequired,
//       cost: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   getTireStatusColor: PropTypes.func.isRequired,
//   onTireClick: PropTypes.func.isRequired,
// };

export default TruckSvg;
