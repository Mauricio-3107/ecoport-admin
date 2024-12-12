import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const MySelect = React.forwardRef(({ options, label, ...props }, ref) => {
  const finalOptions = [
    {
      value: "",
      label: `Selecciona ${label}`,
    },
    ...options,
  ];
  return (
    <StyledSelect ref={ref} {...props}>
      {finalOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
});

// Add display name for debugging and ESLint
MySelect.displayName = "MySelect";

export default MySelect;
