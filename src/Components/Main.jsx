import React from 'react'
import lightTheme from '../Assests/icon-sun.svg'
import darkTheme from '../Assests/icon-moon.svg'


function Main(props) {
  return (
    <main>
    <div className="container">
        <div className='title'>
            <h1>TODO</h1>
            <img onClick={props.toggleTheme} src={props.theme === 'dark' ? lightTheme : darkTheme} alt="" className='theme'/>
        </div>
        <div className='input'>
        <input onKeyDown={props.keyHandler} type="text" placeholder='Create a new todo' className='input-field' />
        </div>
        <div className="tasks-container">
            {props.children}
    <div className='task-option'>
        <div> {`${props.counter} items left`}</div>
        <div className='complete-task'>
            <div onClick={props.sort} className = "comp-tsks active " >All</div>
            <div onClick={props.sort} className = 'comp-tsks '>Active</div>
            <div onClick={props.sort} className = 'comp-tsks '>Completed</div>
        </div>
        <div onClick={props.completion} className='completed'>Clear Completed</div>
    </div>
        </div>
        <div className="completed-options">
                <div onClick={props.sort} className = "active">All</div>
                <div onClick={props.sort}>Active</div>
                <div onClick={props.sort}>Completed</div>
        </div>
    </div>
    <div className='drag'>Drag and drop to reorder list</div>
    </main>
    
  )
}

export default Main