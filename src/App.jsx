import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import { nanoid } from 'nanoid'
import Task from './Components/Task'

function App() {
  const [doList , setDoList] = React.useState([])
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
              e.target.value = ''
      }
      }else{
          return
      }
  }
  React.useEffect(()=>{
    let counter = 0
    doList.map((t)=> {
      t.completed ? setCount(counter = counter + 1 ) : counter
    })
    console.log(count)
  },[onChange])
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

  const tasks =  doList.map(tsk=> {
    return (
        <Task doTask = {tsk.task} completed = {tsk.completed} key={tsk.id} id = {tsk.id} change = {onChange} />
    )
})

  return (
    <>
    <Header/>
    <Main keyHandler= {keyHandler} counter = {doList.length - count}>
      {tasks}
    </Main>
    </>
  )
}

export default App
