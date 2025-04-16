import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import {
  HiArchiveBoxArrowDown,
  HiArchiveBoxXMark,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateDriverForm from "./CreateDriverForm";
import { useDeleteDriver } from "./useDeleteDriver";
import AssignTruckForm from "../truckDriverAssignments/AssignTruckForm";
import { useUnassignTruckDriver } from "../truckDriverAssignments/useUnassignTruckDriver";
import { add } from "date-fns";

const FullName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const LicenseNumber = styled.div`
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

const LicensePlate = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function DriverRow({ driver, availableTrucks }) {
  const { isDeleting, deleteDriver } = useDeleteDriver();
  const { isUnassigning, unassignTruck } = useUnassignTruckDriver();

  const {
    id: driverId,
    fullName,
    licenseNumber,
    phoneNumber,
    licensePlate,
    assignmentId,
    salary,
  } = driver;

  const driverToEdit = {
    id: driverId,
    fullName,
    licenseNumber,
    phoneNumber,
    salary,
  };

  const itHasTruck = Boolean(licensePlate && assignmentId);
  console.log(itHasTruck, fullName);

  function fromToday(numDays, withTime = false) {
    const date = add(new Date(), { days: numDays });
    if (!withTime) date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().slice(0, -1);
  }

  return (
    <Table.Row role="row">
      <div></div>
      <FullName>{fullName}</FullName>
      <LicenseNumber>{licenseNumber}</LicenseNumber>
      <PhoneNumberWhatssapLink
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {phoneNumber}
      </PhoneNumberWhatssapLink>

      <LicensePlate>{licensePlate || <span>&mdash;</span>}</LicensePlate>
      <div>{salary || <span>&mdash;</span>}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={driverId} />

            <Menus.List id={driverId}>
              <Modal.Open opens="edit-driver-form">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>

              {!itHasTruck && (
                <Modal.Open opens="assign-truck-form">
                  <Menus.Button icon={<HiArchiveBoxArrowDown />}>
                    Asignar camión
                  </Menus.Button>
                </Modal.Open>
              )}

              {itHasTruck && (
                <Modal.Open opens="unassign-truck-form">
                  <Menus.Button icon={<HiArchiveBoxXMark />}>
                    Desasignar camión
                  </Menus.Button>
                </Modal.Open>
              )}
              <Modal.Open opens="delete-driver-form">
                <Menus.Button icon={<HiTrash />}>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* Windows */}
            <Modal.Window name="edit-driver-form">
              <CreateDriverForm driverToEdit={driverToEdit} />
            </Modal.Window>

            {!itHasTruck && (
              <Modal.Window name="assign-truck-form">
                <AssignTruckForm
                  driverId={driverId}
                  availableTrucks={availableTrucks}
                />
              </Modal.Window>
            )}

            {itHasTruck && (
              <Modal.Window name="unassign-truck-form">
                <ConfirmDelete
                  onConfirm={() =>
                    unassignTruck({
                      assignmentEndDate: { assignmentEndDate: fromToday(0) },
                      id: assignmentId,
                    })
                  }
                  disabled={isUnassigning}
                  resourceName="asignación"
                />
              </Modal.Window>
            )}

            <Modal.Window name="delete-driver-form">
              <ConfirmDelete
                onConfirm={() => deleteDriver(driverId)}
                disabled={isDeleting}
                resourceName="conductor"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default DriverRow;
