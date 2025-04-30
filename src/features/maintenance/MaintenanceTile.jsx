import styled from "styled-components";
import Tag from "../../ui/Tag";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Value = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

function MaintenanceTile({ maintenance }) {
  const statusToTagName = {
    repair: "blue",
    spare: "green",
  };
  return (
    <Card>
      <div>
        <Label>Tipo:</Label>{" "}
        <Tag type={statusToTagName[maintenance.maintenanceKind]}>
          {maintenance.maintenanceKind === "repair" ? "Reparación" : "Compra repuesto"}
        </Tag>
      </div>
      <div>
        <Label>Nombre:</Label> <Value>{maintenance.name}</Value>
      </div>
      <div>
        <Label>Costo (Bs):</Label> <Value>{maintenance.cost}</Value>
      </div>
      <div>
        <Label>Fecha:</Label> <Value>{maintenance.date.split("T")[0]}</Value>
      </div>
      <div>
        <Label>Notas:</Label> <Value>{maintenance.notes || "-"}</Value>
      </div>
    </Card>
  );
}

export default MaintenanceTile;
