import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getTrips({ filter, sortBy, page }) {
  let query = supabase
    .from("trips")
    .select(
      "id, tripType, origin, destination, startDate, price, truckDriverAssignments(id, trucks(licensePlate), drivers(fullName)), clients(id, name)",
      { count: "exact" }
    );

  // Filter query.eq(column, value)
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SortBy
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Trips could not be loaded");
  }
  return { data, count };
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

export async function deleteTrip(id) {
  const { data, error } = await supabase.from("trips").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Trip could not be deleted");
  }

  return data;
}

// Returns all TRIPS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getTripsAfterDate(date) {
  const { data, error } = await supabase
    .from("trips")
    .select("startDate, price")
    .gte("startDate", date)
    .lte("startDate", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Trips could not get loaded");
  }

  return data;
}
