import supabase, { supabaseUrl } from "./supabase";

export async function getTrucks() {
  const { data, error } = await supabase
    .from("trucks")
    .select("*")
    .eq("isActive", true);

  if (error) {
    console.error(error);
    throw new Error("Trucks could not be loaded");
  }

  return data;
}

export async function createEditTruck(newTruck, id) {
  const hasImagePath = newTruck.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newTruck.image.name}`.replaceAll(
    "/",
    ""
  );
  // This was creating 2 slashes
  // const imagePath = hasImagePath
  //   ? newTruck.image
  //   : `${supabaseUrl}/storage/v1/object/public/truck-images/${imageName}`;

  // Suggested change to deal with the 2 slashes
  const bucketUrl = new URL(
    "/storage/v1/object/public/truck-images/",
    supabaseUrl
  );

  const imagePath = hasImagePath
    ? newTruck.image
    : new URL(imageName, bucketUrl).href;

  // 1. Create/Edit Truck
  let query = supabase.from("trucks");

  // a) create
  if (!id) query = query.insert([{ ...newTruck, image: imagePath }]);

  // b) edit
  if (id) query = query.update({ ...newTruck, image: imagePath }).eq("id", id);

  const { data: truck, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Camión no pudo ser creado");
  }

  // 2. Upload the image
  if (hasImagePath) return truck;

  const { error: storageError } = await supabase.storage
    .from("truck-images")
    .upload(imageName, newTruck.image);

  // 3. Delete the truck if there was an error uploading the image
  if (storageError) {
    await supabase.from("trucks").delete().eq("id", truck.id);
    console.error(storageError);
    throw new Error(
      "La imagen del camión no pudo cargar y el camión no fue creado"
    );
  }

  // 4. Automatically add the truck to the fuelConsumption table
  const { error: fuelError } = await supabase.from("fuelConsumption").insert([
    {
      truckId: truck.id, // Reference the newly created truck
      litersFueled: 0, // Default value (can be updated later)
      odometerKm: 0, // Default value
      fuelEfficiency: 0, // Default value
      location: "", // Default placeholder
    },
  ]);

  if (fuelError) {
    console.error(
      "Error al agregar el camión a la tabla de combustible:",
      fuelError
    );
    throw new Error(
      "El camión fue creado pero no pudo ser agregado a la tabla de combustible"
    );
  }

  return truck;
}

export async function deleteTruck(id) {
  const { data, error } = await supabase
    .from("trucks")
    .update({ isActive: false })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Truck could not be deleted");
  }

  return data;
}
