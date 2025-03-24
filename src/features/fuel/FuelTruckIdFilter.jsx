import Filter from "../../ui/Filter";

function FuelTruckIdFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 fuels" },
        { value: "15", label: "Last 15 fuels" },
      ]}
    />
  );
}

export default FuelTruckIdFilter;
