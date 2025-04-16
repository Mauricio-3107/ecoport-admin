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

const PhoneNumberWhatssapLink = styled.a`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EmailLink = styled.a`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-blue-700);
  text-decoration: none;
  display: block;
  max-width: 100%; /* Ensures it doesn't exceed the column width */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Prevents wrapping to a new line */

  &:hover {
    text-decoration: underline;
    overflow: visible; /* Show full text on hover */
    white-space: normal; /* Allow wrapping */
    word-break: break-all;
  }
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
      <PhoneNumberWhatssapLink
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {phoneNumber}
      </PhoneNumberWhatssapLink>

      <EmailLink href={`mailto:${email}`}>{email}</EmailLink>
      <div>{city}</div>
      <div>{type}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={clientId} />

            <Menus.List id={clientId}>
              <Modal.Open opens="edit-client">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete-client">
                <Menus.Button icon={<HiTrash />}>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-client">
              <CreateClientForm clientToEdit={client} />
            </Modal.Window>
            <Modal.Window name="delete-client">
              <ConfirmDelete
                resourceName="cliente"
                onConfirm={() => deleteClient(clientId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ClientRow;
