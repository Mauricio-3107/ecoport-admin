import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import MySelect from "../../ui/MySelect";
import { useCreateTrip } from "./useCreateTrip";
import { useEditTrip } from "./useEditTrip";

function CreateTripForm({
  tripType,
  truckDriverAssignments,
  clientsObject,
  tripToEdit = {},
  onCloseModal,
}) {
  const { isCreating, createTrip } = useCreateTrip();
  const { isEditing, editTrip } = useEditTrip();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = tripToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const bolivianLocations = [
    { value: "Cochabamba", label: "Cochabamba" },
    { value: "Santa Cruz", label: "Santa Cruz" },
    { value: "La Paz", label: "La Paz" },
    { value: "Oruro", label: "Oruro" },
    { value: "Tarija", label: "Tarija" },
  ];

  const chileanLocations = [
    { value: "Arica", label: "Arica" },
    { value: "Iquique", label: "Iquique" },
  ];

  const currentTrucks = truckDriverAssignments.map((assignment) => ({
    value: assignment.id,
    label: `${assignment.licensePlate} (${assignment.fullName
      .split(" ")
      .slice(0, 2)
      .join(" ")})`,
  }));

  const currentClients = clientsObject
    .filter((client) => client.type === tripType)
    .map((client) => ({
      value: client.id,
      label: client.name,
    }));

  function onSubmit(data) {
    if (isEditSession)
      editTrip(
        { newTripData: { ...data, tripType: tripType }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createTrip(
        { ...data, tripType: tripType },
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
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Origen" error={errors?.origin?.message}>
        <MySelect
          id="origin"
          options={tripType === "export" ? bolivianLocations : chileanLocations}
          label="ciudad"
          type="white"
          {...register("origin", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Destination" error={errors?.destination?.message}>
        <MySelect
          id="destination"
          options={tripType === "import" ? bolivianLocations : chileanLocations}
          label="ciudad"
          type="white"
          {...register("destination", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Placa" error={errors?.assignmentId?.message}>
        <MySelect
          id="assignmentId"
          options={currentTrucks}
          label="unidad"
          type="white"
          {...register("assignmentId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Inicio viaje" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Flete" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Flete debe ser positivo",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cliente" error={errors?.client?.message}>
        <MySelect
          id="client"
          options={currentClients}
          label="cliente"
          type="white"
          {...register("client", {
            required: "This field is required",
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
          {isEditSession ? "Edit trip" : "Create new trip"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTripForm;
