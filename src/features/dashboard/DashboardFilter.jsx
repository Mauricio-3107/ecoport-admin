import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Últimos 7 días" },
        { value: "30", label: "Últimos 30 días" },
      ]}
    />
  );
}

export default DashboardFilter;
