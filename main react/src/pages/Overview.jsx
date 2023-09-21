import { useEffect, useState} from 'react';
import { SectionName } from '../components/SectionName';
import { getMe } from '../api/teachers';
import { Alert } from 'react-bootstrap';
import { Loading } from '../animation/Loading';

export function Overview() {

    const [teacherInfo, setTeacherInfo] = useState([]);
    const [loadTData, setLoadTData] = useState(false);
    const [errorLoadT, setErrorLoadT] = useState('');

    async function loadMyInfo() {
        setLoadTData(true);
        setErrorLoadT('');
        try {
            const response=await getMe();
            setTeacherInfo(response.data)
            console.log()
        } catch (error) {
            setErrorLoadT(error)
        } finally {
            setLoadTData(false)
        }
    }
    useEffect(()=> {
        loadMyInfo();
    }, []);


    return (
        <>
            <div className="pt-4 mt-3 d-flex flex-column justify-content-center">
                <SectionName title="MY INFO" className="mt-5"/>
                {loadTData && <Loading />}
                {errorLoadT&& <Alert variant='danger'>{errorLoadT}</Alert>}
                <div className='d-flex teacher-overview-name'>
                {
                    teacherInfo.name
                }
                </div>
                <div className='d-flex teacher-overview-name'>
                {
                    teacherInfo.email
                }
                </div>
            </div>
        </>
    )
}