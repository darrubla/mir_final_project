import React from 'react'
import PropTypes from 'prop-types'

import SubjectCard from '../SubjectCard/SubjectCard'

function CoursesList({title, subjects}) {
  const renderCards = () => {
    if (subjects.length) {
      return subjects.map((subject) => {
        const {name, image, profileImg, subject: subjectName, rating} = subject
        return <SubjectCard
          key={name}
          name={name}
          image={image}
          profileImg={profileImg}
          rating={rating}
          subject={subjectName}
          />
      })
    }
    return null
  }

  return (
    <div className="courses-list__section">
      <div className="mb-4">
        <h6 className="text-uppercase">{title}</h6>
        <hr data-content="AND" className="hr-text" />
      </div>
      <ul className="courses-list">
        {renderCards()}
      </ul>
    </div>
  )
}

CoursesList.propTypes = {
  title: PropTypes.string.isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
}

export default CoursesList
