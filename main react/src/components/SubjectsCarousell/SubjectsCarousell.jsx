import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './styles/SubjectsCarousell.css';
import { getSubjects, getTeachersFromSubject } from '../../api/subjects.js';
import { Alert, Col, Container, Image, Row } from 'react-bootstrap';
import { SectionName } from '../SectionName.jsx';
import { useNavigate } from 'react-router-dom';
import avatar from '../../img/avatar.png';
import { Loading } from '../../animation/Loading.jsx';

function SubjectsCarousell() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loadCards, setLoadCards] = useState(false);
  const [errorCards, setErrorCards] = useState('');
  const cardsRef = useRef(null);

  async function LoadSubjects() {
    setLoadCards(true);
    setErrorCards('');
    try {
      const response = await getSubjects();
      const data = await Promise.all(
        response.data
          .filter((subject) => subject.teachers.length)
          .map((subject) => getTeachersFromSubject(subject.id)),
      );
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorCards(error);
    } finally {
      setLoadCards(false);
    }
  }

  function handleSchedule(e) {
    const scheduleid = e.target.dataset.scheduleid;
    if (scheduleid) navigate(`/schedule?${scheduleid}`);
  }

  useEffect(() => {
    LoadSubjects();
  }, []);

  return (
    <div className="home-content d-flex flex-column pt-1nav bg-nexus-white min-vh-100">
      <Container fluid="xxl">
        <Row className="g-2">
          <Col>
            <SectionName title="Teachers" className="mt-5" />
          </Col>
        </Row>
        <Row className="g-2">
          <Col>
            <div className="d-flex justify-content-between">
              <p className="fs-6 fw-light">
                <span className="text-secondary">{`${cardsRef?.current?.children?.length} teachers available`}</span>
              </p>
              <p className="fs-6 fw-light">
                <span className="text-secondary">Category</span>: All{' '}
                <i className="bi bi-chevron-down ms-2"></i>
              </p>
            </div>
            {loadCards && <Loading />}
            {errorCards && <Alert variant="danger">{errorCards}</Alert>}
          </Col>
        </Row>
        <Row
          xs={1}
          sm={1}
          md={2}
          lg={2}
          xl={3}
          xxl={4}
          className="g-2"
          ref={cardsRef}
        >
          {data &&
            data.map((subject) =>
              subject.data.map((data, idx) => (
                <TeacherCard
                  name={data.teacher.name}
                  lastname={data.teacher.lastname}
                  points={data.teacher.points}
                  subjectname={data.subject.subjectname}
                  photo={data.teacher.profilePhoto}
                  scheduleid={`teacherId=${data.teacherId}&subjectId=${data.subjectId}`}
                  handler={handleSchedule}
                  key={idx}
                />
              )),
            )}
        </Row>
      </Container>
    </div>
  );
}

export default SubjectsCarousell;

function TeacherCard({
  name,
  lastname,
  subjectname,
  points,
  photo,
  handler,
  scheduleid,
}) {
  return (
    <Col>
      <div className="bg-white p-3 rounded-1 d-flex flex-column row-gap-3 border">
        <div className="d-flex column-gap-3">
          <div className="col">
            {photo ? (
              <>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${[photo]}`}
                  className="object-fit-cover rounded-1"
                  height={'134'}
                  width={'100%'}
                />
              </>
            ) : (
              <>
                <Image
                  src={avatar}
                  className="object-fit-cover rounded-1"
                  height={'134'}
                  width={'100%'}
                />
                <div>{photo}</div>
              </>
            )}
          </div>
          <div className="d-flex flex-column justify-content-between col text-end">
            <div className="card-title fs-6">{`${name} ${lastname}`}</div>
            <div>
              <h6 className="fw-normal">
                {subjectname}
                <i className="bi bi-book  ms-1"></i>
              </h6>
              <h6 className="fw-normal">
                {points}
                <i className="bi bi-star ms-1"></i>
              </h6>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex column-gap-3 mt-2">
            <div className="d-grid col">
              <button
                onClick={handler}
                type="button"
                className="btn btn-nexus-accent-subtle"
                data-scheduleid={scheduleid}
              >
                Schedule
              </button>
            </div>
            <div className="d-grid col">
              <button type="button" className="border btn btn-none">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

TeacherCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  photo: PropTypes.string,
  handler: PropTypes.func.isRequired,
  subjectname: PropTypes.string.isRequired,
  scheduleid: PropTypes.string.isRequired,
};
