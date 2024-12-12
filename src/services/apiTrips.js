import supabase from "./supabase";

export async function getTrips() {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) {
    console.error(error);
    throw new Error("Trips could not be loaded");
  }

  return data;
}

export async function createEditTrip(newTrip, id) {
  // 1. Create/Edit Trip
  let query = supabase.from("trips");

  // a) create
  if (!id) query = query.insert([{ ...newTrip }]);

  // b) edit
  if (id) query = query.update({ ...newTrip }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Viaje no pudo ser creado");
  }

  return data;
}
