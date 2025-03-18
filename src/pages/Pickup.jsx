import PickupFilter from "../features/pickup/PickupFilter";
import PickupLayout from "../features/pickup/PickupLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Pickup() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Pickup</Heading>
        <PickupFilter />
      </Row>

      <PickupLayout />
    </>
  );
}

export default Pickup;
