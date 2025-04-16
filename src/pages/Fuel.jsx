import FuelTable from "../features/fuel/FuelTable";
import FuelTableOperations from "../features/fuel/FuelTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Fuel() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Consumo de Combustible</Heading>
        <FuelTableOperations />
      </Row>
      <Row>
        <FuelTable />
      </Row>
    </>
  );
}

export default Fuel;
