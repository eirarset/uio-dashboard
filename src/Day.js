import React from 'react'
import './Day.css'

const Day = (props) => {
  const lectures = props.lectures.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1
    } if (a.startTime > b.startTime) {
      return 1
    }
    return 0
  }).map((element, index) => <Timeslot info={element} key={index} />)
  return (
    <div className='day-card'>
      <div className='day-header-container'>
        <h3>{props.title}</h3>
      </div>
      <div className='time-slots-container'>
        {lectures}
      </div>
    </div>
  )
}

const Timeslot = (props) => {
  const startHours = props.info.startTime.getHours().toString()
  const startMinutes = (props.info.startTime.getMinutes() < 10) ? ('0' + props.info.startTime.getMinutes().toString()) : props.info.startTime.getMinutes().toString()
  const endHours = props.info.endTime.getHours().toString()
  const endMinutes = (props.info.endTime.getMinutes() < 10) ? ('0' + props.info.endTime.getMinutes().toString()) : props.info.endTime.getMinutes().toString()
  const time = startHours + ':' + startMinutes + '-' + endHours + ':' + endMinutes
  return (
    <div className='time-slot'>
      <h5>{props.info.course}</h5>
      {time}
    </div>
  )
}

export default Day
