import supabase from "./supabase";

export async function getFuelConsumption() {
  const { data, error } = await supabase
    .from("fuelConsumption")
    .select(
      `id, litersFueled, odometerKm, fuelEfficiency, fuelDate, location, trucks!inner(id, licensePlate, image, isActive)`
    )
    .eq("trucks.isActive", true);

  if (error) {
    console.error(error);
    throw new Error("Fuel consumption could not be loaded");
  }

  return data;
}

export async function getFuelTruckId(truckId) {
  // First, check if the truck exists in the database
  const { data: truck, error: truckError } = await supabase
    .from("trucks")
    .select("id")
    .eq("id", truckId)
    .single();

  if (truckError || !truck) throw new Error("Truck not found");

  // If the truck exists, fetch fuel consumption history
  const { data, error } = await supabase
    .from("fuelConsumptionHistory")
    .select("fuelEfficiency, fuelDate, trucks (licensePlate)")
    .eq("truckId", truckId)
    .order("fuelDate", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

