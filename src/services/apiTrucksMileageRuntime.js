import supabase from "./supabase";

export async function getTrucksMileageRuntime() {
  const { data, error } = await supabase
    .from("trucksMileageRuntime")
    .select("*")

  if (error) {
    console.error(error);
    throw new Error("Trucks mileage runtime could not be loaded");
  }

  return data;
}
