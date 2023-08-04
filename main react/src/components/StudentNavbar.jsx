import { Button } from "react-bootstrap";
import { NavSeparator } from "./NavSeparator";
import { NavigationBar } from "./NavigationBar";
import { NavigationTab } from "./NavigationTab";
import PropTypes from 'prop-types';



export function StudentNavbar({account_email, handleLogout}) {
    return (
        <NavigationBar elements={
        <>
            <NavigationTab title="About" />
            <NavigationTab title="Explore" />
            <NavigationTab title="Schedule" />
            <NavSeparator />
            <NavigationTab title={account_email} iconClassName={"bi bi-person-circle"} navig="my_account"/>
            <NavigationTab navig="Messages" iconClassName={"bi bi-envelope-fill"} />
            <NavigationTab navig="Liked" iconClassName={"bi bi-suit-heart-fill"} />
            <NavigationTab navig="Scheduled" iconClassName={"bi bi-calendar-fill"} />
            <NavigationTab navig="Notifications" iconClassName={"bi bi-bell-fill"} />
            <Button variant="warning" className='btn-logout m-3 me-5 px-4 py-3' onClick={() => handleLogout()}>Log out</Button>
        </>
        } />
    )
}

StudentNavbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    account_email: PropTypes.string.isRequired,
};