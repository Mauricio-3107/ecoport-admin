import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      font-style: italic;
    `}

    ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
      font-style: italic;
    `}
    
    ${(props) =>
    props.as === "h7" &&
    css`
      font-size: 1.4rem;
      font-weight: 600;
    `}
    
  line-height: 1.4;
`;

export default Heading;
