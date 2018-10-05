import React from 'react'
import './Courses.css'

class Courses extends React.Component {
  state = { input: '' }

  handleInput = event => {
    this.setState({ input: event.target.value })
  }

  handleSubmit = event => {
    this.addCourse(this.state.input)
    event.preventDefault()
  }

  addCourse = courseCode => {
    const queryString = `https://data.uio.no/studies/v1/course/${courseCode}/semester/18h`
    window.fetch(queryString)
      .then(response => {
        if (response.status === 200) {
          console.log('Course added')
          this.props.addCourse(courseCode)
          this.setState({ input: '' })
        } else {
          this.props.showError()
          console.log('Error. Either the course does not exist, or the API is not responding')
        }
      })
  }
  render () {
    const myCourses = this.props.courses.map((element, index) => courseItem(element.name, index, this.props.deleteCourse))
    return (
      <div className='courses-container'>
        <h3>My courses</h3>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Add new course' />
          <input type='submit' value='Submit' />
        </form>
        <ul>{myCourses}</ul>
      </div>
    )
  }
}

const courseItem = (courseCode, key, deleteCourse) => {
  return (
    <li key={key}>
      {courseCode}
      <button onClick={() => deleteCourse(courseCode)}>DELETE</button>
    </li>
  )
}

export default Courses
