import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteMaintenance } from "./useDeleteMaintenance";
import CreateMaintenanceForm from "./CreateMaintenanceForm";
import { formatDateBolivia } from "../../utils/helpers";

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Cost = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

//

function MaintenanceRow({ maintenance }) {
  const { isDeleting, deleteMaintenance } = useDeleteMaintenance();
  const {
    maintenanceKind,
    name,
    date,
    cost,
    notes,
    id: maintenanceId,
  } = maintenance;
  const statusToTagName = {
    repair: "blue",
    spare: "green",
  };
  return (
    <Table.Row role="row">
      <Tag type={statusToTagName[maintenanceKind]}>
        {maintenanceKind === "repair" ? "Reparación" : "Compra repuesto"}
      </Tag>
      <Name>{name}</Name>
      <Cost>{cost}</Cost>
      <div>{formatDateBolivia(date)}</div>
      <div>{notes || "-"}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={maintenanceId} />

            <Menus.List id={maintenanceId}>
              <Modal.Open opens="edit-maintenance-form">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-maintenance-form">
                <Menus.Button icon={<HiTrash />}>Eliminar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-maintenance-form">
              <CreateMaintenanceForm maintenanceToEdit={maintenance} />
            </Modal.Window>

            <Modal.Window name="delete-maintenance-form">
              <ConfirmDelete
                // invalidate the query here
                onConfirm={() => deleteMaintenance(maintenanceId)}
                disabled={isDeleting}
                resourceName="mantenimiento"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default MaintenanceRow;
