import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateClientForm from "./CreateClientForm";

function AddClient({ type }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="client-form">
          <Button>{`Añadir nuevo cliente ${type}`}</Button>
        </Modal.Open>
        <Modal.Window name="client-form">
          <CreateClientForm type={type} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddClient;
