import Filter from "../../ui/Filter";

function FuelTruckIdFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Últimos 7 registros" },
        { value: "15", label: "Últimos 15 registros" },
      ]}
    />
  );
}

export default FuelTruckIdFilter;
