import supabase from "./supabase";

export async function getOil() {
  const { data, error } = await supabase
    .from("oil")
    .select(
      `id, lastKm, nextKm, odometerKm, name, oilDate, trucks!inner(id, licensePlate, image, isActive)`
    )
    .eq("trucks.isActive", true);

  if (error) {
    console.error(error);
    throw new Error("Oil could not be loaded");
  }

  return data;
}

export async function createEditOil(newOil, id) {
  // a) Create
  if (!id) {
    const { error: deleteError } = await supabase
      .from("oil")
      .delete()
      .eq("truckId", newOil?.truckId);

    if (deleteError) {
      console.error(deleteError);
      throw new Error("Oil row could not be deleted");
    }

    const { data, error } = await supabase
      .from("oil")
      .insert([{ ...newOil }])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Oil row could not be created");
    }

    return data;
  }

  // b) Edit
  const { data, error } = await supabase
    .from("oil")
    .update({ ...newOil })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Oil could not be created or edited");
  }

  return data;
}
