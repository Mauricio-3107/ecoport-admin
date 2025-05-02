import styled from "styled-components";
import TruckTireVisualization from "./TruckTireVisualization";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";
import useMediaQuery from "../../hooks/useMediaQuery";

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  background-color: var(--color-grey-0, white);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    padding: 0rem;
  }
`;
const CardContainer = styled.div`
  width: 100%;
  /* max-width: 56rem; */
  min-width: 56rem;

  background-color: var(--color-grey-0, white);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    min-width: 90%;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  @media screen and (max-width: 768px) {
    /* display: contents; */
    padding: 0.5rem;
  }
`;

function TiresDetail({ licensePlate, tires }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Heading as={`${isMobile ? "h2" : "h1"}`}>
        Neumáticos: {licensePlate}
      </Heading>
      {!tires.length && <Empty resourceName="neumático" />}
      {tires.length > 0 && (
        <PageContainer>
          <CardContainer>
            <CardContent>
              <TruckTireVisualization initialTires={tires} />
            </CardContent>
          </CardContainer>
        </PageContainer>
      )}
    </>
  );
}

export default TiresDetail;
