import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    align-items: start;
  }

  ${(props) =>
    props.$isButtonRow &&
    `
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;

    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      & > button {
        flex: 1 1 auto;
      }
    }
  `}
`;

const InputIconWrapper = styled.div`
  display: contents;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const IconSvg = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${({ color }) =>
      color === "green" ? "var(--color-green-700)" : "var(--color-red-700)"};
  }
`;

function FormRow({
  label,
  error,
  children,
  icon = null,
  color,
  isButtonRow = false,
}) {
  return (
    <StyledFormRow $isButtonRow={isButtonRow}>
      {!isButtonRow && label && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}

      {!isButtonRow ? (
        <InputIconWrapper>
          {children}
          {error && <Error>{error}</Error>}
          {icon && <IconSvg color={color}>{icon}</IconSvg>}
        </InputIconWrapper>
      ) : (
        children
      )}
    </StyledFormRow>
  );
}

export default FormRow;
