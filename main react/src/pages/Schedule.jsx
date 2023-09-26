import { useEffect, useState} from 'react';
import { SectionName } from "../components/SectionName";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduledLesson } from "./ScheduledLesson";
import {cancelClass, createLesson, getMyLessons} from '../api/lessons';
import Alert from 'react-bootstrap/Alert';
import { LoadSubjectsList } from '../text/constants';
import { Loading } from '../animation/Loading';

export function Schedule() {

    const [data, setData] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [errorLoad, setErrorLoad] = useState('');
    const [errorCreate, setErrorCreate] = useState('');
    const [errorCancel, setErrorCancel] = useState('');
    async function onCreate(payload) {
        setLoadingCreate(true);
        setErrorCreate('');
        try {
            console.log(payload)
            await createLesson(payload)
            loadLessons()
        } catch (error) {
            setErrorCreate(error)
            console.log(error);
        } finally {
            setLoadingCreate(false)
        }
    }
    async function onCancel(id) {
        try {
            await cancelClass(id)
            loadLessons()
        } catch (error) {
            setErrorCancel(error)
        }
        
    }
    async function loadLessons() {
        setLoadingList(true);
        setErrorLoad('');
        try {
            const response = await getMyLessons();
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
                {loadingCreate && <Loading />}
                {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}
                <SectionName title="SCHEDULED" className="mt-5"/>
                {loadingList && <Loading />}
                {errorLoad && <Alert variant='danger'>{errorLoad}</Alert>}
                <ScheduledLesson lessondata={data} onCancel={onCancel} errorCancel={errorCancel}/>
                {errorLoad && <Alert variant='danger'>{errorCancel}</Alert>}
            </div>
        )
    }
    
}