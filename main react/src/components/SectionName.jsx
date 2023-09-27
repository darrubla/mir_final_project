import PropTypes from 'prop-types';

export function SectionName({ title, className }) {
  return (
    <div className={`${className} mb-4`}>
      <h3 className="fw-light">{title}</h3>
      <hr data-content="AND" className="hr-text" />
    </div>
  );
}

SectionName.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
