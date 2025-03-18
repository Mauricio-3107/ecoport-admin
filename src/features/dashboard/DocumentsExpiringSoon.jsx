import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { format, differenceInDays, parseISO } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";
import { HiOutlineExclamationCircle, HiOutlineBell } from "react-icons/hi2";

const StyledDocumentsBox = styled(DashboardBox)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 1.6rem;
  /* border-bottom: 1px solid var(--color-grey-200); */
`;

const DocumentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.8rem;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
  width: ${(props) => props.$width || "auto"}; /* Default to auto if not set */
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-grey-200);
`;

const TableData = styled.td`
  padding: 0.8rem;
  color: ${(props) => (props.$isDarkMode ? "#e5e7eb" : "#374151")};
`;

const ExpiryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ExpiryDate = styled.span`
  color: ${(props) =>
    props.$isUrgent
      ? "#dc2626"
      : "#facc15"}; /* Red for urgent, yellow for warning */
`;

function DocumentsExpiringSoon({ companyDocs, trucksDocs }) {
  const { isDarkMode } = useDarkMode();

  const sortByExpiry = (documents) =>
    documents
      .map((doc) => {
        const expiryDate = parseISO(doc.expiryDate); // Parse correctly
        const daysLeft = differenceInDays(
          expiryDate,
          new Date().setHours(0, 0, 0, 0)
        );

        return {
          ...doc,
          expiryDate,
          daysLeft,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);

  const expiringCompanyDocs = sortByExpiry(companyDocs);
  const expiringTruckDocs = sortByExpiry(trucksDocs);

  const getStatusIcon = (daysLeft) =>
    daysLeft <= 7 ? (
      <HiOutlineExclamationCircle size={20} color="#dc2626" />
    ) : (
      <HiOutlineBell size={20} color="#facc15" />
    );

  return (
    <StyledDocumentsBox>
      <Heading as="h2">📄 Documentos por vencer</Heading>

      {/* Company Documents */}
      <Section>
        <Heading as="h5">Empresa</Heading>
        <DocumentTable>
          <thead>
            <tr>
              <TableHeader $isDarkMode={isDarkMode} $width="20%">
                Nombre
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="30%">
                Documento
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="25%">
                Vence en
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="25%">
                Fecha
              </TableHeader>
            </tr>
          </thead>

          <tbody>
            {expiringCompanyDocs.map((doc) => (
              <TableRow key={doc.name + doc.company}>
                <TableData $isDarkMode={isDarkMode}>{doc.company}</TableData>
                <TableData $isDarkMode={isDarkMode}>{doc.name}</TableData>
                <TableData $isDarkMode={isDarkMode}>
                  <ExpiryContainer>
                    {getStatusIcon(doc.daysLeft)}
                    <ExpiryDate $isUrgent={doc.daysLeft <= 7}>
                      {doc.daysLeft < 1 && "Vencido"}
                      {doc.daysLeft === 1 && `${doc.daysLeft} día`}
                      {doc.daysLeft > 1 && `${doc.daysLeft} días`}
                    </ExpiryDate>
                  </ExpiryContainer>
                </TableData>
                <TableData $isDarkMode={isDarkMode}>
                  {format(new Date(doc.expiryDate), "dd MMM yyyy")}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </DocumentTable>
      </Section>

      {/* Truck Documents */}
      <Section>
        <Heading as="h5">Camiones</Heading>
        <DocumentTable>
          <thead>
            <tr>
              <TableHeader $isDarkMode={isDarkMode} $width="20%">
                Placa
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="30%">
                Documento
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="25%">
                Vence en
              </TableHeader>
              <TableHeader $isDarkMode={isDarkMode} $width="25%">
                Fecha
              </TableHeader>
            </tr>
          </thead>

          <tbody>
            {expiringTruckDocs.map((doc) => (
              <TableRow key={doc.licensePlate + doc.name}>
                <TableData $isDarkMode={isDarkMode}>
                  {doc.licensePlate}
                </TableData>
                <TableData $isDarkMode={isDarkMode}>{doc.name}</TableData>
                <TableData $isDarkMode={isDarkMode}>
                  <ExpiryContainer>
                    {getStatusIcon(doc.daysLeft)}
                    <ExpiryDate $isUrgent={doc.daysLeft <= 7}>
                      {doc.daysLeft < 1 && "Vencido"}
                      {doc.daysLeft === 1 && `${doc.daysLeft} día`}
                      {doc.daysLeft > 1 && `${doc.daysLeft} días`}
                    </ExpiryDate>
                  </ExpiryContainer>
                </TableData>
                <TableData $isDarkMode={isDarkMode}>
                  {format(new Date(doc.expiryDate), "dd MMM yyyy")}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </DocumentTable>
      </Section>
    </StyledDocumentsBox>
  );
}

export default DocumentsExpiringSoon;
