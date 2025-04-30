import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.2rem 0.8rem;
    line-height: 1.6;
    border-radius: 5px;
    display: inline-block;
  }
`;

export default Tag;
