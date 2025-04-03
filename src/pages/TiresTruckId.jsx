import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useTrucks } from "../features/trucks/useTrucks";
import TiresDetail from "../features/tires/TiresDetail";
import { useTiresTruckId } from "../features/tires/useTiresTruckId";

function TiresTruckId() {
  const { isLoading, trucks } = useTrucks();
  const { truckId } = useParams();
  const { isLoading: isLoading2, tires } = useTiresTruckId();
  if (isLoading || isLoading2) return <Spinner />;

  const truck = trucks.find((truck) => truck.id === Number(truckId));
  const licensePlate = truck ? truck.licensePlate : "No encontrado";
  return (
    <TiresDetail licensePlate={licensePlate} tires={tires} />
  );
}

export default TiresTruckId;
