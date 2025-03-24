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



export async function logFuel(newLogFuel, id, licensePlate) {
  // 1. Get the latest mileage data for this truck
  const { error: mileageError } = await supabase
    .from("trucksMileageRuntime")
    .select("milesToday")
    .eq("licensePlate", licensePlate)
    .single();

  if (mileageError) {
    console.error(mileageError);
    throw new Error("Error fetching latest mileage data");
  }

  const { data, error } = await supabase
    .from("fuelConsumption")
    .update({ ...newLogFuel })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Combustible no pudo ser registrado");
  }

  return data;
}
