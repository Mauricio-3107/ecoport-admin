import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";
import CreateEditOilForm from "./CreateEditOilForm";
import { IoLogInSharp } from "react-icons/io5";
import { formatDateBolivia } from "../../utils/helpers";

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

const NextKm = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

function OilRow({ oilTruck }) {
  const {
    name,
    lastKm,
    nextKm,
    odometerKm,
    oilDate,
    id: oilId,
    trucks: { licensePlate, image, id: truckId },
  } = oilTruck;
  const oilToEdit = { id: oilId, name, lastKm, nextKm, odometerKm, oilDate };

  return (
    <Table.Row role="row">
      <Img src={image} alt={truckId} />
      <LicensePlate>{licensePlate}</LicensePlate>
      <div>{name ? name : <span>&mdash;</span>}</div>
      <div>{oilDate ? formatDateBolivia(oilDate) : <span>&mdash;</span>}</div>
      <div>{lastKm ? lastKm : <span>&mdash;</span>}</div>
      <NextKm>{nextKm ? nextKm : <span>&mdash;</span>}</NextKm>
      <div>{odometerKm != null ? odometerKm : <span>&mdash;</span>}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={oilId} />
            <Menus.List id={oilId}>
              <Modal.Open opens="log-oil">
                <Menus.Button icon={<IoLogInSharp />}>
                  Registrar nuevo cambio
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="edit-oil">
                <Menus.Button icon={<HiPencil />}>
                  Editar actual cambio
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="log-oil">
              <CreateEditOilForm
                licensePlate={licensePlate}
                truckId={truckId}
              />
            </Modal.Window>
            <Modal.Window name="edit-oil">
              <CreateEditOilForm
                oilToEdit={oilToEdit}
                licensePlate={licensePlate}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default OilRow;
