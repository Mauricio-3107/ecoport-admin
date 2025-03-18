import Filter from "../../ui/Filter";

function PickupFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
      ]}
    />
  );
}

export default PickupFilter;
