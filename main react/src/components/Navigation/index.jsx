import { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../containers/UserContext';
import { Logo } from '../../assets/icons/Logo';
import { UserNavigation } from './UserNavigation';
import { rswitch } from '../../utils/rswitch';
import { NavigationTab } from './NavigationTab';
import { ModalAlert } from '../ModalAlert';
import { clearSession } from '../../api/session';

export function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [logType, setLogType] = useState();

  function onSignIn() {
    handleShow('signin');
    //navigate('/signin');
  }

  function onSignOut() {
    clearSession();
    setUser(null);
    navigate('/');
  }
  // Should move this functions along with modal to a single component
  function onLog(val) {
    setUser({ type: val });
    setShow(false);
    navigate(`${logType}/${val}`);
  }

  const handleShow = (logT) => {
    setShow(true);
    setLogType(logT);
  };

  const handleClose = () => setShow(false);
  //------------------------------------------------------------------
  return (
    <>
      <nav className="pt-page-h px-page-v fixed-top bg-nexus-base">
        <Container fluid className="fs-2 text-nexus-gray-500 fw-light">
          {' '}
          {/* add px-0 when navbar is not fixed */}
          <Row>
            <Col>
              <Logo />
            </Col>

              {
                //
                rswitch({user}, {
                  student: 
                    <Col className='d-flex justify-content-center'>
                      <NavigationTab route="schedule" title="SCHEDULE" />
                    </Col>,
                  teacher: 
                    <>
                      <Col className='d-flex justify-content-center'>
                        <NavigationTab route="bank" title="BANK" />
                      </Col>
                      <Col className='d-flex justify-content-center'>
                        <NavigationTab route="overview" title="OVERVIEW" />
                      </Col>
                    </>,
                  default: 
                    <Col className='d-flex justify-content-center'>
                      <NavigationTab route="about" title="ABOUT" />
                    </Col>,
                })
              }

            <Col className='d-flex justify-content-center'x >
              <NavigationTab route="explore" title="EXPLORE" />
            </Col>
            <Col className="col-6 d-flex justify-content-end">
              {user?.email ? (
                <UserNavigation handleSignOut={onSignOut} email={user.email}/>
              ) : (
                <>
                  <span className="me-3 fs-1">Already member?</span>

                  <Col className="col-3 my-auto">
                    <div className="d-grid">
                      <Button
                        className="p-0 border-nexus-gray-500 border-2 fs-5"
                        variant="none"
                        onClick={onSignIn}
                      >
                        LOG IN
                      </Button>
                    </div>
                  </Col>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </nav>
      <ModalAlert handleClose={handleClose} show={show} onLog={onLog} />
    </>
  );
}
