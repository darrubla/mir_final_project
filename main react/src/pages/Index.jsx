import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../containers/UserContext";
import { NavbarState } from "../components/NavbarState";
import { ModalAlert } from "../components/ModalAlert";


export function Index() {
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
      setShow(false);
      navigate(`${logType}/${val}`)
    }

    const handleLogout = () => {
      setUser(null)
    }

    return (
        <>
            <NavbarState handleShow={handleShow} handleLogout={handleLogout} user={user}/>{/*Navbars*/}
            <ModalAlert handleClose={handleClose} show={show} onLog={onLog}/>
        </>
    )
}