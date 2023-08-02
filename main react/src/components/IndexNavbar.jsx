import { Button } from "react-bootstrap";
import { NavSeparator } from "./NavSeparator";
import { NavigationBar } from "./NavigationBar";
import { NavigationTab } from "./NavigationTab";
import PropTypes from 'prop-types';

export function IndexNavbar({handleShow}) {
    return (
        <>
            <NavigationBar elements={
            <>
                <NavigationTab title="About" />
                <NavigationTab title="Explore" />
                <NavSeparator />
                <Button variant="warning" className='btn-register m-3 px-4 py-3' onClick={() => handleShow("signup")}>Register</Button>
                <Button variant="info" className='btn-signin m-3 me-5 px-4 py-3' onClick={() => handleShow("signin")}>Sign in</Button>
            </>
        } />
        </>
    )
}

IndexNavbar.propTypes = {
    handleShow: PropTypes.func.isRequired,
};