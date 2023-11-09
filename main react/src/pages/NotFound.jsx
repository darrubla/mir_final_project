import { Container } from 'react-bootstrap';

export function NotFound() {
  return (
    <>
      <div className="info-not-found d-flex flex-column justify-content-center mx-1 vh-100">
        <Container fluid="xxl">
          <h3 className="d-flex m-3 fw-lighter text-start">
            <strong>Not Found :{'('}</strong>
          </h3>
        </Container>
      </div>
    </>
  );
}
