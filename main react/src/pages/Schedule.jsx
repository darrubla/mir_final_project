import { StudentNavbar } from "../components/StudentNavbar";
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import { useContext, useState } from 'react';


export function Schedule({list_lessons}) {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);

    if (user?.type == "student" && user?.email) {
        console.log(user);
        return (
            <>
                <StudentNavbar account_email={user.email} handleLogout={()=>{
                    setUser(null)
                    navigate("/")
                }}/>
                <div className="mb-4">
                    <h6 className="text-uppercase">SCHEDULE</h6>
                    <hr data-content="AND" className="hr-text" />
                </div>
                <div className="mb-4">
                    <h6 className="text-uppercase">SCHEDULED</h6>
                    <hr data-content="AND" className="hr-text" />
                </div>
            </>
        )
    }
    else {
        navigate ("/");
    }
}