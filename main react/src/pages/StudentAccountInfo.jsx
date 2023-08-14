import { StudentNavbar } from "../components/StudentNavbar";
import UserContext from '../containers/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

export function StudentAccountInfo() {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
    if (user?.type == "student" && user?.email) {
        return (
            <>
                <StudentNavbar 
                    account_email={user.email} 
                    handleLogout={()=>{
                        setUser(null)
                        navigate("/")
                    }}/>
                <div className="info-recent-teachers d-flex flex-column justify-content-center mx-1">
                    <div className="d-flex flex-row section-header align-items-center">
                        <div className="d-flex align-items-start divider-h bg-dark mx-2" />
                        <h3 className="d-flex m-3 fw-lighter text-start"><strong>{`${user.name} ${user.lastname}`}</strong></h3>
                        <div className="d-flex align-items-start divider-h bg-dark mx-2" />
                    </div>
                </div>
            </>
                
        )
    }
    else {
        navigate ("/");
    }

    
}
