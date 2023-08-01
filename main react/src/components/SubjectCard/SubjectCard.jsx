import React from 'react'
import PropTypes from 'prop-types'

import './SubjectCard.css'

function SubjectCard({name, image, profileImg, subject, rating}) {
  return (
    <article class="course-card">
      <div class="course-card-header">
        <img src={profileImg} alt="teacher profile picture" />
        <div class="course-card-header__text">
          <h4>{name}</h4>
          <span>{subject}</span>
          <p>
            {rating} <span><i class="bi bi-trophy-fill"></i></span>
          </p>
        </div>
      </div>
      <img src={image} alt="course-card picture" />
    </article>
  )
}

SubjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

export default SubjectCard
