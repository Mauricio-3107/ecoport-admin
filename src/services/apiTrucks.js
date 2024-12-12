import supabase, { supabaseUrl } from "./supabase";

export async function getTrucks() {
  const { data, error } = await supabase.from("trucks").select("*");

  if (error) {
    console.error(error);
    throw new Error("Trucks could not be loaded");
  }

  return data;
}

export async function createEditTruck(newTruck, id) {
  const hasImagePath = newTruck.image?.startsWith?.(supabaseUrl);
  console.log(newTruck.image.name);

  const imageName = `${Math.random()}-${newTruck.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newTruck.image
    : `${supabaseUrl}/storage/v1/object/public/truck-images/${imageName}`;

  // 1. Create/Edit Truck
  let query = supabase.from("trucks");

  // a) create
  if (!id) query = query.insert([{ ...newTruck, image: imagePath }]);

  // b) edit
  if (id) query = query.update({ ...newTruck, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Camión no pudo ser creado");
  }

  // 2. Upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("truck-images")
    .upload(imageName, newTruck.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("trucks").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "La imagen del camión no pudo cargar y el camión no fue creado"
    );
  }

  return data;
}

export async function deleteTruck(id) {
  const { data, error } = await supabase.from("trucks").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Truck could not be deleted");
  }

  return data;
}
