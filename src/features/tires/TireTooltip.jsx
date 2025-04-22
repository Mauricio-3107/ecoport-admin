import { useState } from "react";
import { TireButton } from "../../ui/TireButton";
import { TireInput } from "../../ui/TireInput";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  HiMiniCalendar,
  HiOutlinePaperAirplane,
  HiOutlinePencil,
  HiOutlineTag,
  HiOutlineXMark,
} from "react-icons/hi2";
import { PiTireThin } from "react-icons/pi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { formatMileage } from "../../utils/helpers";

// Styled Components
const TooltipContainer = styled.div`
  position: absolute;
  background-color: var(--color-grey-0, white);
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  z-index: 1000; /* Increase this to a higher value to ensure it appears on top */
  width: 25rem;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIndicator = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
  background-color: ${(props) =>
    props.$status === "critical"
      ? "var(--color-red-300)"
      : props.$status === "warning"
      ? "var(--color-yellow-300)"
      : "var(--color-green-300)"};
`;

const CloseButton = styled.button`
  /* color: #6b7280; */
  border: none;
  border-radius: 50%;
  background-color: transparent;
  &:hover {
    color: var(--color-grey-500);
  }
`;

const SectionContainer = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  > * + * {
    margin-top: 0.75rem;
  }
`;

const Section = styled.div`
  padding-top: ${(props) => (props.$hasBorder ? "0.5rem" : "0")};
  padding-bottom: ${(props) => (props.$hasBorder ? "0.5rem" : "0")};
  border-top: ${(props) => (props.$hasBorder ? "1px solid #e5e7eb" : "none")};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const SectionIcon = styled.span`
  margin-right: 0.5rem;
  /* color: #6b7280; */
`;

const SectionLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
`;

const BrandSizeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandName = styled.div`
  font-weight: 500;
`;

const SizeTag = styled.div`
  font-size: 1.5rem;
  background-color: var(--color-grey-100);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const InfoLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 500;
`;

const InfoValue = styled.div``;

const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  color: var(--color-indigo-300);
  background-color: var(--color-indigo-100);
  border: 0.5px solid var(--color-indigo-300);
  font-size: 1.5rem;
  font-weight: 500;

  &:hover {
    color: var(--color-indigo-400);
  }
`;

const EditIcon = styled.span`
  margin-right: 0.25rem;
`;

