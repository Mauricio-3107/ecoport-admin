// import supabase from "./supabase";

// export async function getFinanceMonth(month) {
//   // Fetch costs
//   const { data: costs, error: costError } = await supabase
//     .from("monthlyTruckCosts")
//     .select("truckId, licensePlate, totalCost")
//     .eq("month", month);

//   if (costError) {
//     console.error("❌ Error fetching costs:", costError);
//     throw new Error("Error fetching cost data");
//   }

//   // Fetch revenues
//   const { data: revenues, error: revenueError } = await supabase
//     .from("monthlyTruckRevenue")
//     .select("truckId, totalRevenue")
//     .eq("month", month);

//   if (revenueError) {
//     console.error("❌ Error fetching revenues:", revenueError);
//     throw new Error("Error fetching revenue data");
//   }

//   // Merge by truckId
//   const revenueMap = new Map(revenues.map((r) => [r.truckId, r.totalRevenue]));

//   const merged = costs.map((truck) => ({
//     truckId: truck.truckId,
//     licensePlate: truck.licensePlate,
//     totalCost: truck.totalCost,
//     totalRevenue: revenueMap.get(truck.truckId) || 0,
//     profit: (revenueMap.get(truck.truckId) || 0) - truck.totalCost,
//   }));

//   return merged;
// }
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
