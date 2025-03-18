import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "3147 FHD",
    value: 1,
    color: "#b91c1c", // Deep Red (Power, urgency)
  },
  {
    duration: "3458 XLN",
    value: 0,
    color: "#ea580c", // Burnt Orange (Visibility, energy)
  },
  {
    duration: "4016 LBN",
    value: 0,
    color: "#facc15", // Highway Yellow (Caution, visibility)
  },
  {
    duration: "4271 KRS",
    value: 0,
    color: "#15803d", // Deep Green (Stability, trucking culture)
  },
  {
    duration: "4476 HDE",
    value: 1,
    color: "#065f46", // Dark Teal Green (Strong, industrial)
  },
  {
    duration: "4781 IXN",
    value: 1,
    color: "#2563eb", // Trucking Blue (Trust, logistics)
  },
  {
    duration: "4707 FKN",
    value: 1,
    color: "#1e3a8a", // Navy Blue (Reliability, professionalism)
  },
  {
    duration: "4820 XIN",
    value: 1,
    color: "#525252", // Dark Gray (Strength, industry)
  },
  {
    duration: "5207 LUE",
    value: 1,
    color: "#71717a", // Steel Gray (Heavy-duty, toughness)
  },
  {
    duration: "5255 DSD",
    value: 1,
    color: "#0f172a", // Midnight Blue (Solid, corporate)
  },
  {
    duration: "5255 DTG",
    value: 1,
    color: "#eab308", // Safety Yellow (Visibility, trucking signs)
  },
  {
    duration: "5570 FDC",
    value: 1,
    color: "#991b1b", // Dark Red (Strength, urgency)
  },
  {
    duration: "5570 FCY",
    value: 1,
    color: "#3730a3", // Deep Indigo (Powerful, premium feel)
  },
  {
    duration: "5608 FDX",
    value: 0,
    color: "#3f3f46", // Charcoal Gray (Rugged, dependable)
  },
  {
    duration: "5730 XGP",
    value: 0,
    color: "#d97706", // Dark Amber (Bold, heavy-duty)
  },
  {
    duration: "6005 DTR",
    value: 0,
    color: "#1c1917", // Asphalt Black (Road, trucking industry)
  },
];


const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays, todayKilometers }) {
  console.log(confirmedStays.at(0));

  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Actividad de Hoy</Heading>
      <Heading as="h4">{todayKilometers}</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
