import supabase from "./supabase";

export async function getPickupMileageRuntime() {
  const { data, error } = await supabase
    .from("pickupMileageRuntime")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Pickup mileage runtime could not be loaded");
  }

  return data;
}
