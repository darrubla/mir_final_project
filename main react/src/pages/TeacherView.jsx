import { useParams} from 'react-router-dom'
import { getTeacher } from '../api/teachers';
import { useEffect, useState} from 'react';
import { Alert, Badge, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Loading } from '../animation/Loading';
import avatar from "../img/avatar.png";
import { formatRelative } from 'date-fns';
import Table from 'react-bootstrap/Table'

export function TeacherView() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function loadTeacher({ id }) {
        setLoading(true);
        setError('');
        try {
            const response = await getTeacher({ id });
            setTeacher(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
        loadTeacher({ id });
        }
    }, [id]);

    return (
        <>
            {loading && <Loading/>}
            {error && <Alert variant='danger'>{error}</Alert>}
            {teacher && (
                <main className="pt-2nav bg-nexus-white">
                    <Container fluid="xxl">
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {teacher?.profilePhoto ? (
                                <Image 
                                    src={`${`${import.meta.env.VITE_API_URL}/${teacher.profilePhoto}`}`} 
                                    width={200}
                                    className='mg-fluid'/>
                            ): (
                                <Image 
                                    src={avatar} 
                                    width={200}
                                    className='mg-fluid'/>
                            )}
                            <p className="fs-3 fw-light p-0 m-0">{`${teacher.name} ${teacher.lastname}`}</p>
                            <p className="fs-4 fw-light p-0 m-0">{`${teacher.bio}`}</p>
                            <p className="fs-1 fw-light p-0 m-0">{`${((new Date()).getFullYear())-((new Date(teacher.joined)).getFullYear())+teacher.age }`}</p>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Joined At</p>
                                        </td>
                                        <td>
                                            {formatRelative(
                                                new Date(teacher.joined),
                                                new Date()
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Points</p>
                                        </td>
                                        <td>
                                            {`${teacher.points} points`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Email</p>
                                        </td>
                                        <td>
                                            {`${teacher.email}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Subjects</p>
                                        </td>
                                        <td>
                                            <div className='d-flex'>
                                                {
                                                    teacher.subjects.map((item, index) => (
                                                        <h5 key={index} className='me-2'>
                                                            <Badge bg="secondary" >
                                                                {`${index+1} - ${item.subject.subjectname}`}
                                                            </Badge>
                                                        </h5>
                                                        
                                                    ))
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </main>
            )}
        </>    
    )
}
