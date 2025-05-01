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

  const { register, handleSubmit, formState, reset, watch } = useForm({
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
    const containerWeights = { 20: 2300, 40: 3700 };

    const totalCargoWeight =
      data.cargoType === "consolidado"
        ? Number(data.cargoWeight) + containerWeights[data.containerType]
        : Number(data.cargoWeight);

    const tripData = {
      ...data,
      cargoWeight: totalCargoWeight, // Use the calculated weight
      tripType,
    };

    if (isEditSession)
      editTrip(
        { newTripData: tripData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createTrip(tripData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
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
            required: "Este campo es obligatorio",
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
            required: "Este campo es obligatorio",
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
            required: "Este campo es obligatorio",
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
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Carga" error={errors?.cargoType?.message}>
        <MySelect
          id="cargoType"
          options={[
            { value: "consolidado", label: "Consolidado" },
            { value: "desconsolidado", label: "Desconsolidado" },
          ]}
          label="tipo de carga"
          type="white"
          {...register("cargoType", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Peso bruto (kg)" error={errors?.cargoWeight?.message}>
        <Input
          type="number"
          id="cargoWeight"
          {...register("cargoWeight", {
            required: "Este campo es obligatorio",
            min: { value: 0, message: "Debe ser positivo" },
          })}
        />
      </FormRow>

      {watch("cargoType") === "consolidado" && (
        <FormRow label="Container" error={errors?.containerType?.message}>
          <MySelect
            id="containerType"
            options={[
              { value: "20", label: "20'" },
              { value: "40", label: "40'" },
            ]}
            label="tipo de contenedor"
            type="white"
            {...register("containerType", {
              required: "Container type is required for Consolidado",
            })}
          />
        </FormRow>
      )}

      <FormRow label="Inicio viaje" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Flete (Bs)" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Este campo es obligatorio",
            min: {
              value: 0,
              message: "Flete debe ser positivo",
            },
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
        <Button disabled={isWorking}>
          {isEditSession ? "Editar viaje" : "Crear nuevo viaje"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTripForm;
