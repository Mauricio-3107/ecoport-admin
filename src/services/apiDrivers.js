import supabase from "./supabase";

// const { data, error } = await supabase.from("countries").select(`
//   id,
//   name,
//   cities ( id, name )
// `);

export async function getDrivers() {
  const { data, error } = await supabase.from("drivers").select("*");
  if (error) {
    console.error(error);
    throw new Error("Trucks could not be loaded");
  }

  return data;
}

export async function createEditDriver(newDriver, id) {
  // 1. Create/Edit Truck
  let query = supabase.from("drivers");

  // a) create
  if (!id) query = query.insert([{ ...newDriver }]);

  // b) edit
  if (id) query = query.update({ ...newDriver }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Conductor no pudo ser creado");
  }

  return data;
}

export async function deleteDriver(id) {
  const { data, error } = await supabase.from("drivers").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Driver could not be deleted");
  }

  return data;
}
