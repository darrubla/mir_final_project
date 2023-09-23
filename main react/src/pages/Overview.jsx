import { useEffect, useState} from 'react';
import { SectionName } from '../components/SectionName';
import { addSubject, getMe } from '../api/teachers';
import { Alert } from 'react-bootstrap';
import { Loading } from '../animation/Loading';
import { LoadSubjectsList } from '../text/constants';
import { AddSubject } from '../components/AddSubject';

export function Overview() {

    const [teacher, setTeacher] = useState();
    const [loadTData, setLoadTData] = useState(false);
    const [errorLoadT, setErrorLoadT] = useState('');
    const [loadAddSub, setLoadAddSub] = useState(false);
    const [errorAddSub, setErrorAddSub] = useState('');

    async function onAddSubject(payload) {
        setLoadAddSub(true);
        setErrorAddSub('');
        try {
            console.log(payload)
            await addSubject(payload)
            loadMyInfo()
        } catch (error) {
            setErrorAddSub(error)
        } finally {
            setLoadAddSub(false)
        }
    }
    async function loadMyInfo() {
        setLoadTData(true);
        setErrorLoadT('');
        try {
            const response=await getMe();
            setTeacher(response.data)
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

    const subjectsOptions=LoadSubjectsList();

    if (subjectsOptions.length>0) { // Renderizo la página Overview, cuando obtenga la lista de materias
        const options = []
        subjectsOptions.map((subjectObject)=> {
            options.push(subjectObject.subjectname)
        })
        return (
            <>
                <div className="pt-4 mt-3 d-flex flex-column justify-content-center">
                    <SectionName title="MY INFO" className="mt-5"/>
                    {loadTData && <Loading />}
                    {errorLoadT&& <Alert variant='danger'>{errorLoadT}</Alert>}
                    <div className='teacher-info-container d-flex flex-row justify-content-around'>
                        <div className='d-flex flex-column teacher-basic-info'>
                            <SectionName title="BASIC INFO" className="mt-5"/>
                            <div>
                                {`${teacher?.name} ${teacher?.lastname}, ${teacher?.age}`}
                            </div>
                        </div>
                        <div className='d-flex flex-column teacher-subjects'>
                            <SectionName title="SUBJECTS" className="mt-5"/>
                            {
                                teacher?.subjects.length > 0 ? (
                                    teacher.subjects.map((item, index) => (
                                    <div className="teacher-subject" key={index}>{item.subject.subjectname}</div>
                                    ))
                                ) : (
                                <div>Please add subjects to your profile to receive request</div>
                                )
                            }
                        </div>
                        <div className='d-flex flex-column teacher-add-subject'>
                            <AddSubject onAdd={onAddSubject} options={options}/>
                            {loadAddSub && <Loading />}
                            {errorAddSub && <Alert variant='danger'>{errorAddSub}</Alert>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}