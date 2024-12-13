import supabase from "./supabase";

export async function getTrips({ filter, sortBy }) {
  let query = supabase
    .from("trips")
    .select(
      "id, tripType, origin, destination, startDate, truckDriverAssignments(id, trucks(licensePlate), drivers(fullName)), clients(name)"
    );

  // Filter query.eq(column, value)
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SortBy
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Trips could not be loaded");
  }

  return data;
}

export async function createEditTrip(newTrip, id) {
  // 1. Create/Edit Trip
  let query = supabase.from("trips");

  // a) create
  if (!id) query = query.insert([{ ...newTrip }]);

  // b) edit
  if (id) query = query.update({ ...newTrip }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Viaje no pudo ser creado");
  }

  return data;
}
