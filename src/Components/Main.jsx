import React from 'react'
import lightTheme from '../Assests/icon-sun.svg'

function Main(props) {
    
  return (
    <main>
    <div className="container">
        <div className='title'>
            <h1>TODO</h1>
            <img src={lightTheme} alt="" className='theme'/>
        </div>
        <div className='input'>
        <input onKeyDown={props.keyHandler} type="text" placeholder='Create a new todo' className='input-field' />
        </div>
        <div className="tasks-container">
    {props.children}
    <div className='task-option'>
        <div> {`${props.counter} items left`}</div>
        <div className='complete-task'>
            <div>All</div>
            <div>Active</div>
            <div>Completed</div>
        </div>
        <div className='completed'>Clear Completed</div>
    </div>
        </div>
        <div className="completed-options">
                <div>All</div>
                <div>Active</div>
                <div>Completed</div>
        </div>
    </div>
    </main>
    
  )
}

export default Main