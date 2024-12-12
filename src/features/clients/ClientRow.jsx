import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteClient } from "./useDeleteClient";
import CreateClientForm from "./CreateClientForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Client = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ContactName = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const PhoneNumber = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function ClientRow({ client }) {
  const { isDeleting, deleteClient } = useDeleteClient();
  const {
    id: clientId,
    name,
    contactName,
    email,
    phoneNumber,
    image,
    city,
    type,
  } = client;
  return (
    <Table.Row role="row">
      <Img src={image} />
      <Client>{name}</Client>
      <ContactName>{contactName}</ContactName>
      <PhoneNumber>{phoneNumber}</PhoneNumber>

      <div>{email}</div>
      <div>{city}</div>
      <div>{type}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={clientId} />

            <Menus.List id={clientId}>
              <Modal.Open opens="edit-client">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete-client">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-client">
              <CreateClientForm clientToEdit={client} />
            </Modal.Window>
            <Modal.Window name="delete-client">
              <ConfirmDelete
                resourceName="client"
                onConfirm={() => deleteClient(clientId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
    // My boy
  );
}

export default ClientRow;
