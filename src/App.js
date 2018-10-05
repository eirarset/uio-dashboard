import React from 'react'
import Schedule from './Schedule.js'
import Courses from './Courses.js'
import './App.css'

class App extends React.Component {
  state = { courses: [], lectures: [], weather: {}, showError: false, errorMessage: '' }

  addCourse = courseCode => {
    let localCourses = window.localStorage.getItem('courses')
    localCourses = localCourses ? JSON.parse(localCourses) : []
    if (!localCourses.some(course => course === courseCode)) {
      localCourses.push(courseCode)
      window.localStorage.setItem('courses', JSON.stringify(localCourses))
    }
    this.setState(state => {
      if (state.courses.some(course => course === courseCode)) {
        return state
      }
      return { ...state, courses: [...state.courses, { name: courseCode, loaded: false }] }
    })
  }

  componentDidUpdate () {
    this.loadCourses()
  }

  componentDidMount () {
    this.loadWeather()
    this.loadFromLocal()
  }

  loadFromLocal = () => {
    const local = window.localStorage
    const courses = local.courses ? JSON.parse(local.courses).map(course => { return { name: course, loaded: false } }) : []
    this.setState({ courses })
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
            this.showError(`Could not fetch the schedule for ${course.name}`)
            console.log(error)
          })
      }
    })
  }

  loadWeather = () => {
    window.fetch('http://api.openweathermap.org/data/2.5/forecast?id=6453366&appid=5ffaf6a778d75b51da77663452180105&units=metric')
      .then(response => response.json())
      .then(text => {
        this.setState({ ...this.state, weather: text })
      }, error => {
        this.showError('Could not fetch the weather')
        console.log(error)
      })
  }

  showError = (errorMessage) => {
    this.setState({ ...this.state, showError: true, errorMessage })
    window.setTimeout(() => this.setState({ ...this.state, showError: false }), 5000)
  }

  deleteCourse = (courseCode) => {
    let localCourses = window.localStorage.getItem('courses')
    localCourses = localCourses ? JSON.parse(localCourses).filter(course => course !== courseCode) : []
    window.localStorage.setItem('courses', JSON.stringify(localCourses))

    this.setState((state, props) => {
      const courses = state.courses.filter(course => course.name !== courseCode)
      return { ...state, courses }
    })
  }

  render () {
    const lectures = [...this.state.courses.map(course => course.lectures).flat().filter(element => element)] // Filter added to fix bug. Somehow undefined shows up in the state elsewise
    const weather = this.state.weather.list
      ? this.state.weather.list.map(element => {
        return { time: new Date(element.dt * 1000), temp: element.main.temp, icon: element.weather[0].icon }
      })
      : []
    const weatherAfter11 = weather.filter(element => element.time.getHours() >= 11)
    const error = this.state.showError
    return (
      <div className='App'>
        {error && <div className='error-box'>Something went wrong: {this.state.errorMessage}</div>}
        <Schedule lectures={lectures} weather={weatherAfter11} />
        <Courses addCourse={this.addCourse} courses={this.state.courses} showError={this.showError} deleteCourse={this.deleteCourse} />
      </div>
    )
  }
}

export default App
