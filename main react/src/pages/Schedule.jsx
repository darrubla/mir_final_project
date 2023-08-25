import { StudentNavbar } from "../components/StudentNavbar";
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import { useContext, useEffect, useState} from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduledLesson } from "./ScheduledLesson";

export function Schedule() {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
    const [data, setData] = useState([]);

    async function loadLessons() {
        const response = await fetch ('http://localhost:3000/api/lessons');
        const json = await response.json()
        setData(json.data);
    }
    useEffect(()=> {
        loadLessons();
    }, []);
    
    if (user?.type == "student" && user?.email) {
        return (
            <>
            <StudentNavbar account_email={user.email} handleLogout={()=>{
                        setUser(null)
                        navigate("/")
                    }}/>
            <div className="pt-4 mt-5">
                <SectionName title="SCHEDULE" className="mt-5"/>
                <ScheduleForm />
                <SectionName title="SCHEDULED" className="mt-5"/>
                <ScheduledLesson lessondata={data} />
            </div>
                
            </>
        )
    }
    else {
        navigate ("/");
    }
}