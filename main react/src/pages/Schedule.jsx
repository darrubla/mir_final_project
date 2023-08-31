import { useEffect, useState} from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduledLesson } from "./ScheduledLesson";
import {getLessons} from '../api/lessons';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';


export function Schedule() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
    
    
    return (
        <div className="pt-4 mt-5 d-flex flex-column justify-content-center">
            <SectionName title="SCHEDULE A CLASS" className="mt-5"/>
            <ScheduleForm />
            <SectionName title="SCHEDULED" className="mt-5"/>
            {loading && <Spinner animation="grow" variant="secondary" />}
            {error && <Alert variant='danger'>{error}</Alert>}
            <ScheduledLesson lessondata={data} />
        </div>
    )
}