import { useEffect, useState } from 'react';
import { SectionName } from '../components/SectionName';
import { ScheduleForm } from '../components/ScheduleForm';
import { ScheduledLesson } from './ScheduledLesson';
import { cancelClass, createLesson, finishClass, getMyLessons, startClass, closeClass } from '../api/lessons';
import { voteTeacher } from '../api/teachers';
import Alert from 'react-bootstrap/Alert';
import { LoadSubjectsList } from '../text/constants';
import { Loading } from '../animation/Loading';
import { Col, Container, Row } from 'react-bootstrap';

export function Schedule() {
  const [data, setData] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorLoad, setErrorLoad] = useState('');
  const [errorCreate, setErrorCreate] = useState('');
  const [errorCancel, setErrorCancel] = useState('');
  const [errorStart, setErrorStart] = useState('');
  const [errorFinish, setErrorFinish] = useState('');
  const [errorClose, setErrorClose] = useState('');
  const [errorVote, setErrorVote] = useState('');

  async function onCreate(payload) {
    setLoadingCreate(true);
    setErrorCreate('');
    try {
      await createLesson(payload);
      loadLessons();
    } catch (error) {
      setErrorCreate(error);
    } finally {
      setLoadingCreate(false);
    }
  }
  async function onCancel(id) {
    try {
      await cancelClass(id);
      loadLessons();
    } catch (error) {
      setErrorCancel(error);
    }
  }
  async function onStart(id) {
    try {
      await startClass(id);
      loadLessons();
    } catch (error) {
      setErrorStart(error);
    }
  }
  async function onFinish(id) {
    try {
      await finishClass(id);
      loadLessons();
    } catch (error) {
      setErrorFinish(error);
    }
  }
  async function onClose(id) {
    try {
      await closeClass(id);
      loadLessons();
    } catch (error) {
      setErrorClose(error);
    }
  }
  async function onVote(teacherId, lessonId) {
    try {
      await closeClass(lessonId);
      await voteTeacher(teacherId);
      loadLessons();
    } catch (error) {
      setErrorVote(error);
    }
  }
  async function loadLessons() {
    setLoadingList(true);
    setErrorLoad('');
    try {
      const response = await getMyLessons();
      setData(response.data);
    } catch (error) {
      setErrorLoad(error);
    } finally {
      setLoadingList(false);
    }
  }
  useEffect(() => {
    loadLessons();
  }, []);

  const subjectsOptions = LoadSubjectsList();

  if (subjectsOptions.length > 0) {
    // Renderizo la página Schedule, cuando obtenga la lista de materias
    const options = [];
    subjectsOptions.map((subjectObject) => {
      options.push(subjectObject.subjectname);
    });
    return (
      <main className="pt-2nav bg-nexus-white vh-100">
        <Container fluid="xxl">
          <Row>
            <Col>
              <SectionName title="Schedule a class" className="mt-5" />
              <ScheduleForm onCreate={onCreate} options={options} />
              {loadingCreate && <Loading />}
              {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
            </Col>
            <Col>
              <SectionName title="Current Clases" className="mt-5" />
              {loadingList && <Loading />}
              {errorLoad && <Alert variant="danger">{errorLoad}</Alert>}
              <ScheduledLesson
                lessondata={data}
                onCancel={onCancel}
                onFinish={onFinish}
                onStart={onStart}
                onClose={onClose}
                onVote={onVote}
                errorCancel={errorCancel}
              />
              {errorCancel && <Alert variant="danger">{errorCancel}</Alert>}
              {errorStart && <Alert variant="danger">{errorStart}</Alert>}
              {errorFinish && <Alert variant="danger">{errorFinish}</Alert>}
              {errorClose && <Alert variant="danger">{errorClose}</Alert>}
              {errorVote && <Alert variant="danger">{errorVote}</Alert>}
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
