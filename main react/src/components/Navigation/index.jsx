import { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { css, cx } from '@emotion/css';

import UserContext from '../../containers/UserContext';
import { UserNavigation } from './UserNavigation';
import { rswitch } from '../../utils/rswitch';
import { NavigationTab } from './NavigationTab';
import { ModalAlert } from '../ModalAlert';
import { clearSession } from '../../api/session';
import { NLogo } from '../../assets/icons/NLogo';
import { getMyself } from '../../api/students';
import { getMe } from '../../api/teachers';

export function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [ setInfo] = useState()
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [logType, setLogType] = useState();

  async function loadInfo(type) {
    try {
      console.log('execution')
      console.log(type)
      if (type === 'student') {
        const response=await getMyself();
        setInfo(response.data)
      }
      if (type === 'teacher') {
        const response=await getMe();
        setInfo(response.data)

      }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    if(user) {
      loadInfo(user.type)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function onSignOut() {
    clearSession();
    setUser(null);
    navigate('/');
  }

  function onLog(val) {
    setUser({ type: val });
    setShow(false);
    navigate(`${logType}/${val}`);
  }

  /*function handleShow(logT) {
    setShow(true);
    setLogType(logT);
  }*/

  function handleClose() {
    setShow(false);
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant={user?.email ? 'light' : 'dark'}
        fixed="top"
        className={cx(
          css`
            padding-top: 48px;
            padding-bottom: 3px;
          `,
          user?.email && 'bg-nexus-white border-bottom border-secondary-subtle',
        )}
      >
        <Container fluid="xxl">
          <Navbar.Brand>
            <NLogo />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border-white"
          />
          <Navbar.Collapse id="responsive-navbar-nav fw-light fs-5">
            <Nav className="ms-auto w-50 justify-content-between align-items-center">
              <NavigationTab route="home" title="Home" />
              {rswitch(
                { user },
                {
                  student: (
                    <>
                      <NavigationTab route="schedule" title="Schedule" />
                      <NavigationTab route="checkout" title="Checkout" />
                      <NavigationTab route="mycalendar" title="Calendar"/>
                    </>
                  ),
                  teacher: (
                    <>
                      <NavigationTab route="bank" title="Bank" />
                      <NavigationTab route="overview" title="Overview" />
                      <NavigationTab route="mycalendar" title="Calendar"/>
                    </>
                  ),
                  default: <NavigationTab route="about" title="About" />,
                },
              )}
              <NavigationTab route="Explore" title="Explore" />
              {user?.email ? (
                <UserNavigation
                  handleSignOut={onSignOut}
                  email={user.email}
                  photo={`${import.meta.env.VITE_API_URL}/${user?.profilePhoto}`}
                />
              ) : (
                <Button
                  variant="outline-nexus-accent"
                  className="border-2 px-5"
                  onClick={() => navigate('/auth/login')}
                >
                  Log In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalAlert handleClose={handleClose} show={show} onLog={onLog} />
    </>
  );
}
