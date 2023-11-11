import { css, cx } from '@emotion/css';
import { useContext, useEffect, useState } from 'react'
import UserContext from '../containers/UserContext';
import { getMyself } from '../api/students';
import { getMe } from '../api/teachers';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CustomAreaInput, CustomInput, FormGroup, Label } from '../components/AuthApp/Input';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { signUpTeacher } from '../api/teachers';
import { signUpStudent } from '../api/students';
import AuthContext from '../containers/AuthContext';
import { AuthModal } from '../components/AuthApp/AuthModal';
import { SignUpApp } from '../components/AuthApp/SignUp';
import ModalEditInfo from './ModalEditInfo';

export function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { accountType, setAccountType } = useContext(AuthContext);
  const [loadMyInfo, setLoadMyInfo] = useState(false);
  const [errorMyInfo, setErrorMyInfo] = useState('');
  const [info, setInfo] = useState()
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);
 

  async function loadInfo(type) {
    setLoadMyInfo(true);
    setErrorMyInfo('');
    try {
      if (type === 'student') {
        const response=await getMyself();
        setInfo(response.data)
      }
      if (type === 'teacher') {
        const response=await getMe();
        setInfo(response.data)
      }
    } catch (error) {
        setErrorMyInfo(error)
    } finally {
        setLoadMyInfo(false)
    }
  }
  useEffect(() => {
    if (user) {
      loadInfo(user.type)
    }
  }, [user]);

  /*return (
    <>
            {loadMyInfo && <Loading/>}
            {errorMyInfo && <Alert variant='danger'>{errorMyInfo}</Alert>}
            {info && (
                <main className="pt-2nav bg-nexus-white">
                    <Container fluid="xxl">
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {info?.profilePhoto ? (
                                <Image 
                                    src={`${`${import.meta.env.VITE_API_URL}/${info.profilePhoto}`}`} 
                                    width={200}
                                    className='mg-fluid'/>
                            ): (
                                <Image 
                                    src={avatar} 
                                    width={200}
                                    className='mg-fluid'/>
                            )}
                            <p className="fs-3 fw-light p-0 m-0">{`${info.name} ${info.lastname}`}</p>
                            <p className="fs-4 fw-light p-0 m-0">{`${info.bio}`}</p>
                            <p className="fs-1 fw-light p-0 m-0">{`${((new Date()).getFullYear())-((new Date(info.joined)).getFullYear())+info.age }`}</p>
                            <Table striped hover size="sm" bordered='false'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Joined At</p>
                                        </td>
                                        <td>
                                            {formatRelative(
                                                new Date(info.joined),
                                                new Date()
                                            )}
                                        </td>
                                    </tr>
                                    {info.points && 
                                      <tr>
                                          <td>
                                              <p className="fs-4 fw-light">Points</p>
                                          </td>
                                          <td>
                                              {`${info.points} points`}
                                          </td>
                                      </tr>
                                    }
                                    <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Email</p>
                                        </td>
                                        <td>
                                            {`${info.email}`}
                                        </td>
                                    </tr>
                                    {info.subjects && 
                                      <tr>
                                        <td>
                                            <p className="fs-4 fw-light">Subjects</p>
                                        </td>
                                        <td>
                                          <div className='d-flex'>
                                            {
                                              info.subjects.map((item, index) => (
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
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </main>
            )}
        </>
  )*/
  return (
    <>
    <div className='mt-5 pt-5'>
    </div>
    <div className='mt-3 pt-3'>
    </div>
    <Button
      onClick={handleShow}
    >Edit info</Button>
      {showEdit &&
        <>
          <ModalEditInfo 
            userType={user.type}
            handleClose={handleClose}
            show={showEdit}/>
        </>
      }
    </>
  )
}

