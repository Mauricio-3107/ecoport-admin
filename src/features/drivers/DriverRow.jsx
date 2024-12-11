import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import {
  HiArchiveBoxArrowDown,
  HiArchiveBoxXMark,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateDriverForm from "./CreateDriverForm";
import { useCreateDriver } from "./useCreateDriver";
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

const PhoneNumber = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const LicensePlate = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function DriverRow({ driver, truckDriverAssignments, availableTrucks }) {
  const { isCreating, createDriver } = useCreateDriver();
  const { isDeleting, deleteDriver } = useDeleteDriver();
  const { isUnassigning, unassignTruck } = useUnassignTruckDriver();

  const { id: driverId, fullName, licenseNumber, phoneNumber } = driver;

  const itHasTruck = truckDriverAssignments.find(
    (assignment) => assignment.drivers.id === driverId
  );

  const licensePlate = itHasTruck ? itHasTruck.trucks.licensePlate : null;
  const tdaId = itHasTruck?.id;

  function handleDuplicate() {
    createDriver({
      fullName: `copy of ${fullName}`,
      licenseNumber,
      phoneNumber,
    });
  }

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
      <PhoneNumber>{phoneNumber}</PhoneNumber>
      <LicensePlate>{licensePlate || <span>&mdash;</span>}</LicensePlate>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={driverId} />

            <Menus.List id={driverId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>
              <Modal.Open opens="edit-driver-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              {!itHasTruck && (
                <Modal.Open opens="assign-truck-form">
                  <Menus.Button icon={<HiArchiveBoxArrowDown />}>
                    Assign truck
                  </Menus.Button>
                </Modal.Open>
              )}

              {itHasTruck && (
                <Modal.Open opens="unassign-truck-form">
                  <Menus.Button icon={<HiArchiveBoxXMark />}>
                    Unassign truck
                  </Menus.Button>
                </Modal.Open>
              )}
              <Modal.Open opens="delete-driver-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* Windows */}
            <Modal.Window name="edit-driver-form">
              <CreateDriverForm driverToEdit={driver} />
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
                      id: tdaId,
                    })
                  }
                  disabled={isUnassigning}
                  resourceName="assignment"
                />
              </Modal.Window>
            )}

            <Modal.Window name="delete-driver-form">
              <ConfirmDelete
                onConfirm={() => deleteDriver(driverId)}
                disabled={isDeleting}
                resourceName="driver"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default DriverRow;
