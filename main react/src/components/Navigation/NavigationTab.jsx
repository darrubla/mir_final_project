import { css, cx } from '@emotion/css'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

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
  )
}

NavigationTab.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
