import supabase from "./supabase";

export async function getTripCosts() {
  const { data, error } = await supabase
    .from("tripCosts")
    .select(
      `id, agent, expenses, extraFuel, totalCost, trucks!inner(id, licensePlate, image, isActive)`
    )
    .eq("trucks.isActive", true);

  if (error) {
    console.error(error);
    throw new Error("Trip costs could not be loaded");
  }

  return data;
}

export async function editTripCosts(tripCost, id) {
  const { data, error } = await supabase
    .from("tripCosts")
    .update({ ...tripCost })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Trip cost no pudo ser editado");
  }

  return data;
}
