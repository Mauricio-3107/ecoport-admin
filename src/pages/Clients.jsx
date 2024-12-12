import AddClient from "../features/clients/AddClient";
import ClientTable from "../features/clients/ClientTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Clients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All clients</Heading>
      </Row>
      <Row>
        <ClientTable />
        <AddClient />
      </Row>
    </>
  );
}

export default Clients;
