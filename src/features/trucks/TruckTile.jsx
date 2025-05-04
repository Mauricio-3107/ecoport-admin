import styled from "styled-components";
import Heading from "../../ui/Heading";
import { format } from "date-fns";

const Card = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 12;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Field = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);

  & span {
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-grey-500);
    margin-right: 0.4rem;
  }
`;

export default function TruckTile({ truck }) {
  // const { isDeleting, deleteTruck } = useDeleteTruck();
  return (
    <Card>
      <Img src={truck.image} alt={truck.licensePlate} />
      <Header>
        <Heading as="h3">{truck.licensePlate}</Heading>
        {/* <Modal>
          <Menus.Menu>
            <Menus.Toggle id={truck.id} />
            <Menus.List id={truck.id}>
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
                onConfirm={() => deleteTruck(truck.id)}
                disabled={isDeleting}
                resourceName="camión"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal> */}
      </Header>

      <Field>
        <span>HP:</span>
        {truck.hp}
      </Field>

      <Field>
        <span>Año:</span>
        {truck.year}
      </Field>

      <Field>
        <span>Tara:</span>
        {truck.tare} kg
      </Field>

      <Field>
        <span>Tracción:</span>
        {truck.traction}
      </Field>

      <Field>
        <span>Seguro:</span>
        {format(new Date(truck.insurance), "dd/MM/yyyy")}
      </Field>

      <Field>
        <span>Tarjeta Operaciones:</span>
        {format(new Date(truck.operationsCard), "dd/MM/yyyy")}
      </Field>
    </Card>
  );
}
