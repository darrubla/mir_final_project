import { StudentNavbar } from "../components/StudentNavbar";
import { useNavigate } from 'react-router-dom';
import UserContext from '../containers/UserContext';
import { useContext, useEffect, useState} from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

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
                <SectionName title="SCHEDULE" />
                <ScheduleForm />
                <SectionName title="SCHEDULED" />
                
                    <Accordion defaultActiveKey="0">
                        {data.map((lesson, key)=>(
                            <Accordion.Item eventKey={key} key= {key}>
                                <Accordion.Header>
                                    <p>
                                        {`${lesson.subject}: ${lesson.scheduledAt}`}
                                    </p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    
                                    <div className="d-flex flex-column">
                                        {lesson.description}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="warning" className="d-flex m-2">Vote +1</Button>
                                        <Button variant="danger" className="d-flex m-2">Block</Button>
                                    </div>
                                    
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                    
                        {/*
                        <Card style={{ width: '18rem' }} key={index}>
                            <Card.Img variant="top" src="holder.js/50px50" />
                            <Card.Body>
                                <Card.Title>{item.subject}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <Button variant="warning">Vote +1</Button>
                                <Button variant="danger">Block</Button>
                            </Card.Body>
                    </Card>*/}
            </>
        )
    }
    else {
        navigate ("/");
    }
}