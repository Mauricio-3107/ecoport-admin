import supabase from "./supabase";

export async function getCompany() {
  const { data, error } = await supabase.from("company").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Company data could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateCompany(newData) {
  const { data, error } = await supabase
    .from("company")
    .update(newData)
    // There is only ONE row of company, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Company data could not be updated");
  }
  
  return data;
}
