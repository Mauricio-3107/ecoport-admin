import ActivityFilter from "../features/activity/ActivityFilter";
import ActivityLayout from "../features/activity/ActivityLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Activity() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Actividad</Heading>
        <ActivityFilter />
      </Row>

      <ActivityLayout />
    </>
  );
}

export default Activity;
