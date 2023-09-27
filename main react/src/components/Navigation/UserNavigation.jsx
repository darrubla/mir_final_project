import { Col, Dropdown, Nav } from 'react-bootstrap';
import { DropdownItemCustom, DropdownToggleCustom } from './DropdownCustom';
import PropTypes from 'prop-types';

export function UserNavigation({ handleSignOut, email }) {
  return (
    <>
      <Nav className="justify-content-between align-items-center">
        <Dropdown>
          <DropdownToggleCustom>
            <i className="bi bi-circle-fill text-nexus-gray-500"></i>
            <span className="ms-2">{email}</span>
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
