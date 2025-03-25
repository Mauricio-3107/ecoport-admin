import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useLogFuel } from "./useLogFuel";

function LogFuelForm({ id, licensePlate, onCloseModal }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isLoggingFuel, logFuel } = useLogFuel();

  function onSubmit(data) {
    console.log({ ...data, odometerKm: 0, licensePlate, id });
    logFuel(
      { newLogFuel: { ...data, odometerKm: 0 }, id, licensePlate },
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
      {licensePlate}
      <FormRow label="Litros" error={errors?.litersFueled?.message}>
        <Input
          type="number"
          disabled={isLoggingFuel}
          id="litersFueled"
          {...register("litersFueled", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Lugar surtidor" error={errors?.location?.message}>
        <Input
          type="text"
          disabled={isLoggingFuel}
          id="location"
          {...register("location", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Fecha" error={errors?.fuelDate?.message}>
        <Input
          type="date"
          disabled={isLoggingFuel}
          id="fuelDate"
          {...register("fuelDate", {
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
        <Button disabled={isLoggingFuel}>Log fuel</Button>
      </FormRow>
    </Form>
  );
}

export default LogFuelForm;
