import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import teacherImage from "../img/teacher.png";
// import avatar from "../img/avatar.png";


export function ScheduledLesson({lessondata}) {
    
    function formatDate(p) {
        let dateVal={}
        dateVal.date=`${(new Date(p)).getFullYear()}-${((new Date(p)).getMonth()+1).toString().padStart(2, '0')}-${((new Date(p)).getDate()).toString().padStart(2, '0')}`
        dateVal.time=`${(new Date(p)).getHours().toString().padStart(2, '0')}:${(new Date(p)).getMinutes().toString().padStart(2, '0')}`
        return (dateVal)
    }

    return (
        <Accordion defaultActiveKey="0">
            {lessondata.map((lesson, key)=>(
                <Accordion.Item eventKey={key} key= {key}>
                    <Accordion.Header>
                        <div className='d-flex flex-column px-5 py-2 justify-content-center'>
                            <div className='d-flex'>
                                {`${lesson.subject}`}
                            </div>
                            <div className='d-flex'>
                                <p className=" d-flex text-muted fw-lighter m-0">{`${formatDate(lesson.scheduledAt).date} ${formatDate(lesson.scheduledAt).time}`}</p>
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className='d-flex flex-column scheduled-lesson-data'>
                            <div className="d-flex flex-row lesson-content-photo justify-content-between">
                                <div className='d-flex lesson-info flex-column flex-grow-1 px-5'>
                                    <div className='f-flex subject-topic'>
                                        <div className='d-flex lesson-subject'>
                                            <p className="fw-semibold">{lesson.subject}</p>
                                        </div>
                                        <div className='d-flex lesson-description'>
                                            <p className="fw-light">{lesson.description}</p>
                                        </div>
                                    </div>
                                    <div className='f-flex flex-column datetime-location'>
                                        <div className='d-flex flex-row date-info justify-content-between'>
                                            <div className='d-flex date-title'>
                                                <p className="fw-semibold">DATE</p>
                                            </div>
                                            <div className='d-flex lesson-date'>
                                                <p className="fw-light">
                                                    {(formatDate(lesson.scheduledAt).date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row time-info justify-content-between'>
                                            <div className='d-flex time-title'>
                                                <p className="fw-semibold">TIME</p>
                                            </div>
                                            <div className='d-flex lesson-time'>
                                                <p className="fw-light">{lesson.scheduledAt}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row location-info justify-content-between'>
                                            <div className='d-flex location-title'>
                                                <p className="fw-semibold">LOCATION</p>
                                            </div>
                                            <div className='d-flex lesson-site'>
                                                <p className="fw-light">{lesson.site}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-column picture-status justify-content-between px-3'>
                                    <div className='d-flex justify-content-center picture-teacher'>
                                        <Col xs={6} md={4} className='d-flex justify-content-center'>
                                            <Image src={`${teacherImage}`} width={100} height={100} roundedCircle />
                                        </Col>
                                    </div>
                                    <div className='d-flex justify-content-center lesson-status'>
                                        <p className="fw-semibold text-muted fs-6 fw-bolder text-uppercase">{lesson.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row cancel-button justify-content-center">
                                <Button variant="danger" className="d-flex m-2 px-5 rounded-5">Cancel</Button>
                            </div>
                        </div>
                        
                        
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

ScheduledLesson.propTypes = {
    lessondata: PropTypes.array.isRequired,
}