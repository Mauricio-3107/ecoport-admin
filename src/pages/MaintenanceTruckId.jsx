import { useParams } from "react-router-dom";
import MaintenanceDetail from "../features/maintenance/MaintenanceDetail";
import { useTrucks } from "../features/trucks/useTrucks";
import Spinner from "../ui/Spinner";

function MaintenanceTruckId() {
  const { isLoading, trucks } = useTrucks();
  const { truckId } = useParams();

  if (isLoading) return <Spinner />;
  const truck = trucks.find((truck) => truck.id === Number(truckId));
  const licensePlate = truck ? truck.licensePlate : "No encontrado";
  return <MaintenanceDetail licensePlate={licensePlate} />;
}

export default MaintenanceTruckId;
