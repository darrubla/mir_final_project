import { useEffect, useState} from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduledLesson } from "./ScheduledLesson";
import {createLesson, getLessons} from '../api/lessons';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { LoadSubjectsList } from '../text/constants';


export function Schedule() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function onCreate(payload) {
        console.log(payload)
        await createLesson(payload)
    }
    async function loadLessons() {
        setLoading(true);
        setError('');
        try {
            const response = await getLessons();
            setData(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
        
    }
    useEffect(()=> {
        loadLessons();
    }, []);
    
    const subjectsOptions=LoadSubjectsList();

    if (subjectsOptions.length>0) { // Renderizo la página Schedule, cuando obtenga la lista de materias
        const options = []
        subjectsOptions.map((subjectObject)=> {
            options.push(subjectObject.subjectname)
        })
        console.log(options)
        return (
            <div className="pt-4 mt-5 d-flex flex-column justify-content-center">
                <SectionName title="SCHEDULE A CLASS" className="mt-5"/>
                <ScheduleForm onCreate={onCreate} options={options}/>
                <SectionName title="SCHEDULED" className="mt-5"/>
                {loading && <Spinner animation="grow" variant="secondary" />}
                {error && <Alert variant='danger'>{error}</Alert>}
                <ScheduledLesson lessondata={data} />
            </div>
        )
    }
    
}