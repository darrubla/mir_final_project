import React, { useEffect, useState } from 'react'
import { SectionName } from '../components/SectionName'
import { getAvailableLessons } from '../api/lessons';
import { AvailableLessons } from '../components/AvailableLessons';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';



export default function TeacherHome() {
    const [data, setData] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [errorLoad, setErrorLoad] = useState('');

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
    useEffect(()=> {
        loadAvailableLessons();
    }, []);
    console.log(data);
        return (
            <div className='d-flex flex-row justify-content-evenly'>
                <div className='d-flex flex-column'>
                    <SectionName title="AVAILABLE CLASSES" className="mt-5"/>
                    {loadingList && <Loading />}
                    {errorLoad && <Alert variant='danger'>{errorLoad}</Alert>}
                    <AvailableLessons lessondata={data}/>
                </div>
                <div className='d-flex flex-column'>
                    <SectionName title="ACEPTED CLASSES" className="mt-5"/>
                </div>
            </div>
          )
  
}
