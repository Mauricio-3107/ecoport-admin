import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useCreateTruck } from "./useCreateTruck";
import Form from "../../ui/Form";
import { useEditTruck } from "./useEditTruck";

function CreateTruckForm({ truckToEdit = {}, onCloseModal }) {
  const { isCreating, createTruck } = useCreateTruck();
  const { isEditing, editTruck } = useEditTruck();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = truckToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          operationsCard: editValues.operationsCard.split("T")[0],
          insurance: editValues.insurance.split("T")[0],
        }
      : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image[0] || truckToEdit.image || null;

    if (isEditSession)
      editTruck(
        { newTruckData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createTruck(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Placa" error={errors?.licensePlate?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="licensePlate"
          {...register("licensePlate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Año" error={errors?.year?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="year"
          {...register("year", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Caballos de Fuerza" error={errors?.hp?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="hp"
          {...register("hp", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Tracción" error={errors?.traction?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="traction"
          {...register("traction", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Tara" error={errors?.tare?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="tare"
          {...register("tare", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Tarjeta de Operaciones"
        error={errors?.operationsCard?.message}
      >
        <Input
          type="date"
          disabled={isWorking}
          id="operationsCard"
          {...register("operationsCard", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Seguro" error={errors?.insurance?.message}>
        <Input
          type="date"
          disabled={isWorking}
          id="insurance"
          {...register("insurance", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Foto del camión" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
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
          {isEditSession ? "Edit truck" : "Create new truck"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTruckForm;
