import AddClient from "../features/clients/AddClient";
import ClientTable from "../features/clients/ClientTable";
import ClientTableOperations from "../features/clients/ClientTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Clients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All clients</Heading>
        <ClientTableOperations />
      </Row>
      <Row>
        <ClientTable />
        <Row type="horizontal-no-space">
          <AddClient type="export" />
          <AddClient type="import" />
        </Row>
      </Row>
    </>
  );
}

export default Clients;
