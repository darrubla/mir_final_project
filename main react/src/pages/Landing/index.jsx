import { Button, Col, Container, Row } from 'react-bootstrap';
import BgImage from '../../assets/images/LandingBG.png';
import { Arrow } from '../../assets/icons/Arrow';
import { useContext, useState } from 'react';
import UserContext from '../../containers/UserContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { ModalAlert } from '../../components/ModalAlert';
import SubjectsCarousell from '../../components/SubjectsCarousell/SubjectsCarousell';
import { Info } from '../../content-welcome/Info';
import TeacherHome from '../TeacherHome';

export function Landing() {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [logType, setLogType] = useState();

  function handleClose() {
    setShow(false);
  }
  /*
  function handleShow(logT) {
    setShow(true);
    setLogType(logT);
  }
  */
  function onLog(val) {
    setUser({ type: val });
    setShow(false);
    navigate(`${logType}/${val}`);
  }
  if (user?.type == 'student' && user?.email) {
    return (
      <>
        <SubjectsCarousell />
        <Info />
      </>
    );
  }
  if (user?.type == 'teacher' && user?.email) {
    return (
      <>
        <TeacherHome />
        <Info />
      </>
    );
  }
  return (
    <main className="bg-image">
      <ModalAlert handleClose={handleClose} show={show} onLog={onLog} />
      <Outlet />
      <div
        style={{
          backgroundImage: `url(${BgImage})`,
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          paddingBottom: '19vh',
          paddingTop: '40px',
        }}
        className="d-flex align-items-center justify-content-between px-5 flex-column"
      >
        <div className="w-100 fs-5 fw-light">
          {/*
          <Navbar
            collapseOnSelect
            expand="lg"
            className="text-white"
            variant="dark"
          >
            <Container>
              <Navbar.Brand className="text-white" href="#home">
                <NLogo />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="border-white"
              />
              <Navbar.Collapse id="responsive-navbar-nav fw-light fs-5">
                <Nav className="ms-auto w-50 justify-content-between">
                  <Nav.Link className="text-white fs-5" href="#action2">
                    Home
                  </Nav.Link>
                  <Nav.Link className="text-white" href="#action2">
                    About
                  </Nav.Link>
                  <Nav.Link href="#action2" className="me-2 text-white">
                    Explore
                  </Nav.Link>
                  <Button
                    variant="outline-nexus-accent"
                    className="border-2 px-5"
                    onClick={() => handleShow('signin')}
                  >
                    Log In
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      */}
        </div>
        <Container fluid="xxl" className="m-0 p-0">
          <Row className="justify-content-between text-white">
            <Col className="col-6 p-0">
              <h1 className="display-1 fw-bolder lh-1 m-0">
                Experience the future of education.
              </h1>
            </Col>
            <Col className="col-4 pt-4 p-0 pe-5">
              <p className="fs-4 fw-light ">
                Connect with a diverse community of highly qualified educators,
                learn and grow.{' '}
              </p>
              <Button
                onClick={() => navigate('/auth/register')}
                className="mt-3"
                variant="nexus-accent"
                size="lg"
              >
                Join now
                <span className="ms-3">
                  <Arrow />
                </span>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}
