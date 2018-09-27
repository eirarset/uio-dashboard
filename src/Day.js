import React from 'react'
import './Day.css'

const Day = () => {
  return (
    <div className='day-card'>
      <div className='day-header-container'>
        <h3>Day</h3>
      </div>
      <div className='time-slots-container'>
        <Timeslot />
        <Timeslot />
        <Timeslot />
      </div>
    </div>
  )
}

const Timeslot = () => {
  return (
    <div className='time-slot'>
      This is a time slot
    </div>
  )
}

export default Day
