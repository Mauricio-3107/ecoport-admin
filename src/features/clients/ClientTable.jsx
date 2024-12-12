import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ClientRow from "./ClientRow";
import { useClients } from "./useClients";

function ClientTable() {
  const { isLoading, clients } = useClients();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 1.8fr 1fr 1.5fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Nombre</div>
          <div>Contacto</div>
          <div>Telefono</div>
          <div>Correo</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={clients}
          render={(client) => <ClientRow key={client.id} client={client} />}
        />
      </Table>
    </Menus>
  );
}

export default ClientTable;
