import styled from "styled-components";

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 1.6rem;
`;
export default TilesGrid;
