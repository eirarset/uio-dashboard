import React from 'react'
import './Day.css'

const Day = (props) => {
  const lectures = props.lectures.map((element, index) => <Timeslot info={element} key={index} />)
  return (
    <div className='day-card'>
      <div className='day-header-container'>
        <h3>Day</h3>
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
      <br />
      This is a time slot
    </div>
  )
}

export default Day
