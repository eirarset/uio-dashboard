import React from 'react'
import './Schedule.css'
import Day from './Day'

class Schedule extends React.Component {
  filterByDay = day => {
    const lecturesDay = [...this.props.lectures.filter(lecture => lecture.startTime.getDay() === day)]
    return lecturesDay
  }

  componentDidUpdate () {
    // console.log(this.props)
  }

  render () {
    let mondayLectures = []
    let tuesdayLectures = []
    let wednesdayLectures = []
    let thursdayLectures = []
    let fridayLectures = []

    mondayLectures = this.filterByDay(1)
    tuesdayLectures = this.filterByDay(2)
    wednesdayLectures = this.filterByDay(3)
    thursdayLectures = this.filterByDay(4)
    fridayLectures = this.filterByDay(5)

    let mondayTemp = null
    let tuesdayTemp = null
    let wednesdayTemp = null
    let thursdayTemp = null
    let fridayTemp = null

    if (this.props && this.props.weather) {
      const mondayTemps = this.props.weather.filter(element => element.time.getDay() === 1)
      mondayTemp = mondayTemps[0] && Math.round(mondayTemps[0].temp)
      const tuesdayTemps = this.props.weather.filter(element => element.time.getDay() === 2)
      tuesdayTemp = tuesdayTemps[0] && Math.round(tuesdayTemps[0].temp)
      const wednesdayTemps = this.props.weather.filter(element => element.time.getDay() === 3)
      wednesdayTemp = wednesdayTemps[0] && Math.round(wednesdayTemps[0].temp)
      const thursdayTemps = this.props.weather.filter(element => element.time.getDay() === 4)
      thursdayTemp = thursdayTemps[0] && Math.round(thursdayTemps[0].temp)
      const fridayTemps = this.props.weather.filter(element => element.time.getDay() === 5)
      fridayTemp = fridayTemps[0] && Math.round(fridayTemps[0].temp)
    }
    return (
      <div className='schedule'>
        <div className='schedule-header-container'>
          <h1 className='schedule-header'>Schedule & Weather</h1>
        </div>
        <div className='days-container'>
          <Day title='Monday' lectures={mondayLectures} temp={mondayTemp} />
          <Day title='Tuesday' lectures={tuesdayLectures} temp={tuesdayTemp} />
          <Day title='Wednesday' lectures={wednesdayLectures} temp={wednesdayTemp} />
          <Day title='Thursday' lectures={thursdayLectures} temp={thursdayTemp} />
          <Day title='Friday' lectures={fridayLectures} temp={fridayTemp} />
        </div>
      </div>
    )
  }
}

export default Schedule
