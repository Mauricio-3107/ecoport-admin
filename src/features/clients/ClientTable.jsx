import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ClientRow from "./ClientRow";
import { useClients } from "./useClients";
import useMediaQuery from "../../hooks/useMediaQuery";
import TilesGrid from "../../ui/TilesGrid";
import ClientTile from "./ClientTile";

function ClientTable() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, clients } = useClients();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  // Take out the 2 edge cases
  const realClients = clients.filter((client) => !client.hidden);

  // Filter
  const filterValue = searchParams.get("type") || "all";

  let filteredClients;
  if (filterValue === "all") filteredClients = realClients;
  if (filterValue === "export")
    filteredClients = realClients.filter((client) => client.type === "export");
  if (filterValue === "import")
    filteredClients = realClients.filter((client) => client.type === "import");

  // Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedClients = filteredClients.sort(
    (a, b) => a[field].localeCompare(b[field]) * modifier
  );

  if (isMobile) {
    return (
      <TilesGrid>
        {sortedClients.map((client) => (
          <ClientTile key={client.id} client={client} />
        ))}
      </TilesGrid>
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 1fr 0.5fr 1.5fr 1fr 0.5fr 0.3fr">
        <Table.Header role="row">
          <div></div>
          <div>Nombre</div>
          <div>Encargado(a)</div>
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
