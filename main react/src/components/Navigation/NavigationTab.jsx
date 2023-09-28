import { css, cx } from '@emotion/css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export function NavigationTab({ route, title }) {
  return (
    <NavLink
      className={cx(
        css`
          display: inline;
          font-size: 1.125rem;
          &.active {
            border-bottom: 1px solid var(--bs-secondary);
          }
        `,
        'nav-link fw-light text-opacity-100'
      )}
      to={route}
    >
      {title}
    </NavLink>
  );
}

NavigationTab.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
