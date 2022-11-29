import React from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import { nanoid } from 'nanoid'

function App() {
  const [doList , setDoList] = React.useState([])
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
  function onChange(e){
    doList.map((tasks) => {
      if(e.target.id === tasks.id){
        setDoList(prev => {
          return{
            ...prev,
            completed : e.target.checked
          }
        })
      } 
    })
  }
  console.log(doList)

  return (
    <>
    <Header/>
    <Main onChange= {onChange} doList = {doList} keyHandler= {keyHandler}/>
    </>
  )
}

export default App
