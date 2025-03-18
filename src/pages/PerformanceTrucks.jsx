import PerformanceTrucksLayout from "../features/performanceTrucks/PerformanceTrucksLayout";
import PerformanceTrucksFilter from "../features/performanceTrucks/PerformanceTrucksFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PerformanceTrucks() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Performance Trucks</Heading>
        <PerformanceTrucksFilter />
      </Row>

      <PerformanceTrucksLayout />
    </>
  );
}

export default PerformanceTrucks;
