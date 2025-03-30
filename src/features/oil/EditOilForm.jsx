import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditOil } from "./useEditOil";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function EditOilForm({ oilToEdit, licensePlate, onCloseModal }) {
  const { isEditing, editOil } = useEditOil();
  const { id: editId, ...editValues } = oilToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
        }
      : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const nextKm = Number(data?.lastKm) + 20000;
    console.log({ ...data, nextKm });
    editOil(
      { editOil: { ...data, nextKm }, id: editId },
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
        <FormRow label="Nombre aceite" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isEditing}
            {...register("name", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        <FormRow label="Kilometraje cambio" error={errors?.lastKm?.message}>
          <Input
            type="number"
            disabled={isEditing}
            id="lastKm"
            {...register("lastKm", {
              required: "This field is required",
              min: { value: 0, message: "km cambio must be a positive value" },
            })}
          />
        </FormRow>

        <FormRow label="Fecha y hora cambio" error={errors?.oilDate?.message}>
          <Input
            type="datetime-local"
            disabled={isEditing}
            id="oilDate"
            {...register("oilDate", {
              required: "This field is required",
              validate: (value) =>
                (value && value !== "") || "Please select a date",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancelar
          </Button>
          <Button disabled={isEditing}>Log Maintenance</Button>
        </FormRow>
      </Form>
    </Container>
  );
}

export default EditOilForm;
