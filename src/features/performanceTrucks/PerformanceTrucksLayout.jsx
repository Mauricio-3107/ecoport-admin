import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import TrucksDrivenMileageChart from "../../ui/TrucksDrivenMileageChart";
import TrucksDrivenRuntimeChart from "../../ui/TrucksDrivenRuntimeChart";
import { useTotalMileageTrucks } from "../dashboard/useTotalMileageTrucks";
import Spinner from "../../ui/Spinner";
import { useTrucksMileageRuntime } from "../dashboard/useTrucksMileageRuntime";
import { useRecentTripsPerformance } from "./useRecentTripsPerformance";
import TripsChart from "./TripsChart";
import IncomeChart from "./IncomeChart";
import LoadUtilizationChart from "./LoadUtilizationChart";

const StyledPerformanceTrucksLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto auto 34rem; */
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
`;

function PerformanceTrucksLayout() {
  // searchParams
  const [searchParams] = useSearchParams();

  //Filter value. It is already formatted on the desired value property
  const filterValuePeriod = !searchParams.get("last")
    ? "Today"
    : searchParams.get("last");

  // Trucks mileage runtime
  const { trucksMileageRuntime, isLoading: isLoadingTrucksMileageRuntime } =
    useTrucksMileageRuntime();

  // Total Mileage trucks
  const { totalMileageTrucks, isLoading: isLoadingTotalMileage } =
    useTotalMileageTrucks();

  // Trips
  const {
    isLoading: isLoadingTrips,
    trips,
    count,
  } = useRecentTripsPerformance();

  if (isLoadingTotalMileage || isLoadingTrucksMileageRuntime || isLoadingTrips)
    return <Spinner />;

  // Normalizing the trips variable
  const tripsIncomeByTruck = trips.reduce((acc, trip) => {
    const licensePlate = trip.truckDriverAssignments.trucks.licensePlate;
    if (!acc[licensePlate]) {
      acc[licensePlate] = { trips: 0, income: 0 };
    }
    acc[licensePlate].trips += 1;
    acc[licensePlate].income += trip.price;
    return acc;
  }, {});

  const trucksTripsData = Object.keys(tripsIncomeByTruck).map(
    (licensePlate) => ({
      licensePlate,
      trips: tripsIncomeByTruck[licensePlate].trips,
    })
  );

  const trucksIncomeData = Object.keys(tripsIncomeByTruck).map(
    (licensePlate) => ({
      licensePlate,
      income: tripsIncomeByTruck[licensePlate].income,
    })
  );

  // Load utilization
  const truckCapacities = {
    6: 45000, // 6-axle trucks
    4: 42000, // 5-axle trucks
  };

  // Calculate Load Utilization (%) for each truck
  const trucksLoadUtilization = trips.reduce((acc, trip) => {
    const { trucks } = trip.truckDriverAssignments;
    const licensePlate = trucks.licensePlate;
    const traction = trucks.traction; // Example: "6 x 4", "4 x 2"
    const tare = trucks.tare; // Stored tare weight

    // Determine the truck's max weight limit based on the first character of traction
    const axleKey = traction.startsWith("6") ? "6" : "4";
    const maxWeight = truckCapacities[axleKey];
    const realCapacity = maxWeight - tare; // Actual usable capacity

    if (!acc[licensePlate]) {
      acc[licensePlate] = { totalWeight: 0, capacity: realCapacity, trips: 0 };
    }

    acc[licensePlate].totalWeight += trip.cargoWeight;
    acc[licensePlate].trips += 1;

    return acc;
  }, {});

  // Convert to array format for charting
  const trucksLoadData = Object.keys(trucksLoadUtilization).map(
    (licensePlate) => {
      const { totalWeight, capacity, trips } =
        trucksLoadUtilization[licensePlate];
      return {
        licensePlate,
        loadUtilization: Number(
          ((totalWeight / trips / capacity) * 100).toFixed()
        ), // Percentage
      };
    }
  );

  const periodMessage =
    filterValuePeriod === "Today" ? "hoy" : `últimos ${filterValuePeriod} días`;

  return (
    <StyledPerformanceTrucksLayout>
      <TrucksDrivenMileageChart
        trucksMileageRuntime={trucksMileageRuntime}
        totalMileage={totalMileageTrucks}
        title={`Actividad ${periodMessage} (Km recorridos)`}
        height={450}
        period={filterValuePeriod}
        periodEmptyMessageData={periodMessage}
      />

      <TrucksDrivenRuntimeChart
        trucksMileageRuntime={trucksMileageRuntime}
        title={`Actividad ${periodMessage} (Tiempo recorrido)`}
        height={450}
        period={filterValuePeriod}
        periodEmptyMessageData={periodMessage}
      />

      <TripsChart
        trips={trucksTripsData}
        height={450}
        title={`Viajes ${periodMessage}`}
        totalTrips={count}
        periodEmptyMessageData={periodMessage}
      />

      <IncomeChart
        incomeData={trucksIncomeData}
        height={450}
        title={`Ingresos por unidad ${periodMessage}`}
        periodEmptyMessageData={periodMessage}
      />

      <LoadUtilizationChart
        trucksLoadData={trucksLoadData}
        height={450}
        title={`Capacidad Utilizada (%) ${periodMessage}`}
        periodEmptyMessageData={periodMessage}
      />
    </StyledPerformanceTrucksLayout>
  );
}

export default PerformanceTrucksLayout;
