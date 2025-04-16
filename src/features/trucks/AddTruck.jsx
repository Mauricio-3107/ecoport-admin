import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateTruckForm from "./CreateTruckForm";

function AddTruck() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="truck-form">
          <Button>Añadir nuevo camión</Button>
        </Modal.Open>
        <Modal.Window name="truck-form">
          <CreateTruckForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTruck;
