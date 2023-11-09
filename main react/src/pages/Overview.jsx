import { useEffect, useState} from 'react';
import { SectionName } from '../components/SectionName';
import { addSubject, deleteSubject, getMe } from '../api/teachers';
import { Alert } from 'react-bootstrap';
import { Loading } from '../animation/Loading';
import { LoadSubjectsList } from '../text/constants';
import { AddSubject } from '../components/AddSubject';
import { DeleteSubject } from '../components/DeleteSubject';

export function Overview() {

    const [teacher, setTeacher] = useState();
    const [loadTData, setLoadTData] = useState(false);
    const [errorLoadT, setErrorLoadT] = useState('');
    const [loadAddSub, setLoadAddSub] = useState(false);
    const [errorAddSub, setErrorAddSub] = useState('');
    const [loadDelSub, setLoadDelSub] = useState(false);
    const [errorDelSub, setErrorDelSub] = useState('');
    async function onAddSubject(payload) {
        setLoadAddSub(true);
        setErrorAddSub('');
        try {
            await addSubject(payload)
            loadMyInfo()
        } catch (error) {
            setErrorAddSub(error)
        } finally {
            setLoadAddSub(false)
        }
    }
    async function onDeleteSubject(payload) {
        setLoadDelSub(true);
        setErrorDelSub('');
        try {
            await deleteSubject(payload)
            loadMyInfo()
        } catch (error) {
            setErrorDelSub(error)
        } finally {
            setLoadDelSub(false)
        }
    }
    async function loadMyInfo() {
        setLoadTData(true);
        setErrorLoadT('');
        try {
            const response=await getMe();
            setTeacher(response.data)
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

    const options = []
    const teacherSubjects=[]

    if (subjectsOptions.length>0) {
        subjectsOptions.map((subjectObject)=> {
            options.push(subjectObject.subjectname)
        })
        if (teacher?.subjects.length>0) {
            teacher.subjects.map((item) => (
                teacherSubjects.push(item.subject.subjectname)
            )
        )}
    }
    
        return (
            <>
                <div className="pt-4 mt-1nav d-flex flex-column justify-content-center">
                    <SectionName title="MY INFO" className="mt-5 mx-5"/>
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
                                teacher?.subjects.length>0 ? (
                                    teacher.subjects.map((item, index) => (
                                        <div className="teacher-subject" key={index}>{item.subject.subjectname}</div>
                                    ))
                                ):(
                                    <div>Please add subjects to your profile to receive request</div>
                                )
                            }
                        </div>
                        <div className='d-flex flex-column teacher-add-subject'>
                            <SectionName title="Add Subjects" className="mt-5"/>

                            <AddSubject onAdd={onAddSubject} 
                                options={options.filter(item =>!teacherSubjects.some(element => element === item))}/>
                            {loadAddSub && <Loading />}
                            {errorAddSub && <Alert variant='danger'>{errorAddSub}</Alert>}
                            {
                                teacherSubjects?.length>0? (
                                    <>
                                        <SectionName title="Delete Subjects" className="mt-5"/>
                                        <DeleteSubject onDelete={onDeleteSubject} options={teacherSubjects}/>
                                        {loadDelSub && <Loading />}
                                        {errorDelSub && <Alert variant='danger'>{errorDelSub}</Alert>}
                                    </>
                                        
                                ): null
                            }
                        </div>
                    </div>
                </div>
            </>
        )
}
