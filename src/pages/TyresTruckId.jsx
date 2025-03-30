import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useTrucks } from "../features/trucks/useTrucks";
import TyresDetail from "../features/tyres/TyresDetail";

function TyresTruckId() {
  const { isLoading, trucks } = useTrucks();
  const { truckId } = useParams();

  if (isLoading) return <Spinner />;
  const truck = trucks.find((truck) => truck.id === Number(truckId));
  const licensePlate = truck ? truck.licensePlate : "No encontrado";
  return <TyresDetail licensePlate={licensePlate} />;
}

export default TyresTruckId;
