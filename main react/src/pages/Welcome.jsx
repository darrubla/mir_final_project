import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavigationBar } from '../components/NavigationBar';
import { ModalAlert } from '../components/ModalAlert';
import Button from 'react-bootstrap/Button';
import Features from '../content-welcome/features';
import Presentation from '../content-welcome/Presentation';
import { HowWorks } from '../content-welcome/HowWorks';
import Faq from '../content-welcome/FAQ';
import { Info } from '../content-welcome/Info';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';

export function Welcome() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [logType, setLogType] = useState();
    const handleClose = () => setShow(false);
    const { setUser } = useContext(UserContext);

    const handleShow = (logT) => {
      setShow(true);
      setLogType(logT);
    }

    function onLog(val) {/*Navigate to signin or signup*/
      setUser({type: val});
      navigate(logType);
    }

    return (
        <>
        <NavigationBar elements={
          <>
            <Nav.Link href="/about" className='fs-6 m-3 py-3'>About</Nav.Link>
            <Nav.Link href="/explore" className='fs-6 m-3 py-3'>Explore</Nav.Link>
            <div className="d-flex align-items-center divider-bar bg-dark m-3" />
            <Button variant="warning" className='btn-register m-3 px-4 py-3' onClick={() => handleShow("signup")}>Register</Button>
            <Button variant="info" className='btn-signin m-3 me-5 px-4 py-3' onClick={() => handleShow("signin")}>Sign in</Button>
            
          </>
        } />
        
        <ModalAlert handleClose={handleClose} show={show} onLog={onLog}/>

        <div className="welcome-content d-flex flex-column mt-5 mx-2 pt-5 px-1">
          <Presentation handleShow={handleShow}/>
          <Features />
          <HowWorks />
          <Faq />
          <Info />
        </div>
      </>
    );
}