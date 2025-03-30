import { useTrucks } from "../features/trucks/useTrucks";
import TyresLayout from "../features/tyres/TyresLayout";
import TyresTableOperations from "../features/tyres/TyresTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Tyres() {
  const { isLoading, trucks } = useTrucks();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Neumáticos</Heading>
        <TyresTableOperations />
      </Row>
      <TyresLayout trucks={trucks} />
    </>
  );
}

export default Tyres;
