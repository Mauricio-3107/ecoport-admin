import Filter from "../../ui/Filter";

function ActivityFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "Today", label: "Today" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
      ]}
    />
  );
}

export default ActivityFilter;
