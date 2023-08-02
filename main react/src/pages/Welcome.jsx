import { useContext, useState } from 'react';
import { ModalAlert } from '../components/ModalAlert';
import Features from '../content-welcome/Features';
import Presentation from '../content-welcome/Presentation';
import { HowWorks } from '../content-welcome/HowWorks';
import Faq from '../content-welcome/Faq';
import { Info } from '../content-welcome/Info';
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import { StudentNavbar } from '../components/StudentNavbar';
import { TeacherNavbar } from '../components/TeacherNavbar';
import { NavigationBar } from '../components/NavigationBar';
import { IndexNavbar } from '../components/IndexNavbar';
import SubjectsCarousell from '../components/subjectsCarousell/subjectsCarousell';

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
      if (!user?.email) {//If log is false, show welcome index bar
        return (
          <>
            <NavigationBar elements={
            <>
                <IndexNavbar handleShow={handleShow} />
            </>
            } />
        </>
        )
      }
      if (user?.email) {//if log is true
        if (user?.type == "student") {
          return (
            <StudentNavbar account_email={user.email} handleLogout={handleLogout} />
          )
        }
        if (user?.type == "teacher") {
          return (
            <TeacherNavbar account_email={user.email} handleLogout={handleLogout} />
          )
        }
      }
      
    }

    const renderStudentView = () => (<SubjectsCarousell/>)
    const renderView = () => {
      if (user?.type == "student" && user?.email) {
        return renderStudentView()//Cards and student home page
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
        {navRightOptions()}{/*Navbars*/}
        <ModalAlert handleClose={handleClose} show={show} onLog={onLog}/>
        <div className="welcome-content d-flex flex-column mt-5 mx-2 pt-5 px-1">
          {renderView()}
          <Info />{/*Info section always visible in home page (with and without login)*/}
        </div>
      </>
    );
}