import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* make them full-width if you like */
    gap: 1rem;
  }
`;

export default TableOperations;
