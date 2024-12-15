import UpdateCompanyForm from "../features/company/UpdateCompanyForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Company() {
  return (
    <Row>
      <Heading as="h1">Documentos de la Empresa</Heading>
      <UpdateCompanyForm />
    </Row>
  );
}

export default Company;
