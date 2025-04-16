import styled from "styled-components";
import TruckTireVisualization from "./TruckTireVisualization";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  background-color: var(--color-grey-0, white);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardContainer = styled.div`
  width: 100%;
  /* max-width: 56rem; */
  min-width: 56rem;

  background-color: var(--color-grey-0, white);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;
const CardContent = styled.div`
  padding: 1.5rem;
`;

// Sample data representing trailer truck tires with 5 axles
// const initialTires = [
//   // Front axles (tractor)
//   {
//     id: 1,
//     tireId: "FL1",
//     position: "Front Left",
//     axle: 1,
//     mileage: 24500,
//     brand: "Michelin",
//     size: "385/65R22.5",
//     dateReset: new Date("2023-10-15"),
//     cost: 450.0,
//   },
//   {
//     id: 2,
//     tireId: "FR1",
//     position: "Front Right",
//     axle: 1,
//     mileage: 25100,
//     brand: "Michelin",
//     size: "385/65R22.5",
//     dateReset: new Date("2023-10-15"),
//     cost: 450.0,
//   },

//   // Second axle (tractor drive axle) - 4 tires
//   {
//     id: 3,
//     tireId: "2L1",
//     position: "Second Left Inner",
//     axle: 2,
//     mileage: 30200,
//     brand: "Bridgestone",
//     size: "315/70R22.5",
//     dateReset: new Date("2023-09-20"),
//     cost: 385.5,
//   },
//   {
//     id: 4,
//     tireId: "2L2",
//     position: "Second Left Outer",
//     axle: 2,
//     mileage: 28700,
//     brand: "Bridgestone",
//     size: "315/70R22.5",
//     dateReset: new Date("2023-09-20"),
//     cost: 385.5,
//   },
//   {
//     id: 5,
//     tireId: "2R1",
//     position: "Second Right Inner",
//     axle: 2,
//     mileage: 29600,
//     brand: "Bridgestone",
//     size: "315/70R22.5",
//     dateReset: new Date("2023-09-25"),
//     cost: 385.5,
//   },
//   {
//     id: 6,
//     tireId: "2R2",
//     position: "Second Right Outer",
//     axle: 2,
//     mileage: 31200,
//     brand: "Bridgestone",
//     size: "315/70R22.5",
//     dateReset: new Date("2023-09-25"),
//     cost: 385.5,
//   },

//   // Third axle (trailer) - 4 tires
//   {
//     id: 7,
//     tireId: "3L1",
//     position: "Third Left Inner",
//     axle: 3,
//     mileage: 35800,
//     brand: "Continental",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-08-10"),
//     cost: 410.75,
//   },
//   {
//     id: 8,
//     tireId: "3L2",
//     position: "Third Left Outer",
//     axle: 3,
//     mileage: 36500,
//     brand: "Continental",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-08-10"),
//     cost: 410.75,
//   },
//   {
//     id: 9,
//     tireId: "3R1",
//     position: "Third Right Inner",
//     axle: 3,
//     mileage: 35200,
//     brand: "Continental",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-08-15"),
//     cost: 410.75,
//   },
//   {
//     id: 10,
//     tireId: "3R2",
//     position: "Third Right Outer",
//     axle: 3,
//     mileage: 34800,
//     brand: "Continental",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-08-15"),
//     cost: 410.75,
//   },

//   // Fourth axle (trailer) - 4 tires
//   {
//     id: 11,
//     tireId: "4L1",
//     position: "Fourth Left Inner",
//     axle: 4,
//     mileage: 42800,
//     brand: "Goodyear",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-07-05"),
//     cost: 395.25,
//   },
//   {
//     id: 12,
//     tireId: "4L2",
//     position: "Fourth Left Outer",
//     axle: 4,
//     mileage: 39500,
//     brand: "Goodyear",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-07-05"),
//     cost: 395.25,
//   },
//   {
//     id: 13,
//     tireId: "4R1",
//     position: "Fourth Right Inner",
//     axle: 4,
//     mileage: 40200,
//     brand: "Goodyear",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-07-10"),
//     cost: 395.25,
//   },
//   {
//     id: 14,
//     tireId: "4R2",
//     position: "Fourth Right Outer",
//     axle: 4,
//     mileage: 41800,
//     brand: "Goodyear",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-07-10"),
//     cost: 395.25,
//   },

//   // Fifth axle (trailer) - 4 tires
//   {
//     id: 15,
//     tireId: "5L1",
//     position: "Fifth Left Inner",
//     axle: 5,
//     mileage: 38300,
//     brand: "Pirelli",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-06-20"),
//     cost: 420.0,
//   },
//   {
//     id: 16,
//     tireId: "5L2",
//     position: "Fifth Left Outer",
//     axle: 5,
//     mileage: 37800,
//     brand: "Pirelli",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-06-20"),
//     cost: 420.0,
//   },
//   {
//     id: 17,
//     tireId: "5R1",
//     position: "Fifth Right Inner",
//     axle: 5,
//     mileage: 39100,
//     brand: "Pirelli",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-06-25"),
//     cost: 420.0,
//   },
//   {
//     id: 18,
//     tireId: "5R2",
//     position: "Fifth Right Outer",
//     axle: 5,
//     mileage: 38700,
//     brand: "Pirelli",
//     size: "295/80R22.5",
//     dateReset: new Date("2023-06-25"),
//     cost: 420.0,
//   },
// ];

function TiresDetail({ licensePlate, tires }) {
  return (
    <>
      <Heading as="h1">Neumáticos: {licensePlate}</Heading>
      {!tires.length && <Empty resourceName="neumático" />}
      {tires.length > 0 && (
        <PageContainer>
          <CardContainer>
            <CardContent>
              <TruckTireVisualization initialTires={tires} />
            </CardContent>
          </CardContainer>
        </PageContainer>
      )}
    </>
  );
}

export default TiresDetail;
