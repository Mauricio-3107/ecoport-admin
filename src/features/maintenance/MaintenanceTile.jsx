import styled from "styled-components";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateMaintenanceForm from "./CreateMaintenanceForm";
import { useDeleteMaintenance } from "./useDeleteMaintenance";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Value = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;

function MaintenanceTile({ maintenance }) {
  const { isDeleting, deleteMaintenance } = useDeleteMaintenance();

  const statusToTagName = {
    repair: "blue",
    spare: "green",
  };

  return (
    <Card>
      <MenuContainer>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={maintenance.id} />

            <Menus.List id={maintenance.id}>
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
                onConfirm={() => deleteMaintenance(maintenance.id)}
                disabled={isDeleting}
                resourceName="mantenimiento"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </MenuContainer>

      <div>
        <Label>Tipo:</Label>{" "}
        <Tag type={statusToTagName[maintenance.maintenanceKind]}>
          {maintenance.maintenanceKind === "repair"
            ? "Reparación"
            : "Compra repuesto"}
        </Tag>
      </div>
      <div>
        <Label>Nombre:</Label> <Value>{maintenance.name}</Value>
      </div>
      <div>
        <Label>Costo (Bs):</Label> <Value>{maintenance.cost}</Value>
      </div>
      <div>
        <Label>Fecha:</Label> <Value>{maintenance.date.split("T")[0]}</Value>
      </div>
      <div>
        <Label>Notas:</Label> <Value>{maintenance.notes || "-"}</Value>
      </div>
    </Card>
  );
}

export default MaintenanceTile;
