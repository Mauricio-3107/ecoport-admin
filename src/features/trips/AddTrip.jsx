import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateTripForm from "./CreateTripForm";

function AddTrip({ tripType, truckDriverAssignments, clientsObject }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="trip-form">
          <Button>{`Add a new trip ${tripType}`}</Button>
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
