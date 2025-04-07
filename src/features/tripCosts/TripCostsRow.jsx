import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil } from "react-icons/hi2";
import EditCostTripForm from "./EditCostTripForm";

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

const TotalCost = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

function TripCostsRow({ tripCost }) {
  const {
    agent,
    expenses,
    extraFuel,
    totalCost,
    id: tripCostId,
    trucks: { licensePlate, image, id: truckId },
  } = tripCost;

  const tripCostToEdit = {
    id: tripCostId,
    agent,
    expenses,
    extraFuel,
  };

  return (
    <Table.Row role="row">
      <Img src={image} alt={truckId} />
      <LicensePlate>{licensePlate}</LicensePlate>
      <div>{agent ? agent : <span>&mdash;</span>}</div>
      <div>{expenses ? expenses : <span>&mdash;</span>}</div>
      <div>{extraFuel ? extraFuel : <span>&mdash;</span>}</div>
      <TotalCost>{totalCost ? totalCost : <span>&mdash;</span>}</TotalCost>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={tripCostId} />
            <Menus.List id={tripCostId}>
              <Modal.Open opens="edit-tripCost">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-tripCost">
              <EditCostTripForm
                tripCostToEdit={tripCostToEdit}
                licensePlate={licensePlate}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TripCostsRow;
