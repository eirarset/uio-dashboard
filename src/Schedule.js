import React from 'react'
import './Schedule.css'
import Day from './Day'

class Schedule extends React.Component {
  state = { courses: [
    { name: 'IN5140', loaded: false },
    { name: 'IN5320', loaded: false },
    { name: 'INF3110', loaded: false },
    { name: 'IN1900', loaded: false },
    { name: 'IN1000', loaded: false },
    { name: 'IN1020', loaded: false }
  ] }

  componentDidMount () {
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
              return { startTime: new Date(lecture.dtStart), endTime: new Date(lecture.dtEnd) }
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

  componentDidUpdate () {
    console.log(this.state)
  }

  filterByDay = (day) => {
    const lecturesDay = []
    this.state.courses.forEach(course => {
      course.lectures.filter(lecture => lecture.startTime.getDay() === day)
        .forEach(lecture => lecturesDay.push({ course: course.name, startTime: lecture.startTime, endTime: lecture.endTime }))
    })
    return lecturesDay
  }

  render () {
    let mondayLectures = []
    let tuesdayLectures = []
    let wednesdayLectures = []
    let thursdayLectures = []
    let fridayLectures = []
    if (this.state.courses.every(course => course.loaded)) {
      mondayLectures = this.filterByDay(1)
      tuesdayLectures = this.filterByDay(2)
      wednesdayLectures = this.filterByDay(3)
      thursdayLectures = this.filterByDay(4)
      fridayLectures = this.filterByDay(5)
    }
    return (
      <div className='schedule'>
        <div className='schedule-header-container'>
          <h1 className='schedule-header'>Schedule</h1>
        </div>
        <div className='days-container'>
          <Day title='Monday' lectures={mondayLectures} />
          <Day title='Tuesday' lectures={tuesdayLectures} />
          <Day title='Wednesday' lectures={wednesdayLectures} />
          <Day title='Thursday' lectures={thursdayLectures} />
          <Day title='Friday' lectures={fridayLectures} />
        </div>
      </div>
    )
  }
}

export default Schedule
