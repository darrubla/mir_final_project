import { useParams } from 'react-router-dom'
import { getTeacher } from '../api/teachers';
import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export function TeacherView() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function loadTeacher({ id }) {
        setLoading(true);
        setError('');
        try {
            const response = await getTeacher({ id });
            setData(response.data);
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
            {loading && <Spinner animation="grow" variant="secondary" />}
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className="d-flex personal-info">{data.name}</div>
        </>
        
    )
}