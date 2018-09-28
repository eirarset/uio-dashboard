import React from 'react'

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
          this.setState({ input: '' })
        } else {
          console.log('Error')
        }
      })
  }
  render () {
    return (
      <div>
        <h3>My courses</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type='text' value={this.state.input} onChange={this.handleInput} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default Courses
