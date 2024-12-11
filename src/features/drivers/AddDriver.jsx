import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateDriverForm from "./CreateDriverForm";

function AddDriver() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="driver-form">
          <Button>Add a new driver</Button>
        </Modal.Open>
        <Modal.Window name="driver-form">
          <CreateDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDriver;
