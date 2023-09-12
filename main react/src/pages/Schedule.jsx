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
    const [loadingList, setLoadingList] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [errorLoad, setErrorLoad] = useState('');
    const [errorCreate, setErrorCreate] = useState('');

    async function onCreate(payload) {
        setLoadingCreate(true);
        setErrorCreate('');
        try {
            console.log(payload)
            await createLesson(payload)
            loadLessons()
        } catch (error) {
            setErrorCreate(error)
        } finally {
            setLoadingCreate(false)
        }
        
    }
    async function loadLessons() {
        setLoadingList(true);
        setErrorLoad('');
        try {
            const response = await getLessons();
            setData(response.data);
        } catch (error) {
            setErrorLoad(error)
        } finally {
            setLoadingList(false)
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
        return (
            <div className="pt-4 mt-5 d-flex flex-column justify-content-center">
                <SectionName title="SCHEDULE A CLASS" className="mt-5"/>
                <ScheduleForm onCreate={onCreate} options={options}/>
                {loadingCreate && <Spinner animation="grow" variant="secondary" />}
                {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}
                <SectionName title="SCHEDULED" className="mt-5"/>
                {loadingList && <Spinner animation="grow" variant="secondary" />}
                {errorLoad && <Alert variant='danger'>{errorLoad}</Alert>}
                <ScheduledLesson lessondata={data} />
            </div>
        )
    }
    
}