const ValueDisplay = styled.div`
  /* color: #111827; */
  font-weight: 600;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  margin-top: 0.25rem;
`;

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const TireTooltip = ({ tire, isEditing, position, onClose, onUpdateTire }) => {
  const [editingField, setEditingField] = useState(null);
  const [mileageInput, setMileageInput] = useState(tire.odometerKm.toString());
  const [brandInput, setBrandInput] = useState(tire.brand);
  const [sizeInput, setSizeInput] = useState(tire.size);
  const [dateResetInput, setDateResetInput] = useState(tire.dateReset);
  const [costInput, setCostInput] = useState(tire.cost?.toString() || "0");
  const [typeInput, setTypeInput] = useState(tire.type);

  // Format currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  // Format date for display
  const formatDate = (date) => {
    return format(new Date(date), "PPP", { locale: es });
  };

  // Get tire status
  const getTireStatus = () => {
    if (tire.odometerKm > 40000) return "critical";
    if (tire.odometerKm > 30000) return "warning";
    return "good";
  };

  // Handle edit button click
  const handleEditClick = (field) => {
    setEditingField(field);
  };

  // Handle save button click
  // Fix for the switch statement in handleSave function
  const handleSave = () => {
    if (!editingField) return;

    const updates = {};

    switch (editingField) {
      case "mileage": {
        const newMileage = parseInt(mileageInput);
        if (!isNaN(newMileage) && newMileage >= 0) {
          updates.odometerKm = newMileage;
        }
        break;
      }
      case "brand": {
        if (brandInput.trim()) {
          updates.brand = brandInput;
        }
        break;
      }
      case "size": {
        if (sizeInput.trim()) {
          updates.size = sizeInput;
        }
        break;
      }
      case "dateReset": {
        if (dateResetInput && typeof dateResetInput === "string") {
          updates.dateReset = dateResetInput; // send as-is
        }
        break;
      }
      case "cost": {
        const newCost = parseFloat(costInput);
        if (!isNaN(newCost) && newCost >= 0) {
          updates.cost = newCost;
        }
        break;
      }
      case "type": {
        if (typeInput === "new" || typeInput === "retread") {
          updates.type = typeInput;
        }
        break;
      }
      default:
        break;
    }

    if (Object.keys(updates).length > 0) {
      onUpdateTire(tire.id, updates);
    }
    setEditingField(null);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setMileageInput(tire.odometerKm.toString());
    setBrandInput(tire.brand);
    setSizeInput(tire.size);
    setTypeInput(tire.type);
    setDateResetInput(tire.dateReset);
    setCostInput(tire.cost?.toString() || "0");
    setEditingField(null);
  };

  // Render edit forms for different fields
  const renderEditForm = () => {
    switch (editingField) {
      case "mileage":
        return (
          <div>
            <InfoLabel htmlFor="mileageInput">
              Actualizar Kilometraje (km)
            </InfoLabel>
            <InputContainer>
              <TireInput
                id="mileageInput"
                type="number"
                value={mileageInput}
                onChange={(e) => setMileageInput(e.target.value)}
                style={{ display: "block", width: "100%" }}
                min="0"
              />
            </InputContainer>
            <ButtonContainer>
              <TireButton variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </TireButton>
              <TireButton variant="default" size="lg" onClick={handleSave}>
                Guardar
              </TireButton>
            </ButtonContainer>
          </div>
        );
      case "brand":
      case "size":
        return (
          <div>
            <FormGrid>
              <div>
                <InfoLabel htmlFor="brandInput">Marca</InfoLabel>
                <TireInput
                  id="brandInput"
                  type="text"
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                  style={{ display: "block", width: "100%" }}
                />
              </div>
              <div>
                <InfoLabel htmlFor="sizeInput">Medida</InfoLabel>
                <TireInput
                  id="sizeInput"
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  style={{ display: "block", width: "100%" }}
                />
              </div>
            </FormGrid>
            <ButtonContainer>
              <TireButton variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </TireButton>
              <TireButton
                variant="default"
                size="lg"
                onClick={handleSave}
                disabled={isEditing}
              >
                Guardar
              </TireButton>
            </ButtonContainer>
          </div>
        );
      case "dateReset":
        return (
          <div>
            <InfoLabel htmlFor="dateResetInput">Fecha de cambio</InfoLabel>
            <InputContainer>
              <TireInput
                id="dateResetInput"
                type="datetime-local"
                value={dateResetInput}
                onChange={(e) => setDateResetInput(e.target.value)}
                style={{ display: "block", width: "100%" }}
              />
            </InputContainer>
            <ButtonContainer>
              <TireButton variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </TireButton>
              <TireButton variant="default" size="lg" onClick={handleSave}>
                Guardar
              </TireButton>
            </ButtonContainer>
          </div>
        );
      case "cost":
        return (
          <div>
            <InfoLabel htmlFor="costInput">Costo del Neumático</InfoLabel>
            <InputContainer>
              <TireInput
                id="costInput"
                type="number"
                value={costInput}
                onChange={(e) => setCostInput(e.target.value)}
                style={{ display: "block", width: "100%" }}
                min="0"
                step="0.01"
              />
            </InputContainer>
            <ButtonContainer>
              <TireButton variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </TireButton>
              <TireButton variant="default" size="lg" onClick={handleSave}>
                Guardar
              </TireButton>
            </ButtonContainer>
          </div>
        );
      case "type":
        return (
          <div>
            <InfoLabel htmlFor="typeSelect">Tipo de Neumático</InfoLabel>
            <InputContainer>
              <select
                id="typeSelect"
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                  backgroundColor: "var(--color-grey-0)",
                }}
              >
                <option value="new">Nuevo</option>
                <option value="retread">Reencauchado</option>
              </select>
            </InputContainer>
            <ButtonContainer>
              <TireButton variant="outline" size="lg" onClick={handleCancel}>
                Cancelar
              </TireButton>
              <TireButton variant="default" size="lg" onClick={handleSave}>
                Guardar
              </TireButton>
            </ButtonContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipContainer
      className="tire-tooltip"
      $left={`${position.x}px`}
      $top={`${position.y}px`}
    >
      <Header>
        <TitleContainer>
          <StatusIndicator $status={getTireStatus()} />
          <Heading as="h3">Neumático {tire.tireId}</Heading>
        </TitleContainer>
        <CloseButton onClick={onClose}>
          <HiOutlineXMark size={28} />
        </CloseButton>
      </Header>

      <SectionContainer>
        <Section>
          {editingField === "brand" || editingField === "size" ? (
            renderEditForm()
          ) : (
            <>
              <SectionHeader>
                <SectionIcon>
                  <HiOutlineTag size={20} />
                </SectionIcon>
                <SectionLabel>Marca y Medida</SectionLabel>
                <div style={{ marginLeft: "auto" }}>
                  <EditButton onClick={() => handleEditClick("brand")}>
                    <EditIcon>
                      <HiOutlinePencil size={20} />
                    </EditIcon>
                    Editar
                  </EditButton>
                </div>
              </SectionHeader>
              <BrandSizeContainer>
                <BrandName>{tire.brand}</BrandName>
                <SizeTag>{tire.size}</SizeTag>
              </BrandSizeContainer>
            </>
          )}
        </Section>

        <Section $hasBorder={true}>
          {editingField === "type" ? (
            renderEditForm()
          ) : (
            <div>
              <EditContainer>
                <SectionHeader>
                  <SectionIcon>
                    <PiTireThin size={20} />
                  </SectionIcon>
                  <SectionLabel>Tipo de Neumático</SectionLabel>
                </SectionHeader>
                <EditButton onClick={() => handleEditClick("type")}>
                  <EditIcon>
                    <HiOutlinePencil size={20} />
                  </EditIcon>
                  Editar
                </EditButton>
              </EditContainer>
              <ValueDisplay>
                {tire.type.charAt(0).toUpperCase() + tire.type.slice(1)}
              </ValueDisplay>
            </div>
          )}
        </Section>

        <Section $hasBorder={true}>
          <div>
            <InfoLabel>Posición</InfoLabel>
            <InfoValue>{tire.position}</InfoValue>
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <InfoLabel>Eje</InfoLabel>
            <InfoValue>#{tire.axle}</InfoValue>
          </div>
        </Section>
        <Section $hasBorder={true}>
          {editingField === "dateReset" ? (
            renderEditForm()
          ) : (
            <>
              <SectionHeader>
                <SectionIcon>
                  <HiMiniCalendar size={20} />
                </SectionIcon>
                <SectionLabel>Fecha de cambio</SectionLabel>
                <div style={{ marginLeft: "auto" }}>
                  <EditButton onClick={() => handleEditClick("dateReset")}>
                    <EditIcon>
                      <HiOutlinePencil size={20} />
                    </EditIcon>
                    Editar
                  </EditButton>
                </div>
              </SectionHeader>
              <InfoValue>{formatDate(tire.dateReset)}</InfoValue>
            </>
          )}
        </Section>
        <Section $hasBorder={true}>
          {editingField === "mileage" ? (
            renderEditForm()
          ) : (
            <div>
              <EditContainer>
                <SectionHeader>
                  <SectionIcon>
                    <HiOutlinePaperAirplane size={20} />
                  </SectionIcon>
                  <SectionLabel>Kilometraje Actual</SectionLabel>
                </SectionHeader>
                <EditButton onClick={() => handleEditClick("mileage")}>
                  <EditIcon>
                    <HiOutlinePencil size={20} />
                  </EditIcon>
                  Editar
                </EditButton>
              </EditContainer>
              <ValueDisplay>{formatMileage(tire.odometerKm)}</ValueDisplay>
            </div>
          )}
        </Section>
        <Section $hasBorder={true}>
          {editingField === "cost" ? (
            renderEditForm()
          ) : (
            <div>
              <EditContainer>
                <SectionHeader>
                  <SectionIcon>
                    <LiaMoneyBillWaveSolid size={20} />
                  </SectionIcon>
                  <SectionLabel>Costo del Neumático</SectionLabel>
                </SectionHeader>
                <EditButton onClick={() => handleEditClick("cost")}>
                  <EditIcon>
                    <HiOutlinePencil size={20} />
                  </EditIcon>
                  Editar
                </EditButton>
              </EditContainer>
              <ValueDisplay>{formatCurrency(tire.cost || 0)}</ValueDisplay>
            </div>
          )}
        </Section>
      </SectionContainer>
    </TooltipContainer>
  );
};

export default TireTooltip;
