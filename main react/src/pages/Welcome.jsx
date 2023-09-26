import { useContext, useState } from 'react';
import Features from '../content-welcome/Features';
import Presentation from '../content-welcome/Presentation';
import Faq from '../content-welcome/Faq';
import { Info } from '../content-welcome/Info';
import UserContext from '../containers/UserContext';
import SubjectsCarousell from '../components/SubjectsCarousell/SubjectsCarousell';
import { ModalAlert } from '../components/ModalAlert';
import { useNavigate } from 'react-router-dom';
import TeacherHome from './TeacherHome';

export function Welcome() {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [logType, setLogType] = useState();
  const handleClose = () => setShow(false);

  const handleShow = (logT) => {
    setShow(true);
    setLogType(logT);
  };

  function onLog(val) {
    /*Navigate to signin or signup*/
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
    <>
      {/*<IndexNavbar handleShow={handleShow}/>*/}
      <main className="mt-1i welcome-content d-flex flex-column row-gap-1i">
        <ModalAlert handleClose={handleClose} show={show} onLog={onLog} />
        <Presentation handleShow={handleShow} />
        <Features />
        <Faq />
        <Info />
      </main>
    </>
  );
}
