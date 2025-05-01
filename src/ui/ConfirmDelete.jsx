import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Eliminar {resourceName}</Heading>
      <p>
        ¿Estás seguro de que deseas eliminar este {resourceName}{" "}
        permanentemente? Esta acción no se puede deshacer.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancelar
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Eliminar
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
