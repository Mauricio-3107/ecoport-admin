import styled from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

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
  align-items: center;
  gap: 1.2rem;
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
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

const EmailLink = styled.a`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-blue-700);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    overflow: visible;
    white-space: normal;
    word-break: break-all;
  }
`;

export default function ClientTile({ client }) {
  const { name, contactName, email, phoneNumber, image, city, type } = client;

  return (
    <Card>
      <Header>
        <Img src={image} alt={`Foto de ${name}`} />
        <Title>{name}</Title>
      </Header>

      <Field>
        <strong>Encargado(a):</strong> {contactName}
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
        <strong>Correo:</strong>{" "}
        <EmailLink href={`mailto:${email}`}>{email}</EmailLink>
      </Field>

      <Field>
        <strong>Ciudad:</strong> {city}
      </Field>

      <Field>
        <strong>Tipo:</strong> {type}
      </Field>
    </Card>
  );
}
