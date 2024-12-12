import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateClientForm from "./CreateClientForm";

function AddClient() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="client-form">
            <Button>Add new client</Button>
          </Modal.Open>
          <Modal.Window name="client-form">
            <CreateClientForm />
          </Modal.Window>
        </Modal>
      </div>
    );
}

export default AddClient
