import React, { useEffect, useState } from 'react'
import { SectionName } from '../components/SectionName'
import { assignClass, cancelClass, getAvailableLessons, getMyLessons } from '../api/lessons';
import { AvailableLessons } from '../components/AvailableLessons';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';
import { TeacherLessons } from '../components/TeacherLessons';



export default function TeacherHome() {
    const [data, setData] = useState([]);
    const [myLessons, setMyLessons] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [action, setAction] = useState(false);
    const [errorLoad, setErrorLoad] = useState('');
    const [errorAction, setErrorAction] = useState('');

    async function loadAvailableLessons() {
        setLoadingList(true);
        setErrorLoad('');
        try {
            const response = await getAvailableLessons();
            setData(response.data);
        } catch (error) {
            setErrorLoad(error)
        } finally {
            setLoadingList(false)
        }
    }
    async function onCancel(id) {
        setAction(true);
        setErrorAction('');
        try {
            await cancelClass(id)
            loadAvailableLessons()
            loadMyLessons()
        } catch (error) {
            setErrorAction(error)
        } finally {
            setAction(false)
        }
    }
    async function loadMyLessons() {
        setLoadingList(true);
        setErrorLoad('');
        try {
            const response = await getMyLessons();
            setMyLessons(response.data);
        } catch (error) {
            setErrorLoad(error)
        } finally {
            setLoadingList(false)
        }
    }
    async function onAccept(id) {
        setAction(true);
        setErrorAction('');
        try {
            await assignClass(id)
            loadAvailableLessons()
            loadMyLessons()
        } catch (error) {
            setErrorAction(error)
        } finally {
            setAction(false)
        }
        
    }
    useEffect(()=> {
        loadAvailableLessons();
        loadMyLessons();
    }, []);
        return (
            <div className='d-flex flex-row justify-content-evenly'>
                <div className='d-flex flex-column'>
                    <SectionName title="AVAILABLE CLASSES" className="mt-5"/>
                    {loadingList && <Loading />}
                    {action && <Loading />}
                    {errorAction && <Alert variant='danger'>{errorAction}</Alert>}
                    {errorLoad && <Alert variant='danger'>{errorLoad}</Alert>}
                    <AvailableLessons lessondata={data} onAccept={onAccept}/>
                </div>
                <div className='d-flex flex-column'>
                    <SectionName title="ACEPTED CLASSES" className="mt-5"/>
                    {loadingList && <Loading />}
                    {action && <Loading />}
                    <TeacherLessons lessondata={myLessons} onCancel={onCancel}/>
                    {errorAction && <Alert variant='danger'>{errorAction}</Alert>}
                    {errorLoad && <Alert variant='danger'>{errorLoad}</Alert>}
                </div>
            </div>
          )
  
}
