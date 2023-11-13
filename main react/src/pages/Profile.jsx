import { css, cx } from '@emotion/css';
import { useContext, useEffect, useState } from 'react'
import UserContext from '../containers/UserContext';
import { getMyself } from '../api/students';
import { getMe } from '../api/teachers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Alert, Badge, Button, Container, Form, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../img/avatar.png';
import AuthContext from '../containers/AuthContext';
import ModalEditInfo from './ModalEditInfo';
import { Loading } from '../animation/Loading';
import { formatRelative } from 'date-fns';

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

  return (
    <>
      {info && <Loading/>}
      {errorMyInfo && <Alert variant='danger'>{errorMyInfo}</Alert>}
      {info && 
        (
          <div className='pt-1nav bg-nexus-white d-flex flex-row justify-content-md-center'>
            <div className='d-flex flex-column'>
              <div className='d-flex px-5 justify-content-center'>
                {info?.profilePhoto ? (
                  <Image 
                    src={`${`${import.meta.env.VITE_API_URL}/${info.profilePhoto}`}`} 
                    width={350}
                    className='mg-fluid'/>
                ): (
                  <Image 
                    src={avatar} 
                    width={350}
                    className='mg-fluid'/>
                )}
              </div>
              <div className='d-flex px-5'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Name</p>
                      </td>
                      <td>
                        <p className='text-capitalize text-start fs-5 fw-light mb-0 ms-4'>{`${info.name} ${info.lastname}`}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Age</p>
                      </td>
                      <td>
                        <p className='text-capitalize text-start fs-5 fw-light mb-0 ms-4'>{`${((new Date()).getFullYear())-((new Date(info.joined)).getFullYear())+info.age} ages`}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Bio</p>
                      </td>
                      <td>
                        <p className='text-wrap text-capitalize text-start fs-5 fw-light text-wrap mb-0 ms-4'>{`${info.bio}`}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Email</p>
                      </td>
                      <td>
                        <p className='text-lowercase text-start fs-5 fw-light text-wrap mb-0 ms-4'>{`${info.email}`}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Joined</p>
                      </td>
                      <td>
                        <p className='text-lowercase text-start fs-5 fw-light text-wrap mb-0 ms-4'>
                          {formatRelative(
                            new Date(info.joined),
                            new Date()
                          )}
                        </p>
                      </td>
                    </tr>
                    {
                      info.subjects ? (
                      <tr>
                        <td>
                          <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Subjects</p>
                        </td>
                        <td>
                          <div className='d-flex ms-4'>
                          {
                            info.subjects.map((item, index) => (
                              <h5 key={index} className=' mb-0 me-1'>
                                  <Badge bg='primary'>
                                      {`${index+1} - ${item.subject.subjectname}`}
                                  </Badge>
                              </h5>
                              
                            ))
                          }
                          </div>
                        </td>
                      </tr>
                      ): null
                    }
                    {
                      info.points ? (
                      <tr>
                        <td>
                          <p className='text-uppercase text-start fs-4 fw-semibold mb-0'>Points</p>
                        </td>
                        <td>
                          <div className='d-flex mb-0 ms-4'>
                            {`${info.points}`}
                          </div>
                        </td>
                      </tr>
                      ): null
                    }
                  </tbody>
                </table>
              </div>
            <div className='d-flex justify-content-center'>
              <Button
                className={cx(
                  css`
                    height: 58px;
                  `,
                  'fs-6',
                )}
                variant="outline-dark"
                size="lg"
                onClick={handleShow}
              >
                Edit my info
              </Button>
            </div>
            </div>
          </div>
        )}
        {showEdit &&
          <>
            <ModalEditInfo 
              userType={user.type}
              handleClose={handleClose}
              name={info?.name}
              lastname={info?.lastname}
              bio={info.bio}
              age={info.age}
              show={showEdit}
              id={info.id}/>
              
          </>
        }
    </>
  )
}

