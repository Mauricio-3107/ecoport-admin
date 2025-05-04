import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;

  &[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default Input;
