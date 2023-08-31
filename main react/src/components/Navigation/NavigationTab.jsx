import { css, cx } from '@emotion/css';
import { NavLink } from 'react-router-dom';

export function NavigationTab({ route, title }) {
  return (
    <NavLink
      className={cx(
        css`
          display: inline;
          &.active {
            border-bottom: 1px solid var(--bs-nexus-gray-500);
          }
        `,
        'nav-link fs-1'
      )}
      to={route}
    >
      {title}
    </NavLink>
  );
}
