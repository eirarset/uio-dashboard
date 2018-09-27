import React from 'react'
import './Schedule.css'
import Day from './Day'

const Schedule = () => {
  return (
    <div className='schedule'>
      <div className='schedule-header-container'>
        <h1 className='schedule-header'>Schedule</h1>
      </div>
      <div className='days-container'>
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
    </div>
  )
}

export default Schedule
