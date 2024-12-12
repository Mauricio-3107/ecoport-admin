import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ClientRow from "./ClientRow";
import { useClients } from "./useClients";

function ClientTable() {
  const { isLoading, clients } = useClients();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  // Filter
  const filterValue = searchParams.get("type") || "all";

  let filteredClients;
  if (filterValue === "all") filteredClients = clients;
  if (filterValue === "export")
    filteredClients = clients.filter((client) => client.type === "export");
  if (filterValue === "import")
    filteredClients = clients.filter((client) => client.type === "import");

  // Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedClients = filteredClients.sort(
    (a, b) => a[field].localeCompare(b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 1fr 1fr 1.5fr 1fr 1fr 0.3fr">
        <Table.Header role="row">
          <div></div>
          <div>Nombre</div>
          <div>Contacto</div>
          <div>Telefono</div>
          <div>Correo</div>
          <div>Ciudad</div>
          <div>Tipo</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedClients}
          render={(client) => <ClientRow key={client.id} client={client} />}
        />
      </Table>
    </Menus>
  );
}

export default ClientTable;
