import supabase from "./supabase";

export async function getFinanceMonth(month) {
  // Fetch costs with breakdown
  const { data: costs, error: costError } = await supabase
    .from("monthlyTruckCosts")
    .select(
      "truckId, licensePlate, totalCost, oilCost, salaryCost, fuelConsumptionCost, dailyExpensesCost, maintenanceCost, tiresCost, travelCost"
    )
    .eq("month", month);

  if (costError) {
    console.error("❌ Error fetching costs:", costError);
    throw new Error("Error fetching cost data");
  }

  // Fetch revenues
  const { data: revenues, error: revenueError } = await supabase
    .from("monthlyTruckRevenue")
    .select("truckId, totalRevenue")
    .eq("month", month);

  if (revenueError) {
    console.error("❌ Error fetching revenues:", revenueError);
    throw new Error("Error fetching revenue data");
  }

  // Merge by truckId
  const revenueMap = new Map(revenues.map((r) => [r.truckId, r.totalRevenue]));

  const merged = costs.map((truck) => ({
    ...truck,
    totalRevenue: revenueMap.get(truck.truckId) || 0,
    profit: (revenueMap.get(truck.truckId) || 0) - truck.totalCost,
  }));

  return merged;
}

export async function getMonthImages() {
  const { data, error } = await supabase
    .from("monthImages")
    .select("month, imageUrl")
    .order("month");

  if (error) {
    console.error("❌ Error fetching monthly backgrounds:", error);
    throw new Error("Could not load month background images");
  }

  return data;
}
