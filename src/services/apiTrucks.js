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

  //If it is an edit session, you already udpdated the values
  if (id) return truck;

  // From now on, you create the related tables to each truck, which cannot be edited or updated
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

  // 5. Automatically add the truck to the oil table
  const { error: oilError } = await supabase.from("oil").insert([
    {
      truckId: truck.id, // Reference the newly created truck
      name: "", // Default value (can be updated later)
      odometerKm: 0, // Default value
      lastKm: 0, // Default value
      nextKm: 0, // Default value
      date: "", // Default value
    },
  ]);

  if (oilError) {
    console.error(
      "Error al agregar el camión a la tabla de aceite:",
      fuelError
    );
    throw new Error(
      "El camión fue creado pero no pudo ser agregado a la tabla de aceite"
    );
  }

  // 6. Create tripCosts table
  const { error: costsError } = await supabase.from("tripCosts").insert([
    {
      truckId: truck.id, // Reference the newly created truck
      agent: 0, // Default value
      expenses: 0, // Default value
      extraFuel: 0, // Default value
    },
  ]);

  if (costsError) {
    console.error(
      "Error al agregar el camión a la tabla de costos de viaje:",
      fuelError
    );
    throw new Error(
      "El camión fue creado pero no pudo ser agregado a la tabla de costos de viaje"
    );
  }

  // 7. Automatically add the truck to the tires table
  const totalTires = truck.tires + 12; // Truck tires + trailer tires
  const truckAxles = truck.tires === 6 ? 2 : 3; // 6 tires = 2 axles, 8 or 10 tires = 3 axles
  const totalAxles = truckAxles + 3; // Truck axles + trailer axles

  const tiresData = [];

  // Truck Tires
  for (let axle = 1; axle <= truckAxles; axle++) {
    if (axle === 1) {
      // Front Axle - 2 Tires
      tiresData.push(
        {
          truckId: truck.id,
          tireId: `FL${axle}`,
          position: "Front Left",
          axle,
          odometerKm: 0,
          brand: "",
          size: "",
          dateReset: "",
          cort: "",
          type: "Truck",
        },
        {
          truckId: truck.id,
          tireId: `FR${axle}`,
          position: "Front Right",
          axle,
          odometerKm: 0,
          brand: "",
          size: "",
          dateReset: "",
          cort: "",
          type: "Truck",
        }
      );
    } else {
      if (totalTires === 20) {
        if (axle === 2) {
          tiresData.push(
            {
              truckId: truck.id,
              tireId: `${axle}L1`,
              position: `Axle ${axle} Left Inner`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            },
            {
              truckId: truck.id,
              tireId: `${axle}L2`,
              position: `Axle ${axle} Left Outer`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            },
            {
              truckId: truck.id,
              tireId: `${axle}R1`,
              position: `Axle ${axle} Right Inner`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            },
            {
              truckId: truck.id,
              tireId: `${axle}R2`,
              position: `Axle ${axle} Right Outer`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            }
          );
        }
        if (axle === 3) {
          tiresData.push(
            {
              truckId: truck.id,
              tireId: `${axle}L1`,
              position: `Axle ${axle} Left Inner`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            },
            {
              truckId: truck.id,
              tireId: `${axle}R1`,
              position: `Axle ${axle} Right Inner`,
              axle,
              odometerKm: 0,
              brand: "",
              size: "",
              dateReset: "",
              cort: "",
              type: "Truck",
            }
          );
        }
      } else {
        // Drive Axles - 4 Tires each
        tiresData.push(
          {
            truckId: truck.id,
            tireId: `${axle}L1`,
            position: `Axle ${axle} Left Inner`,
            axle,
            odometerKm: 0,
            brand: "",
            size: "",
            dateReset: "",
            cort: "",
            type: "Truck",
          },
          {
            truckId: truck.id,
            tireId: `${axle}L2`,
            position: `Axle ${axle} Left Outer`,
            axle,
            odometerKm: 0,
            brand: "",
            size: "",
            dateReset: "",
            cort: "",
            type: "Truck",
          },
          {
            truckId: truck.id,
            tireId: `${axle}R1`,
            position: `Axle ${axle} Right Inner`,
            axle,
            odometerKm: 0,
            brand: "",
            size: "",
            dateReset: "",
            cort: "",
            type: "Truck",
          },
          {
            truckId: truck.id,
            tireId: `${axle}R2`,
            position: `Axle ${axle} Right Outer`,
            axle,
            odometerKm: 0,
            brand: "",
            size: "",
            dateReset: "",
            cort: "",
            type: "Truck",
          }
        );
      }
    }
  }

  // Trailer Tires (Axles 3||4 to 6)
  for (let axle = truckAxles + 1; axle <= totalAxles; axle++) {
    tiresData.push(
      {
        truckId: truck.id,
        tireId: `${axle}L1`,
        position: `Axle ${axle} Left Inner`,
        axle,
        odometerKm: 0,
        brand: "",
        size: "",
        dateReset: "",
        cort: "",
        type: "Trailer",
      },
      {
        truckId: truck.id,
        tireId: `${axle}L2`,
        position: `Axle ${axle} Left Outer`,
        axle,
        odometerKm: 0,
        brand: "",
        size: "",
        dateReset: "",
        cort: "",
        type: "Trailer",
      },
      {
        truckId: truck.id,
        tireId: `${axle}R1`,
        position: `Axle ${axle} Right Inner`,
        axle,
        odometerKm: 0,
        brand: "",
        size: "",
        dateReset: "",
        cort: "",
        type: "Trailer",
      },
      {
        truckId: truck.id,
        tireId: `${axle}R2`,
        position: `Axle ${axle} Right Outer`,
        axle,
        odometerKm: 0,
        brand: "",
        size: "",
        dateReset: "",
        cort: "",
        type: "Trailer",
      }
    );
  }

  // Insert Tires
  const { error: tiresError } = await supabase.from("tires").insert(tiresData);

  if (tiresError) {
    console.error(
      "Error al agregar el camión a la tabla de gomas:",
      tiresError
    );
    throw new Error(
      "El camión fue creado pero no pudo ser agregado a la tabla de gomas"
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
