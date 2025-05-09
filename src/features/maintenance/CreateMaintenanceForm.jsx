import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import MySelect from "../../ui/MySelect";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Textarea from "../../ui/Textarea";
import { useCreateMaintenance } from "./useCreateMaintenance";
import { useEditMaintenance } from "./useEditMaintenance";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow-y: auto;
`;

function CreateMaintenanceForm({
  truckId,
  licensePlate,
  onCloseModal,
  maintenanceToEdit = {},
}) {
  const { isCreating, createMaintenance } = useCreateMaintenance();
  const { isEditing, editMaintenance } = useEditMaintenance();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = maintenanceToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          date: editValues.date.split("T")[0],
        }
      : {},
  });

  const { errors } = formState;
  // Watch the selected maintenance kind
  const maintenanceKind = watch("maintenanceKind");

  // Dynamic label for the "name" input
  const nameLabel =
    maintenanceKind === "repair" ? "Reparación de" : "Nombre del repuesto";

  function onSubmit(data) {
    const maintenanceData = {
      truckId,
      ...data,
    };
    if (isEditSession)
      editMaintenance(
        { newMaintenanceData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createMaintenance(maintenanceData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  return (
    <Container>
      {!isEditSession ? (
        <Heading as="h2">Placa: {licensePlate}</Heading>
      ) : (
        <Heading as="h2">Editar</Heading>
      )}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow
          label="Tipo de mantenimiento"
          error={errors?.maintenanceKind?.message}
        >
          <MySelect
            id="maintenanceKind"
            label="Tipo de mantenimiento"
            disabled={isWorking}
            options={[
              { value: "repair", label: "Reparación" },
              { value: "spare", label: "Compra repuesto" },
            ]}
            {...register("maintenanceKind", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        {maintenanceKind && (
          <FormRow label={nameLabel} error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
            />
          </FormRow>
        )}

        <FormRow label="Costo (Bs)" error={errors?.cost?.message}>
          <Input
            type="number"
            disabled={isWorking}
            id="cost"
            {...register("cost", {
              required: "Este campo es obligatorio",
              min: { value: 0, message: "Costo must be a positive value" },
            })}
          />
        </FormRow>

        <FormRow label="Fecha" error={errors?.date?.message}>
          <Input
            type="date"
            disabled={isWorking}
            id="date"
            {...register("date", {
              required: "Este campo es obligatorio",
              validate: (value) =>
                (value && value !== "") || "Please select a date",
            })}
          />
        </FormRow>

        <FormRow label="Notas" error={errors?.notes?.message}>
          <Textarea
            type="text"
            disabled={isWorking}
            id="notes"
            defaultValue=""
            {...register("notes")}
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
            {isEditSession ? "Actualizar" : "Registrar"}
          </Button>
        </FormRow>
      </Form>
    </Container>
  );
}

export default CreateMaintenanceForm;
