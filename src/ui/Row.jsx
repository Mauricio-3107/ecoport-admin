import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-direction: row;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
      }
    `}

  ${(props) =>
    props.type === "horizontal-no-space" &&
    css`
      justify-content: start;
      align-items: center;
      gap: 1.6rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
