import Filter from "../../ui/Filter";

function ActivityFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "Today", label: "Hoy" },
        { value: "7", label: "Últimos 7 días" },
        { value: "30", label: "Últimos 30 días" },
      ]}
    />
  );
}

export default ActivityFilter;
