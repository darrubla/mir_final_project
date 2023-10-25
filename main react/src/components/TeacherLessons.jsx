import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { formatRelative } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import avatar from "../img/avatar.png";

export function TeacherLessons({lessondata, onCancel}) {
    const navigate = useNavigate();

    function displayStudent(id) {
        navigate(`/students/${id}`);
    }
    if (lessondata.length>0) {
        return (
            <Accordion defaultActiveKey="0">
                {lessondata.map((lesson, key)=>(
                    <Accordion.Item eventKey={key} key= {key}>
                        <Accordion.Header>
                            <div className='d-flex flex-column px-5 py-2 justify-content-center'>
                                <div className='d-flex'>
                                    {`${lesson?.subject.subjectname}`}
                                </div>
                                <div className='d-flex'>
                                    <p  className=" d-flex text-muted fw-lighter m-0">{formatRelative(new Date(lesson.scheduledAt), new Date())}</p>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className='d-flex flex-column scheduled-lesson-data'>
                                <div className="d-flex flex-row lesson-content-photo justify-content-between">
                                    <div className='d-flex lesson-info flex-column flex-grow-1 px-5'>
                                        <div className='f-flex subject-topic'>
                                            <div className='d-flex lesson-subject'>
                                                <p className="fw-semibold">{lesson?.subject.subjectname}</p>
                                            </div>
                                            <div className='d-flex lesson-description'>
                                                <p className="fw-light">{lesson?.description}</p>
                                            </div>
                                        </div>
                                        <div className='f-flex flex-column datetime-location'>
                                            <div className='d-flex flex-row date-time-info justify-content-between'>
                                                <div className='d-flex date-title'>
                                                    <p className="fw-semibold">DATE</p>
                                                </div>
                                                <div className='d-flex lesson-date'>
                                                    <p className="fw-light">
                                                        {formatRelative(new Date(lesson?.scheduledAt), new Date())}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row location-info justify-content-between'>
                                                <div className='d-flex location-title'>
                                                    <p className="fw-semibold">LOCATION</p>
                                                </div>
                                                <div className='d-flex lesson-site'>
                                                    <p className="fw-light">{lesson?.site}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column picture-status justify-content-between px-3'>
                                        <div className='d-flex justify-content-center picture-student'>
                                            <Col className='d-flex justify-content-center'>
                                                {lesson?.studentId && lesson?.student.profilePhoto ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/${lesson.student.profilePhoto}`}
                                                        className="d-flex rounded-circle object-fit-cover"
                                                        width={100}
                                                        height={100}
                                                        onClick={() => displayStudent(lesson?.studentId)}
                                                    />
                                                ): (
                                                    <Image 
                                                        src={avatar} 
                                                        width={100} 
                                                        height={100} 
                                                        className='rounded-circle object-fit-cover' 
                                                        onClick={() => displayStudent(lesson?.studentId)}/>
                                                )}
                                            </Col>
                                        </div>
                                        <div className='d-flex justify-content-center lesson-status'>
                                            <p className="fw-semibold text-muted fs-6 fw-bolder text-uppercase">{lesson.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row cancel-button justify-content-center">
                                <Button variant="danger" className="d-flex m-2 px-5 rounded-5" onClick={() => onCancel(lesson?.id)}>
                                    Cancel
                                </Button>
                                </div>
                            </div>
                            
                            
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        )
    }
}

TeacherLessons.propTypes = {
    lessondata: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
}
