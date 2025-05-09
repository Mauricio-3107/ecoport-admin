import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useDeleteTruck } from "./useDeleteTruck";
import CreateTruckForm from "./CreateTruckForm";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { formatDateBolivia, getStatusDate } from "../../utils/helpers";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2.5;
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

const Tare = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const OperationsCardInsurance = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: ${({ status }) =>
    status === "green" ? "var(--color-green-700)" : "var(--color-red-700)"};
`;

function TruckRow({ truck }) {
  const { isDeleting, deleteTruck } = useDeleteTruck();

  const {
    id: truckId,
    licensePlate,
    image,
    tare,
    year,
    hp,
    traction,
    operationsCard,
    insurance,
  } = truck;

  return (
    <Table.Row role="row">
      <Img src={image} alt={licensePlate} />
      <LicensePlate>{licensePlate}</LicensePlate>
      <OperationsCardInsurance status={getStatusDate(operationsCard)}>
        {formatDateBolivia(operationsCard)}
      </OperationsCardInsurance>
      <OperationsCardInsurance status={getStatusDate(insurance)}>
        {formatDateBolivia(insurance)}
      </OperationsCardInsurance>
      <Tare>{tare}</Tare>
      <div>{traction}</div>
      <div>{year}</div>
      <div>{hp}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={truckId} />

            <Menus.List id={truckId}>
              <Modal.Open opens="edit-truck-form">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-truck-form">
                <Menus.Button icon={<HiTrash />}>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-truck-form">
              <CreateTruckForm truckToEdit={truck} />
            </Modal.Window>

            <Modal.Window name="delete-truck-form">
              <ConfirmDelete
                onConfirm={() => deleteTruck(truckId)}
                disabled={isDeleting}
                resourceName="camión"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TruckRow;
