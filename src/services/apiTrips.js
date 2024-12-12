import supabase from "./supabase";

export async function getTrips() {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) {
    console.error(error);
    throw new Error("Trips could not be loaded");
  }

  return data;
}
