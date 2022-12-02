import React from 'react'
import crossImage from '../Assests/icon-cross.svg'
import '../App.css'

export default function Task(props) {
  return (
    <div className='tasks'>
        <div className='to-do-tasks'>
        <input onClick={props.change} type="checkbox" id={props.id}  name= "completed" defaultChecked = {props.completed}/>
        <label htmlFor={props.id}>{props.doTask}</label>
        </div>
        <img src={crossImage} alt="" />
    </div>

  )
}
