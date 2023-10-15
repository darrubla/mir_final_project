import React, { useEffect, useState } from 'react'
import { SectionName } from '../components/SectionName'
import { assignClass, cancelClassByTeacher, getAvailableLessons, getMyLessons } from '../api/lessons';
import { AvailableLessons } from '../components/AvailableLessons';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';
import { TeacherLessons } from '../components/TeacherLessons';



export default function TeacherHome() {
    const [data, setData] = useState([]);
    const [myLessons, setMyLessons] = useState([]);
    const [loadingAvailable, setLoadingAvailable] = useState(false);
    const [loadingMyLessons, setLoadingMyLessons] = useState(false);
    const [accepting, setAccepting] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [errorAccepting, setErrorAccepting] = useState('');
    const [errorCanceling, setErrorCanceling] = useState('');
    const [errorLoadAv, setErrorLoadAv] = useState('');
    const [errorLoadMine, setErrorLoadMine] = useState('');

    async function loadAvailableLessons() {
        setLoadingAvailable(true);
        setErrorLoadAv('');
        try {
            const response = await getAvailableLessons();
            setData(response.data);
        } catch (error) {
            console.log(error.status)
            setErrorLoadAv(error)
        } finally {
            setLoadingAvailable(false)
        }
    }
    async function onCancel(id) {
        setCanceling(true);
        setErrorCanceling('');
        try {
            await cancelClassByTeacher(id)
        } catch (error) {
            setErrorCanceling(error)
        } finally {
            setCanceling(false)
            loadAvailableLessons()
            loadMyLessons()
        }
    }
    async function loadMyLessons() {
        setLoadingMyLessons(true);
        setErrorLoadMine('');
        try {
            const response = await getMyLessons();
            setMyLessons(response.data);
        } catch (error) {
            setErrorLoadMine(error)
        } finally {
            setLoadingMyLessons(false)
        }
    }

    async function onAccept(id) {
        setAccepting(true);
        setErrorAccepting('');
        try {
            await assignClass(id)
        } catch (error) {
            setErrorAccepting(error)
        } finally {
            setAccepting(false)
            loadAvailableLessons()
            loadMyLessons();
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
                    {loadingAvailable && <Loading />}
                    {accepting && <Loading />}
                    { data.length>0 ? (
                        <AvailableLessons lessondata={data} onAccept={onAccept}/>
                    ) : (
                        <Alert variant='danger'>{`No available classes yet`}</Alert>
                    )
                    }
                    {errorAccepting && <Alert variant='danger'>{errorAccepting}</Alert>}
                    {errorLoadAv && <Alert variant='danger'>{errorLoadAv}</Alert>}
                    
                </div>
                <div className='d-flex flex-column'>
                    <SectionName title="ACEPTED CLASSES" className="mt-5"/>
                    {loadingMyLessons && <Loading />}
                    {canceling && <Loading />}
                    { myLessons.length>0 ? (
                        <TeacherLessons lessondata={myLessons} onCancel={onCancel}/>
                    ) : (
                        <Alert variant='danger'>{`You don't have scheduled classes yet`}</Alert>
                    )
                    }
                    {errorCanceling && <Alert variant='danger'>{errorCanceling}</Alert>}
                    {errorLoadMine && <Alert variant='danger'>{errorLoadMine}</Alert>}
                </div>
            </div>
          )
  
}
