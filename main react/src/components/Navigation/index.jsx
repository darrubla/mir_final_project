import { useContext, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { css, cx } from '@emotion/css'

import UserContext from '../../containers/UserContext'
import { UserNavigation } from './UserNavigation'
import { rswitch } from '../../utils/rswitch'
import { NavigationTab } from './NavigationTab'
import { ModalAlert } from '../ModalAlert'
import { clearSession } from '../../api/session'
import { NLogo } from '../../assets/icons/NLogo'

export function Navigation() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const [show, setShow] = useState(false)
  const [logType, setLogType] = useState()

  function onSignOut() {
    clearSession()
    setUser(null)
    navigate('/')
  }

  function onLog(val) {
    setUser({ type: val })
    setShow(false)
    navigate(`${logType}/${val}`)
  }

  function handleShow(logT) {
    setShow(true)
    setLogType(logT)
  }

  function handleClose() {
    setShow(false)
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant={user?.email ? 'light' : 'dark'}
        fixed='top'
        className={cx(
          css`
            padding-top: 48px;
            padding-bottom: 3px;
          `,
          user?.email && 'bg-nexus-white border-bottom border-secondary-subtle',
        )}
      >
        <Container fluid='xxl'>
          <Navbar.Brand>
            <NLogo />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls='responsive-navbar-nav'
            className='border-white'
          />
          <Navbar.Collapse id='responsive-navbar-nav fw-light fs-5'>
            <Nav className='ms-auto w-50 justify-content-between'>
              <NavigationTab route='home' title='Home' />
              {rswitch(
                { user },
                {
                  student: <NavigationTab route='schedule' title='Schedule' />,
                  teacher: (
                    <>
                      <NavigationTab route='bank' title='Bank' />
                      <NavigationTab route='overview' title='Overview' />
                    </>
                  ),
                  default: <NavigationTab route='about' title='About' />,
                },
              )}
              <NavigationTab route='Explore' title='Explore' />

              {user?.email ? (
                <UserNavigation handleSignOut={onSignOut} email={user.email} />
              ) : (
                <Button
                  variant='outline-nexus-accent'
                  className='border-2 px-5'
                  onClick={() => handleShow('signin')}
                >
                  Log In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalAlert handleClose={handleClose} show={show} onLog={onLog} />
    </>
  )
}
