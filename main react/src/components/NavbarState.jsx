import { IndexNavbar } from "./IndexNavbar"
import { StudentNavbar } from "./StudentNavbar"
import { TeacherNavbar } from "./TeacherNavbar"

import PropTypes from 'prop-types';

export function NavbarState({handleShow, handleLogout, user}) {
    if (user?.email) {
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
    //If log is false, show welcome index bar
    return (
        <IndexNavbar handleShow={handleShow} />
    )
}
NavbarState.propTypes = {
    handleShow: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    user:  PropTypes.object,
};
