import { useForm } from "react-hook-form";
import { useEditTripCost } from "./useEditTripCost";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function EditCostTripForm({ tripCostToEdit = {}, licensePlate, onCloseModal }) {
  const { isEditing, editTripCost } = useEditTripCost();
  const { id: editId, ...editValues } = tripCostToEdit;
  const isEditSession = Boolean(editId);
  const { formState, register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    editTripCost(
      { newTripCost: data, id: editId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Container>
      <Heading as="h2">Placa: {licensePlate}</Heading>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Representante (Bs)" error={errors?.agent?.message}>
          <Input
            type="number"
            disabled={isEditing}
            id="agent"
            {...register("agent", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "Agent must be a positive value" },
              valueAsNumber: true,
            })}
          />
        </FormRow>
        <FormRow label="Gastos varios (Bs)" error={errors?.expenses?.message}>
          <Input
            type="number"
            disabled={isEditing}
            id="expenses"
            {...register("expenses", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "Expenses must be a positive value" },
              valueAsNumber: true,
            })}
          />
        </FormRow>
        <FormRow label="Extra diésel (Bs)" error={errors?.extraFuel?.message}>
          <Input
            type="number"
            disabled={isEditing}
            id="extraFuel"
            {...register("extraFuel", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "Extra fuel must be a positive value" },
              valueAsNumber: true,
            })}
          />
        </FormRow>
        <FormRow isButtonRow={true}>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancelar
          </Button>
          <Button disabled={isEditing}>Confirmar</Button>
        </FormRow>
      </Form>
    </Container>
  );
}

export default EditCostTripForm;
