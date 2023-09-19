import { Col, Dropdown, Nav } from 'react-bootstrap'
import { DropdownItemCustom, DropdownToggleCustom } from './DropdownCustom'
import PropTypes from 'prop-types'

export function UserNavigation({ handleSignOut }) {
  return (
    <>
      <Col className='col-6'>
        <Nav className='justify-content-between'>
          <Nav.Link href='#action1' className='text-nexus-gray-500 p-0'>
            <i className='bi bi-bell' />
          </Nav.Link>

          <Nav.Link href='#action1' className='text-nexus-gray-500 p-0'>
            <i className='bi bi-calendar' />
          </Nav.Link>

          <Nav.Link href='#action1' className='text-nexus-gray-500 p-0'>
            <i className='bi bi-chat-square-text' />
          </Nav.Link>

          <Dropdown>
            <DropdownToggleCustom>
              <i className='bi bi-circle-fill text-nexus-gray-500'></i>
            </DropdownToggleCustom>

            <Dropdown.Menu>
              <DropdownItemCustom>Profile</DropdownItemCustom>
              <DropdownItemCustom>Settings</DropdownItemCustom>
              <DropdownItemCustom onClick={handleSignOut}>
                Log Out
              </DropdownItemCustom>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Col>
    </>
  )
}

UserNavigation.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
}
