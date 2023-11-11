import { useParams} from 'react-router-dom'
import { getStudent } from '../api/students';
import { useEffect, useState} from 'react';
import { Alert, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Loading } from '../animation/Loading';
import avatar from "../img/avatar.png";
import { formatRelative } from 'date-fns';
import Table from 'react-bootstrap/Table'

export function StudentView() {
    const { id } = useParams();
    const [student, setStudent] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function loadStudent({ id }) {
        setLoading(true);
        setError('');
        try {
            const response = await getStudent({ id });
            setStudent(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
        loadStudent({ id });
        }
    }, [id]);

    return (
        <>
            {loading && <Loading/>}
            {error && <Alert variant='danger'>{error}</Alert>}
            {student && (
                <main className="pt-2nav bg-nexus-white">
                    <Container fluid="xxl">
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {student?.profilePhoto ? (
                                <Image 
                                    src={`${`${import.meta.env.VITE_API_URL}/${student.profilePhoto}`}`} 
                                    width={200}
                                    className='mg-fluid'/>
                            ): (
                                <Image 
                                    src={avatar} 
                                    width={200}
                                    className='mg-fluid'/>
                            )}
                            <p className="fs-3 fw-light p-0 m-0">{`${student.name} ${student.lastname}`}</p>
                            <p className="fs-4 fw-light p-0 m-0">{`${student.bio}`}</p>
                            <p className="fs-1 fw-light p-0 m-0">{`${((new Date()).getFullYear())-((new Date(student.joined)).getFullYear())+student.age }`}</p>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Joined At</p>
                                        </td>
                                        <td>
                                            {formatRelative(
                                                new Date(student.joined),
                                                new Date()
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Email</p>
                                        </td>
                                        <td>
                                            {`${student.email}`}
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
