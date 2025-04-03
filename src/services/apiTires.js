import supabase from "./supabase";

export async function createEditTires(newTire, id) {
  // 1. Create/Edit Truck
  let query = supabase.from("tires");

  // a) create
  if (!id) query = query.insert([{ ...newTire }]);

  // b) edit
  if (id) query = query.update({ ...newTire }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Goma no pudo ser creada o editada");
  }

  return data;
}

export async function getTiresTruckId(truckId) {
  const { data, error } = await supabase
    .from("tires")
    .select("*")
    .eq("truckId", truckId)

  if (error) {
    console.error(error);
    throw new Error(`Tires not found for truckId ${truckId}`);
  }

  return data;
}
