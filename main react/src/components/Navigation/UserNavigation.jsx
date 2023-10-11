import { Col, Dropdown, Nav } from 'react-bootstrap';
import { DropdownItemCustom, DropdownToggleCustom } from './DropdownCustom';
import PropTypes from 'prop-types';
import avatar from '../../img/avatar.png'

export function UserNavigation({ handleSignOut, email, photo = ''}) {
  if (photo.endsWith("null")) {
    photo=avatar
  } 
  return (
    <>
      <Nav className="justify-content-between align-items-center">
        <Dropdown>
          <DropdownToggleCustom>
            {/*
            <i className="bi bi-circle-fill text-nexus-gray-500"></i>*/}
            <div className="p-2 d-flex">
              <img
                src={photo}
                className="d-flex rounded-circle object-fit-cover"
                width={40}
                height={40}
              />
              <span className="d-flex align-items-center ms-2">{email}</span>
            </div>
            
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
    </>
  );
}

UserNavigation.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
