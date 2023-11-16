import { useEffect, useState } from 'react';
import { SectionName } from '../components/SectionName';
import { addSubject, deleteSubject, getMe } from '../api/teachers';
import { Alert, Col, Container, Row } from 'react-bootstrap';
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
      await addSubject(payload);
      loadMyInfo();
    } catch (error) {
      setErrorAddSub(error);
      console.log(error);
    } finally {
      setLoadAddSub(false);
    }
  }
  async function onDeleteSubject(payload) {
    setLoadDelSub(true);
    setErrorDelSub('');
    try {
      await deleteSubject(payload);
      loadMyInfo();
    } catch (error) {
      setErrorDelSub(error);
      console.log(error);
    } finally {
      setLoadDelSub(false);
    }
  }
  async function loadMyInfo() {
    setLoadTData(true);
    setErrorLoadT('');
    try {
      const response = await getMe();
      setTeacher(response.data);
    } catch (error) {
      setErrorLoadT(error);
      console.log(error);
    } finally {
      setLoadTData(false);
    }
  }
  useEffect(() => {
    loadMyInfo();
  }, []);

  const subjectsOptions = LoadSubjectsList();

  const options = [];
  const teacherSubjects = [];

  if (subjectsOptions.length > 0) {
    subjectsOptions.map((subjectObject) => {
      options.push(subjectObject.subjectname);
    });
    if (teacher?.subjects.length > 0) {
      teacher.subjects.map((item) =>
        teacherSubjects.push(item.subject.subjectname),
      );
    }
  }

  return (
    <Container fluid="xxl">
      <div className="pt-4 mt-1nav d-flex flex-column justify-content-center">
        <Row>
          <SectionName title="Profile" />
          {loadTData && <Loading />}
          {errorLoadT && <Alert variant="danger">{errorLoadT}</Alert>}

          <Col>
            <div className="d-flex flex-column teacher-basic-info">
              <div className="p-3 bg-white border rounded-1">
                <SectionName title="Personal information" />
                <img
                  className="mb-2 rounded-4 border object-fit-cover"
                  width={150}
                  height={150}
                  src={teacher?.profilePhoto}
                />
                <div>Name: {`${teacher?.name} ${teacher?.lastname}`}</div>
                <div>Age: {`${teacher?.age}`}</div>
                <div>Email: {`${teacher?.email}`}</div>
                <div>Points: {`${teacher?.points}`}</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column teacher-subjects p-3 bg-white border rounded-1">
              <SectionName title="Active Subjects" />
              {teacher?.subjects.length > 0 ? (
                teacher.subjects.map((item, index) => (
                  <div
                    className="teacher-subject rounded-1 p-2 border"
                    key={index}
                  >
                    • {item.subject.subjectname}
                  </div>
                ))
              ) : (
                <div>
                  Please add subjects to your profile to receive requests
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column teacher-add-subject">
              <AddSubject
                onAdd={onAddSubject}
                options={options.filter(
                  (item) =>
                    !teacherSubjects.some((element) => element === item),
                )}
              />
              {loadAddSub && <Loading />}
              {errorAddSub && <Alert variant="danger">{errorAddSub}</Alert>}
              {teacherSubjects?.length > 0 ? (
                <>
                  <DeleteSubject
                    onDelete={onDeleteSubject}
                    options={teacherSubjects}
                  />
                  {loadDelSub && <Loading />}
                  {errorDelSub && <Alert variant="danger">{errorDelSub}</Alert>}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
