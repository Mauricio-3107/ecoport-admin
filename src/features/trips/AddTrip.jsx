import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateTripForm from "./CreateTripForm";

function AddTrip({ tripType, truckDriverAssignments, clientsObject }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="trip-form">
          <Button>{`Añadir viaje ${tripType}`}</Button>
        </Modal.Open>
        <Modal.Window name="trip-form">
          <CreateTripForm
            tripType={tripType}
            truckDriverAssignments={truckDriverAssignments}
            clientsObject={clientsObject}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTrip;
