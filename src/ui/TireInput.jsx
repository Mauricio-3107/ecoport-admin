import styled from "styled-components";
// import PropTypes from "prop-types";

const InputElement = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const TireInput = (props) => {
  return <InputElement {...props} />;
};

// TireInput.propTypes = {
//   type: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func,
//   min: PropTypes.string,
//   max: PropTypes.string,
//   step: PropTypes.string,
//   style: PropTypes.object,
// };
