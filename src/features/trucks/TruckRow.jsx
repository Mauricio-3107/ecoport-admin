import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useDeleteTruck } from "./useDeleteTruck";
import CreateTruckForm from "./CreateTruckForm";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useCreateTruck } from "./useCreateTruck";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const LicensePlate = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const OperationsCardInsurance = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function TruckRow({ truck }) {
  const { isDeleting, deleteTruck } = useDeleteTruck();
  const { createTruck, isCreating } = useCreateTruck();

  const {
    id: truckId,
    licensePlate,
    image,
    capacity,
    year,
    hp,
    traction,
    operationsCard,
    insurance,
  } = truck;

  function handleDuplicate() {
    createTruck({
      licensePlate: `Copy of ${licensePlate}`,
      image,
      capacity,
      year,
      hp,
      traction,
      operationsCard,
      insurance,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={licensePlate} />
      <LicensePlate>{licensePlate}</LicensePlate>
      <OperationsCardInsurance>
        {operationsCard.split("T")[0]}
      </OperationsCardInsurance>
      <OperationsCardInsurance>
        {insurance.split("T")[0]}
      </OperationsCardInsurance>
      <Capacity>{capacity}</Capacity>
      <div>{traction}</div>
      <div>{year}</div>
      <div>{hp}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={truckId} />

            <Menus.List id={truckId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-truck-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-truck-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-truck-form">
              <CreateTruckForm truckToEdit={truck} />
            </Modal.Window>

            <Modal.Window name="delete-truck-form">
              <ConfirmDelete
                onConfirm={() => deleteTruck(truckId)}
                disabled={isDeleting}
                resourceName="truck"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TruckRow;
