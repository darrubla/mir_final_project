import { Button } from "react-bootstrap";

export function Mail() {
  return (
    <>
      <div className="info-not-found mx-1 vh-100 my-5 py-5">
        <div className="d-flex align-items-center flex-column px-5 mx-5">
            <Button className="px-5 m-5" variant="outline-success" size="lg" href="mailto:class2nexus@gmail.com">Mail</Button>
          </div>
      </div>
    </>
  );
}
