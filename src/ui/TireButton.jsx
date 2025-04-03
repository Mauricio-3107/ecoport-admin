import styled from "styled-components";

const ButtonElement = styled.button`
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Size variations */
  padding: ${(props) =>
    props.$size === "sm"
      ? "0.375rem 0.75rem"
      : props.$size === "lg"
      ? "0.75rem 1.5rem"
      : "0.5rem 1rem"};
  font-size: ${(props) =>
    props.$size === "sm"
      ? "0.875rem"
      : props.$size === "lg"
      ? "1.125rem"
      : "1rem"};

  /* Variant styling */
  background-color: ${(props) =>
    props.$variant === "default" ? "#3b82f6" : "transparent"};
  color: ${(props) => (props.$variant === "default" ? "white" : "#3b82f6")};
  border: ${(props) =>
    props.$variant === "outline" ? "1px solid #3b82f6" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.$variant === "default" ? "#2563eb" : "rgba(59, 130, 246, 0.1)"};
  }
`;

export const TireButton = ({
  variant = "default",
  size = "md",
  onClick,
  disabled,
  children,
}) => {
  return (
    <ButtonElement
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonElement>
  );
};

// Button.propTypes = {
//   variant: PropTypes.oneOf(["default", "outline"]),
//   size: PropTypes.oneOf(["sm", "md", "lg"]),
//   onClick: PropTypes.func,
//   children: PropTypes.node.isRequired,
// };
