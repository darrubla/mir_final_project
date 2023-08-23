import { StudentNavbar } from "../components/StudentNavbar";
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import { useContext } from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";

export function Schedule() {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);

    if (user?.type == "student" && user?.email) {
        return (
            <>
                <StudentNavbar account_email={user.email} handleLogout={()=>{
                    setUser(null)
                    navigate("/")
                }}/>
                <SectionName title="SCHEDULE" />
                <ScheduleForm />
                <SectionName title="SCHEDULED" />
                
            </>
        )
    }
    else {
        navigate ("/");
    }
}