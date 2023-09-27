import { css, cx } from '@emotion/css';
import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function DropdownItemCustom({ children, onClick }) {
  return (
    <Dropdown.Item
      className={css`
        &:active {
          background: var(--bs-nexus-accent);
        }
      `}
      onClick={onClick}
    >
      {children}
    </Dropdown.Item>
  );
}

DropdownItemCustom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export function DropdownToggleCustom({ children }) {
  return (
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      {children}
    </Dropdown.Toggle>
  );
}

DropdownToggleCustom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    className={cx(
      css`
        font-size: 1.125rem;
        color: var(--bs-nav-link-color);
      `,
      'text-decoration-none fw-light'
    )}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

CustomToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

CustomToggle.displayName = 'CustomToggle';
