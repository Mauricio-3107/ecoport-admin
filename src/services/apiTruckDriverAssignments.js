import supabase from "./supabase";

export async function getTruckDriverAssignments() {
  const { data, error } = await supabase
    .from("truckDriverAssignments")
    .select(
      `
      id, 
      drivers (id, fullName, licenseNumber, phoneNumber),
      trucks (id, licensePlate)
    `
    )
    .is("assignmentEndDate", null);

  if (error) {
    console.error(error);
    throw new Error("TDA could not be loaded");
  }

  return data;
}

export async function createTruckDriverAssignments(newTda) {
  const { data, error } = await supabase
    .from("truckDriverAssignments")
    .insert([{ ...newTda }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Asignación no pudo ser creada");
  }
  return data;
}

export async function unassignTruckDriver(newEndDate, id) {
  const { data, error } = await supabase
    .from("truckDriverAssignments")
    .update({ ...newEndDate })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unassignment could not be done");
  }

  return data;
}
