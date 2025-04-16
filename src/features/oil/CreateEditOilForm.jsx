import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditOil } from "./useEditOil";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateOil } from "./useCreateOil";
import {
  FILTER_COST,
  LABOR_COST,
  NEXT_KM,
  OIL_COST,
} from "../../utils/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function CreateEditOilForm({
  oilToEdit = {},
  licensePlate,
  onCloseModal,
  truckId,
}) {
  const { isCreating, createOil } = useCreateOil();
  const { isEditing, editOil } = useEditOil();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = oilToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const nextKm = Number(data?.lastKm) + NEXT_KM;
    console.log({ ...data, nextKm, truckId });
    if (isEditSession) {
      editOil(
        { editOil: { ...data, nextKm }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createOil(
        { ...data, truckId, nextKm, odometerKm: 0 },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
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
            disabled={isWorking}
            {...register("name", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        <FormRow label="Kilometraje cambio" error={errors?.lastKm?.message}>
          <Input
            type="number"
            disabled={isWorking}
            id="lastKm"
            {...register("lastKm", {
              required: "This field is required",
              min: { value: 0, message: "km cambio must be a positive value" },
            })}
          />
        </FormRow>

        <FormRow label="Costo aceite (Bs)" error={errors?.oilCost?.message}>
          <Input
            id="oilCost"
            type="number"
            disabled={isWorking}
            defaultValue={OIL_COST}
            {...register("oilCost", {
              required: "This field is required",
              min: { value: 0, message: "Oil cost must be a positive value" },
            })}
          />
        </FormRow>

        <FormRow label="Costo filtro (Bs)" error={errors?.filterCost?.message}>
          <Input
            id="filterCost"
            type="number"
            disabled={isWorking}
            defaultValue={FILTER_COST}
            {...register("filterCost", {
              required: "This field is required",
              min: {
                value: 0,
                message: "Filter cost must be a positive value",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Costo mano de obra (Bs)"
          error={errors?.laborCost?.message}
        >
          <Input
            id="laborCost"
            type="number"
            disabled={isWorking}
            defaultValue={LABOR_COST}
            {...register("laborCost", {
              required: "This field is required",
              min: { value: 0, message: "Labor cost must be a positive value" },
            })}
          />
        </FormRow>

        <FormRow label="Fecha y hora cambio" error={errors?.oilDate?.message}>
          <Input
            type="datetime-local"
            disabled={isWorking}
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
          <Button disabled={isWorking}>
            {isEditSession
              ? "Editar cambio de aceite"
              : "Registrar cambio de aceite"}
          </Button>
        </FormRow>
      </Form>
    </Container>
  );
}

export default CreateEditOilForm;
