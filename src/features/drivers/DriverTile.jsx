import { FaWhatsapp } from "react-icons/fa";
import styled from "styled-components";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

const Field = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const PhoneNumberWhatssapLink = styled.a`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function DriverTile({ driver }) {
  const { fullName, licenseNumber, phoneNumber, licensePlate, salary } = driver;

  return (
    <Card>
      <Header>
        <Title>{fullName}</Title>
      </Header>

      <Field>
        <strong>Licencia:</strong> {licenseNumber}
      </Field>
      <Field>
        <strong>Celular:</strong>{" "}
        <FaWhatsapp size={12} color="var(--color-green-700)" />{" "}
        <PhoneNumberWhatssapLink
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {phoneNumber}
        </PhoneNumberWhatssapLink>
      </Field>
      <Field>
        <strong>Placa:</strong> {licensePlate || "—"}
      </Field>
      <Field>
        <strong>Sueldo:</strong> {salary ? `Bs ${salary}` : "—"}
      </Field>
    </Card>
  );
}
