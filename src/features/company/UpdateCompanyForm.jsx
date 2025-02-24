import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useCompany } from "./useCompany";
import { useUpdateCompany } from "./useUpdateCompany";
import { getStatusDate } from "../../utils/helpers";

function splitDate(date) {
  return date.split("T")[0];
}

function UpdateCompanyForm() {
  const mainCompany = "ECOPORT SRL";
  const extraCompany = "SIR SRL";

  const {
    isLoading,
    company: {
      ocassionalDocument,
      ocassionalDocumentExtra,
      expirationToken,
      expirationTokenExtra,
      seprec,
      seprecExtra,
    } = {},
  } = useCompany();

  const { isUpdating, updateCompany } = useUpdateCompany();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(e.target.value);
    if (!value) return;
    updateCompany({ [field]: value });
  }

  return (
    <Form>
      <FormRow
        label={`Seprec ${extraCompany}`}
        icon={
          getStatusDate(seprecExtra) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(seprecExtra)}
      >
        <Input
          type="date"
          id="seprecExtra"
          disabled={isUpdating}
          defaultValue={splitDate(seprecExtra)}
          onBlur={(e) => handleUpdate(e, "seprecExtra")}
        />
      </FormRow>

      <FormRow
        label={`Seprec ${mainCompany}`}
        icon={
          getStatusDate(seprec) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(seprec)}
      >
        <Input
          type="date"
          id="seprec"
          disabled={isUpdating}
          defaultValue={splitDate(seprec)}
          onBlur={(e) => handleUpdate(e, "seprec")}
        />
      </FormRow>

      <FormRow
        label={`Permiso Ocasional ${extraCompany}`}
        icon={
          getStatusDate(ocassionalDocumentExtra) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(ocassionalDocumentExtra)}
      >
        <Input
          type="date"
          id="ocassionalDocumentExtra"
          disabled={isUpdating}
          defaultValue={splitDate(ocassionalDocumentExtra)}
          onBlur={(e) => handleUpdate(e, "ocassionalDocumentExtra")}
        />
      </FormRow>

      <FormRow
        label={`Permiso Ocasional ${mainCompany}`}
        icon={
          getStatusDate(ocassionalDocument) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(ocassionalDocument)}
      >
        <Input
          type="date"
          id="ocassionalDocument"
          disabled={isUpdating}
          defaultValue={splitDate(ocassionalDocument)}
          onBlur={(e) => handleUpdate(e, "ocassionalDocument")}
        />
      </FormRow>

      <FormRow
        label={`Expiración token  ${extraCompany}`}
        icon={
          getStatusDate(expirationTokenExtra) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(expirationTokenExtra)}
      >
        <Input
          type="date"
          id="expirationTokenExtra"
          disabled={isUpdating}
          defaultValue={splitDate(expirationTokenExtra)}
          onBlur={(e) => handleUpdate(e, "expirationTokenExtra")}
        />
      </FormRow>

      <FormRow
        label={`Expiración token  ${mainCompany}`}
        icon={
          getStatusDate(expirationToken) === "green" ? (
            <HiOutlineCheckCircle />
          ) : (
            <HiOutlineExclamationTriangle />
          )
        }
        color={getStatusDate(expirationToken)}
      >
        <Input
          type="date"
          id="expirationToken"
          disabled={isUpdating}
          defaultValue={splitDate(expirationToken)}
          onBlur={(e) => handleUpdate(e, "expirationToken")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateCompanyForm;
