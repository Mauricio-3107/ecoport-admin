import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useCreateTruckDriverAssignments } from "./useCreateTruckDriverAssignments";
import { useState } from "react";
import SelectTruck from "../../ui/SelectTruck";

function AssignTruckForm({ driverId, onCloseModal, availableTrucks }) {
  const { isCreating, createATruckDriverAssignments } =
    useCreateTruckDriverAssignments();

  // { licensePlate: "3147 FHD", id: 1 },
  let finalAvailabletrucks;
  if (availableTrucks.length === 0)
    finalAvailabletrucks = [
      {
        licensePlate: "No trucks to show",
        id: "",
      },
    ];
  else {
    finalAvailabletrucks = [
      {
        licensePlate: "Select a truck",
        id: "",
      },
      ...availableTrucks,
    ];
  }

  const [truckId, setTruckId] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setTruckId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!truckId) {
      setError("This field is required");
      return;
    }

    // truckId, driverID, assignmentStartDate, assignmentEndDate
    createATruckDriverAssignments(
      { truckId, driverId },
      {
        onSuccess: () => {
          setTruckId("");
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Placa" error={error}>
        <SelectTruck
          options={finalAvailabletrucks}
          onChange={handleChange}
          type="white"
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
        <Button disabled={isCreating}>Asignar camión</Button>
      </FormRow>
    </Form>
  );
}

export default AssignTruckForm;
