import supabase from "./supabase";

export async function getTotalMileageTrucks() {
  const { data, error } = await supabase
    .from("totalMileageTrucks")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Trucks total mileage could not be loaded");
  }
  return data;
}
