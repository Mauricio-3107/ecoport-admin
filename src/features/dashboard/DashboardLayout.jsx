import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";

import Spinner from "../../ui/Spinner";
import TrucksDrivenRuntimeChart from "../../ui/TrucksDrivenRuntimeChart";
import TrucksDrivenMileageChart from "../../ui/TrucksDrivenMileageChart";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DocumentsExpiringSoon from "./DocumentsExpiringSoon";

import { useTrucks } from "../trucks/useTrucks";
import { useRecentTrips } from "./useRecentTrips";
import { useCompany } from "../company/useCompany";
import { useTotalMileageTrucks } from "./useTotalMileageTrucks";
import { useTrucksMileageRuntime } from "./useTrucksMileageRuntime";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto auto 34rem; */
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;

  // Stretch just the Stats section
  & > :first-child {
    grid-column: 1 / -1;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    /* grid-template-rows: 1fr; */
    row-gap: 2.4rem;
    overflow-x: auto;
  }
`;

function formatCompanyDocs(companyData) {
  if (!companyData) return [];
  const mainCompany = "ECOPORT SRL";
  const extraCompany = "SIR SRL";

  return [
    {
      company: mainCompany,
      name: "Permiso ocasional",
      expiryDate: companyData.ocassionalDocument,
    },
    {
      company: extraCompany,
      name: "Permiso ocasional",
      expiryDate: companyData.ocassionalDocumentExtra,
    },
    {
      company: mainCompany,
      name: "Token Suma",
      expiryDate: companyData.expirationToken,
    },
    {
      company: extraCompany,
      name: "Token Suma",
      expiryDate: companyData.expirationTokenExtra,
    },
    {
      company: mainCompany,
      name: "Seprec",
      expiryDate: companyData.seprec,
    },
    {
      company: extraCompany,
      name: "Seprec",
      expiryDate: companyData.seprecExtra,
    },
  ].filter((doc) => {
    const expiryDate = parseISO(doc?.expiryDate); // Parse correctly
    const daysLeft = differenceInDays(
      expiryDate,
      new Date().setHours(0, 0, 0, 0)
    );
    return daysLeft <= 30;
  }); // Remove empty values
}

function formatTrucksDocs(trucksData) {
  if (!trucksData || !Array.isArray(trucksData)) return [];

  return trucksData
    .flatMap((truck) => [
      {
        licensePlate: truck.licensePlate,
        name: "Seguro",
        expiryDate: truck.insurance,
      },
      {
        licensePlate: truck.licensePlate,
        name: "Tarjeta de Operaciones",
        expiryDate: truck.operationsCard,
      },
    ])
    .filter((doc) => {
      const expiryDate = parseISO(doc.expiryDate); // Ensure valid date
      const daysLeft = differenceInDays(
        expiryDate,
        new Date().setHours(0, 0, 0, 0)
      );
      return daysLeft <= 30; // Only keep documents expiring in 30 days or less
    });
}

function DashboardLayout() {
  // Recent trips
  const { trips, isLoading: isLoadingTrips, numDays } = useRecentTrips();

  // Total Mileage trucks
  const { totalMileageTrucks, isLoading: isLoadingTotalMileage } =
    useTotalMileageTrucks();

  // Trucks mileage runtime
  const { trucksMileageRuntime, isLoading: isLoadingTrucksMileageRuntime } =
    useTrucksMileageRuntime();

  // Documents expiring soon Company
  const { isLoading: isLoadingCompanyDocuments, company = {} } = useCompany();

  // Documents expiry soon Trucks
  const { isLoading: isLoadingTrucksData, trucks } = useTrucks();

  // searchParams
  const [searchParams] = useSearchParams();

  // Loading states
  if (
    isLoadingTrips ||
    isLoadingTotalMileage ||
    isLoadingTrucksMileageRuntime ||
    isLoadingCompanyDocuments ||
    isLoadingTrucksData
  )
    return <Spinner />;

  //Filer value
  const filterValue = !searchParams.get("last")
    ? "7"
    : searchParams.get("last");

  let pastKilometers;
  if (filterValue === "7") pastKilometers = totalMileageTrucks.last7Days;
  if (filterValue === "30") pastKilometers = totalMileageTrucks.last30Days;

  // Company docs
  const companyDocs = formatCompanyDocs(company);

  const trucksDocs = formatTrucksDocs(trucks);

  return (
    <StyledDashboardLayout>
      <Stats trips={trips} kilometers={pastKilometers} />
      <SalesChart trips={trips} numDays={numDays} />
      <TrucksDrivenMileageChart
        trucksMileageRuntime={trucksMileageRuntime}
        totalMileage={totalMileageTrucks}
        title="Actividad Hoy (Km recorridos)"
        height={400}
        period="Today"
      />

      <TrucksDrivenRuntimeChart
        trucksMileageRuntime={trucksMileageRuntime}
        title="Actividad de hoy (Tiempo recorrido)"
        height={400}
        period="Today"
      />

      <DocumentsExpiringSoon
        companyDocs={companyDocs}
        trucksDocs={trucksDocs}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
