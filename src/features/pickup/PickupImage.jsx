import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";

const ImageBox = styled.div`
  background-color: ${(props) =>
    props.$isDarkMode ? "#18212f" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => props.$height}px;

  @media screen and (max-width: 768px) {
    grid-column: 1 / -1; /* <— This forces full width on mobile */
    padding: 1.6rem;
  }
`;

const PickupImg = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: var(--border-radius-md);
`;

function PickupImage({ height, imageUrl }) {
  const { isDarkMode } = useDarkMode();

  return (
    <ImageBox $isDarkMode={isDarkMode} $height={height}>
      <Heading as="h2">SUZUKI - CARRY</Heading>
      <PickupImg src={imageUrl} alt="Pickup Truck" height={height} />
    </ImageBox>
  );
}

export default PickupImage;
