import supabase from "./supabase";

export async function createEditMaintenance(newMaintenance, id) {
  // 1. Create/Edit maintenance
  let query = supabase.from("maintenance");

  // a) Create
  if (!id) query = query.insert([{ ...newMaintenance }]);

  // b) Edit
  if (id) query = query.update({ ...newMaintenance }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Maintenance could not be logged");
  }

  return data;
}

export async function getMaintenance(truckId) {
  const { data, error } = await supabase
    .from("maintenance")
    .select("*")
    .eq("truckId", truckId);

  if (error) {
    console.error(error);
    throw new Error("Maintenance not found");
  }

  return data;
}

export async function deleteMaintenance(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("maintenance")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Maintenance could not be deleted");
  }

  return data;
}

export async function getLicensePlate(truckId) {
  const { data, error } = await supabase
    .from("trucks")
    .select("licensePlate")
    .eq("id", truckId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("License plate maintenance not found");
  }

  return data;
}
