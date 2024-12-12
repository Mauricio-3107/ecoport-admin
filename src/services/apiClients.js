import supabase, { supabaseUrl } from "./supabase";

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    console.error(error);
    throw new Error("Clients could not be loaded");
  }

  return data;
}

export async function createEditClient(newClient, id) {
  const hasImagePath = newClient.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newClient.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://iyvqjuxxoevmwkzvhsgv.supabase.co/storage/v1/object/public/client-logos/multipartes.jpeg
  const imagePath = hasImagePath
    ? newClient.image
    : `${supabaseUrl}/storage/v1/object/public/client-logos/${imageName}`;

  // 1. Create/Edit client
  let query = supabase.from("clients");

  // a) Create
  if (!id) query = query.insert([{ ...newClient, image: imagePath }]);

  // b) Edit
  if (id) query = query.update({ ...newClient, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Client could not be created");
  }

  // 2. Upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("client-logos")
    .upload(imageName, newClient.image);

  // 3. Delete the client if there was an error uploading the image
  if (storageError) {
    await supabase.from("clients").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Client image could not be uploaded and the client was not created"
    );
  }

  return data;
}

export async function deleteClient(id) {
  const { data, error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Client could not be deleted");
  }

  return data;
}
