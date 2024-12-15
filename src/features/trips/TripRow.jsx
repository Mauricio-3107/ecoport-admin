import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateTripForm from "./CreateTripForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTrip } from "./useDeleteTrip";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function TripRow({ trip, truckDriverAssignments, clientsObject }) {
  const { isDeleting, deleteTrip } = useDeleteTrip();

  const {
    id: tripId,
    tripType,
    origin,
    destination,
    startDate,
    clients: { name },
    truckDriverAssignments: {
      trucks: { licensePlate },
      drivers: { fullName },
    },
  } = trip;

  const tripToEdit = {
    id: trip.id,
    tripType: trip.tripType,
    origin: trip.origin,
    destination: trip.destination,
    assignmentId: trip.truckDriverAssignments.id,
    startDate: trip.startDate.split("T")[0],
    client: trip.clients.id,
    price: trip.price,
  };

  return (
    <Table.Row role="row">
      <div></div>
      <div>{tripType}</div>
      <div>{origin}</div>
      <div>{destination}</div>
      <div>{startDate.split("T")[0]}</div>
      <Stacked>
        <span>{licensePlate}</span>
        <span>{fullName.split(" ").slice(0, 2).join(" ")}</span>
      </Stacked>
      <div>{name}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={tripId} />

            <Menus.List id={tripId}>
              <Modal.Open opens="edit-trip">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete-trip">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-trip">
              <CreateTripForm
                tripType={tripType}
                truckDriverAssignments={truckDriverAssignments}
                clientsObject={clientsObject}
                tripToEdit={tripToEdit}
              />
            </Modal.Window>

            <Modal.Window name="delete-trip">
              <ConfirmDelete
                resourceName="trip"
                onConfirm={() => deleteTrip(tripId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TripRow;
