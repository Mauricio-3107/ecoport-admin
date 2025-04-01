import { useTrucks } from "../features/trucks/useTrucks";
import TiresLayout from "../features/tires/TiresLayout";
import TiresTableOperations from "../features/tires/TiresTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Tires() {
  const { isLoading, trucks } = useTrucks();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Neumáticos</Heading>
        <TiresTableOperations />
      </Row>
      <TiresLayout trucks={trucks} />
    </>
  );
}

export default Tires;
