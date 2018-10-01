import React from 'react'
import Schedule from './Schedule.js'
import Courses from './Courses.js'
import './App.css'
import { varsel } from './oslovarsel.js'

class App extends React.Component {
  state = { courses: [], lectures: [] }

  addCourse = courseCode => this.setState(state => {
    if (state.courses.some(course => course === courseCode)) {
      return state
    }
    return { ...state, courses: [...state.courses, { name: courseCode, loaded: false }] }
  })

  componentDidUpdate () {
    // console.log(this.state)
    this.loadCourses()
  }

  componentDidMount () {

  }

  loadCourses = () => {
    // Determin the first and last day of the current week
    const start = new Date()
    start.setDate(start.getDate() - start.getDay() + 1)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 4)
    end.setHours(23, 59, 59, 59)

    this.state.courses.forEach(course => {
      const queryString = `https://data.uio.no/studies/v1/course/${course.name}/semester/18h/schedule?section=FOR`
      if (!course.loaded) {
        window.fetch(queryString) // window added to silence eslint
          .then(res => res.json())
          .then(result => {
            const lectures = result.events.filter(lecture => lecture.dtStart && new Date(lecture.dtStart) > start && new Date(lecture.dtStart) < end)
            const simplifiedLectures = lectures.map(lecture => {
              return { courseCode: course.name, startTime: new Date(lecture.dtStart), endTime: new Date(lecture.dtEnd) }
            })
            this.setState((state, props) => {
              const newCourses = state.courses.filter(element => element.name !== course.name)
              newCourses.push({ name: course.name, loaded: true, lectures: simplifiedLectures })
              return { ...state, courses: newCourses }
            })
          },
          error => {
            console.log(error)
          })
      }
    })
  }

  render () {
    const lectures = [...this.state.courses.map(course => course.lectures).flat().filter(element => element)] // Filter added to fix bug. Somehow undefined shows up in the state elsewise
    const weather = varsel.list.map(element => { return { time: new Date(element.dt * 1000), temp: element.main.temp, icon: element.weather[0].icon } })
    const weatherAfter11 = weather.filter(element => element.time.getHours() >= 11)
    return (
      <div className='App'>
        <Schedule lectures={lectures} weather={weatherAfter11} />
        <Courses addCourse={this.addCourse} />
      </div>
    )
  }
}

export default App
