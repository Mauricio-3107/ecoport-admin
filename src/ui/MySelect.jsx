import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  font-size: 1.3rem;
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

const MySelect = React.forwardRef(
  ({ selectLabel=true, options, label, ...props }, ref) => {
    let finalOptions;
    if (selectLabel === true) {
      finalOptions = [
        {
          value: "",
          label: `Selecciona ${label}`,
        },
        ...options,
      ];
    } else {
      finalOptions = [...options];
    }

    return (
      <StyledSelect ref={ref} {...props}>
        {finalOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
  }
);

// Add display name for debugging and ESLint
MySelect.displayName = "MySelect";

export default MySelect;
