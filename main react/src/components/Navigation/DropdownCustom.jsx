import { css } from '@emotion/css';
import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';

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

export function DropdownToggleCustom({ children }) {
  return (
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      {children}
    </Dropdown.Toggle>
  );
}

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

CustomToggle.displayName = 'CustomToggle';
