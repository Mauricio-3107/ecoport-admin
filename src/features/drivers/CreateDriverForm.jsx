import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateDriver } from "./useCreateDriver";
import { useEditDriver } from "./useEditDriver";

function CreateDriverForm({ driverToEdit = {}, onCloseModal }) {
  const { isCreating, createDriver } = useCreateDriver();
  const { isEditing, editDriver } = useEditDriver();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = driverToEdit;
  const isEditSession = Boolean(editId);

  const { formState, register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    if (isEditSession)
      editDriver(
        { newDriverData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createDriver(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nombre completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="fullName"
          {...register("fullName", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>
      <FormRow
        label="Número de licencia"
        error={errors?.licenseNumber?.message}
      >
        <Input
          type="text"
          disabled={isWorking}
          id="licenseNumber"
          {...register("licenseNumber", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>
      <FormRow label="Celular" error={errors?.phoneNumber?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>
      <FormRow label="Sueldo (Bs)" error={errors?.salary?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="salary"
          {...register("salary", {
            required: "Este campo es obligatorio",
            min: {
              value: 1,
              message: "Salario debe ser un número positivo",
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
          {isEditSession ? "Editar conductor" : "Crear nuevo conductor"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDriverForm;
