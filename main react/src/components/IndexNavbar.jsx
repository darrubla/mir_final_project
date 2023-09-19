import { Button } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import { NavigationTab } from "./NavigationTab";
import PropTypes from 'prop-types';

export function IndexNavbar({handleShow}) {
    return (
        <NavigationBar elements={
            <>
                <NavigationTab title="ABOUT" />
                <NavigationTab title="EXPLORE" />
                <Button variant="none" className='fs-5 px-5 py-0 border-nexus-gray-500' onClick={() => handleShow("signup")}>SIGN UP</Button>
                <Button variant="nexus-accent" className='fs-5 px-5 py-0' onClick={() => handleShow("signin")}>SIGN IN</Button>
            </>
        } />
    )
}

IndexNavbar.propTypes = {
    handleShow: PropTypes.func.isRequired,
};