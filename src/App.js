import React from 'react'
import Schedule from './Schedule.js'
import Courses from './Courses.js'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Schedule />
        <Courses />
      </div>
    )
  }
}

export default App
