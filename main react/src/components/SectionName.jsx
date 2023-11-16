import { css } from '@emotion/css';
import PropTypes from 'prop-types';

export function SectionName({ title, className }) {
  return (
    <div className={`${className} mb-3`}>
      <h3
        className={css`
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0;
        `}
      >
        {title}
      </h3>
      <hr data-content="AND" className="hr-text d-none" />
    </div>
  );
}

SectionName.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
