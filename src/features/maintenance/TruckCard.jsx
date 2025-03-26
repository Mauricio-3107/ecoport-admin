import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import CreateMaintenanceForm from "./CreateMaintenanceForm";

const StyledTruckCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 4px 6px
    ${(props) =>
      props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  background-color: ${(props) => (props.$isDarkMode ? "#444" : "#fff")};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TruckImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
  filter: ${(props) =>
    props.$isDarkMode ? "brightness(90%)" : "brightness(100%)"};

  ${StyledTruckCard}:hover & {
    filter: blur(4px) brightness(60%);
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${StyledTruckCard}:hover & {
    opacity: 1;
  }
`;

const LicensePlate = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  background: ${(props) =>
    props.$isDarkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.8)"};
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.$primary
      ? props.$isDarkMode
        ? "#4CAF50" // 4CAF50
        : "#16d71d" // 16d71d
      : props.$isDarkMode
      ? "#3B8FCC" // 3B8FCC
      : "#007BFF"}; // 007BFF
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

function TruckCard({ truck }) {
  const { isDarkMode } = useDarkMode(); // Get the current dark mode status
  const navigate = useNavigate();
  const { id: truckId, licensePlate, image } = truck;

  return (
    <>
      <StyledTruckCard $isDarkMode={isDarkMode}>
        <TruckImage
          src={image}
          alt={`Truck ${licensePlate}`}
          $isDarkMode={isDarkMode}
        />
        <Modal>
          <OverlayContainer>
            <LicensePlate $isDarkMode={isDarkMode}>{licensePlate}</LicensePlate>
            <Modal.Open opens="add-maintenance-form">
              <Button
                $primary
                $isDarkMode={isDarkMode}
                onClick={() => console.log("Adding new repair")}
              >
                Agregar reparación
              </Button>
            </Modal.Open>
            <Button
              $isDarkMode={isDarkMode}
              onClick={() => navigate(`/maintenance/${truckId}`)}
            >
              Ver historial
            </Button>
          </OverlayContainer>

          <Modal.Window name="add-maintenance-form">
            <CreateMaintenanceForm
              truckId={truck.id}
              licensePlate={truck.licensePlate}
            />
          </Modal.Window>
        </Modal>
      </StyledTruckCard>
    </>
  );
}

export default TruckCard;
