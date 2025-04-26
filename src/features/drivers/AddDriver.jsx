import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateDriverForm from "./CreateDriverForm";

function AddDriver() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="driver-form">
          <Button>Añadir nuevo conductor</Button>
        </Modal.Open>
        <Modal.Window name="driver-form">
          <CreateDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDriver;
