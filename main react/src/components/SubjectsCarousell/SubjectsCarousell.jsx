import {subjects} from '../../mocks/subjects.js'
import CoursesList from '../CoursesList/CoursesList'

import "./styles/SubjectsCarousell.css"

function SubjectsCarousell() {

  const renderRecentSubjects = () => {
    if (subjects.length > 0) {
      return <CoursesList title="Recents" subjects={subjects}/>
    }
    return null
  }

  const renderMostVotedSubjects = () => {
    if (subjects.length > 0) {
      return <CoursesList title="Most Voted" subjects={subjects}/>
    }
    return null
  }

  return (
    <div className="home-content d-flex flex-column">
      {renderRecentSubjects()}
      {renderMostVotedSubjects()}
    </div>
  )
}

export default SubjectsCarousell
