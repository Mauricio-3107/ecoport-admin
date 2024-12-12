import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useCreateClient } from "./useCreateClient";
import { useEditClient } from "./useEditClient";

function CreateClientForm({ clientToEdit = {}, onCloseModal }) {
  const { isCreating, createClient } = useCreateClient();
  const { isEditing, editClient } = useEditClient();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = clientToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image[0] || clientToEdit.image || null;

    if (isEditSession)
      editClient(
        { newClientData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createClient(
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
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Contacto" error={errors?.contactName?.message}>
        <Input
          type="text"
          id="contactName"
          disabled={isWorking}
          {...register("contactName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Teléfono" error={errors?.phoneNumber?.message}>
        <Input
          type="text"
          id="phoneNumber"
          disabled={isWorking}
          {...register("phoneNumber", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Logo" error={errors?.image?.message}>
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
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit client" : "Create new client"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateClientForm;
