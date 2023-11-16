import { Dropdown, Nav } from 'react-bootstrap';
import { DropdownItemCustom, DropdownToggleCustom } from './DropdownCustom';
import PropTypes from 'prop-types';
import avatar from '../../img/avatar.png';
import { useNavigate } from 'react-router-dom';

export function UserNavigation({ handleSignOut, email, photo = 'null' }) {
  const navigate = useNavigate();
  if (photo.endsWith('null')) {
    photo = avatar;
  }
  return (
    <>
      <Nav className="justify-content-between align-items-center">
        <Dropdown>
          <DropdownToggleCustom>
            {/*
            <i className="bi bi-circle-fill text-nexus-gray-500"></i>*/}
            <div className="p-2 d-flex align-items-center">
              <img
                src={photo}
                className="d-flex rounded-circle object-fit-cover"
                width={28}
                height={28}
              />
              <span className="d-flex align-items-center ms-2">{email}</span>
            </div>
          </DropdownToggleCustom>
          <Dropdown.Menu>
            <DropdownItemCustom onClick={() => navigate('/profile')}>
              Profile
            </DropdownItemCustom>
            <DropdownItemCustom onClick={() => navigate('/settings')}>
              Settings
            </DropdownItemCustom>
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
  photo: PropTypes.string,
};
