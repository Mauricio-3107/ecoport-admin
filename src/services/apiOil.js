import supabase from "./supabase";

export async function getOil() {
  const { data, error } = await supabase
    .from("oil")
    .select(
      `id, lastKm, nextKm, odometerKm, name, date, trucks!inner(id, licensePlate, image, isActive)`
    )
    .eq("trucks.isActive", true);

  if (error) {
    console.error(error);
    throw new Error("Oil could not be loaded");
  }

  return data;
}

export async function editOil(newOil, id) {
  const { data, error } = await supabase
    .from("oil")
    .update({ ...newOil })
    .eq("id", id)
    .select()

  if (error) {
    console.error(error);
    throw new Error("Oil could not be edited");
  }

  return data;
}
