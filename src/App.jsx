import React, { useCallback } from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import { nanoid } from 'nanoid'
import Task from './Components/Task'

function App() {
  const [doList , setDoList] = React.useState([])
  const [filteredTasks , setFilteredTasks] = React.useState([])
  const [count , setCount] = React.useState(0)

  function keyHandler(e) {
      if(e.target.value !== ''){
          if(e.keyCode === 13){
              const tasks = {
                  id : nanoid(),
                  task : e.target.value,
                  completed: false
              }
              setDoList(prev => [...prev, tasks])
              setFilteredTasks(prev => [...prev , tasks])
              e.target.value = ''
      }
      }else{
          return
      }
  }
  React.useEffect(()=>{
    let counter = 0
    doList.map((t)=> {
      t.completed ? counter = counter + 1 : counter
    })
    setCount(counter)
  })

  function onChange(event){
    const checkedBox = doList.map((tsks) => {
      if(event.target.id === tsks.id){
        return {
          ...tsks,
          [event.target.name]: event.target.checked
        }
      }
      return tsks
    })
    setDoList(checkedBox)
  }
  function deleteHandling(id){
    setDoList(doList.filter((detletedTasks) => detletedTasks.id != id ))
    setFilteredTasks(doList.filter((detletedTasks) => detletedTasks.id != id ))
  }

  function taskFilter(event){
    if(event.target.textContent == 'All'){
      setFilteredTasks(doList)
    }else if (event.target.textContent == "Active"){
      const activeTasks = doList.filter(tsk => !tsk.completed)
      setFilteredTasks(activeTasks)
    }else if(event.target.textContent == 'Completed'){
      const completedTasks = doList.filter(tsk => tsk.completed)
      setFilteredTasks(completedTasks)
    }
  }

  const allTasks =filteredTasks.map(tsk=> {
    return (
        <Task onDelete = {deleteHandling} doTask = {tsk.task} completed = {tsk.completed} key={tsk.id} id = {tsk.id} change = {onChange} />
    )
})

  return (
    <>
    <Header/>
    <Main keyHandler= {keyHandler} counter = {doList.length - count} sort = {taskFilter}>
      {allTasks}
    </Main>
    </>
  )
}

export default App
