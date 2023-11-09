import { Button, ButtonGroup } from "react-bootstrap";

export function DevelopmentTeam() {
  return (
    <>
      <div className="info-not-found d-flex flex-column mx-1 vh-100 my-5 py-5">
        <div className="d-flex align-items-center flex-column px-5 mx-5">
          <h2 className="d-flex mt-5 fw-lighter text-start">
            <strong>GitHub</strong>
          </h2>
          <ButtonGroup aria-label="Basic example" size="lg">
            <Button variant="success" href="https://github.com/GosuBoy" >Javier Chavez</Button>
            <Button variant="success" href="https://github.com/carlos-ediaz" >Carlos Diaz</Button>
            <Button variant="success" href="https://github.com/darrubla">Daniel Arrubla</Button>
          </ButtonGroup>
          </div>
      </div>
    </>
  );
}
