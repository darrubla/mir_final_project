import { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavigationBar } from '../components/NavigationBar';
import { ModalAlert } from '../components/ModalAlert';
import Button from 'react-bootstrap/Button';
import Features from '../content-welcome/features';
import Presentation from '../content-welcome/Presentation';
import { HowWorks } from '../content-welcome/HowWorks';
import Faq from '../content-welcome/FAQ';
import { Info } from '../content-welcome/Info';
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import SubjectsCarousell from '../components/subjectsCarousell/subjectsCarousell';
import { NavigationTab } from '../components/NavigationTab';
import { NavSeparator } from '../components/NavSeparator';

export function Welcome() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [logType, setLogType] = useState();
    const handleClose = () => setShow(false);
    const { setUser, user } = useContext(UserContext);

    const handleShow = (logT) => {
      setShow(true);
      setLogType(logT);
    }

    function onLog(val) {/*Navigate to signin or signup*/
      setUser({type: val});
      navigate(logType);
    }

    const handleLogout = () => {
      setUser(null)
    }

    const navRightOptions = () => {
      if (!user?.type) {
        return (
          <>
            <NavSeparator />
            <Button variant="warning" className='btn-register m-3 px-4 py-3' onClick={() => handleShow("signup")}>Register</Button>
            <Button variant="info" className='btn-signin m-3 me-5 px-4 py-3' onClick={() => handleShow("signin")}>Sign in</Button>
          </>
        )
      }
      return (
        <>
            <NavigationTab title="Schedule" />
            <NavSeparator />
            <NavigationTab title={user.email} iconClassName={"bi bi-person-circle"} />
            <NavigationTab navi="Messages" iconClassName={"bi bi-envelope-fill"} />
            <NavigationTab navi="Liked" iconClassName={"bi bi-suit-heart-fill"} />
            <NavigationTab navi="Scheduled" iconClassName={"bi bi-calendar-fill"} />
            <NavigationTab navi="Notifications" iconClassName={"bi bi-bell-fill"} />
            <Button variant="warning" className='btn-logout m-3 me-5 px-4 py-3' onClick={() => handleLogout()}>Log out</Button>
        </>
      )
    }

    const renderStudentView = () => (<SubjectsCarousell/>)
    const renderView = () => {
      if (user?.type == "student" && user?.email) {
        return renderStudentView()
      }
      return (
        <>
          <Presentation handleShow={handleShow}/>
          <Features />
          <HowWorks />
          <Faq />
        </>
      )
    }

    return (
        <>
        <NavigationBar elements={
          <>
            <NavigationTab title="About" />
            <NavigationTab title="Explore" />
            {navRightOptions()}
          </>
        } />

        <ModalAlert handleClose={handleClose} show={show} onLog={onLog}/>

        <div className="welcome-content d-flex flex-column mt-5 mx-2 pt-5 px-1">
          {renderView()}
          <Info />
        </div>
      </>
    );
}