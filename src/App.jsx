import React, { useCallback } from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import { nanoid } from 'nanoid'
import Task from './Components/Task'

export const ThemeContext = React.createContext(null)

function App() {
  const [doList , setDoList] = React.useState([])
  const [filteredTasks , setFilteredTasks] = React.useState([])
  const [theme , setTheme] = React.useState(window.localStorage.getItem('theme') || 'light')
  const [count , setCount] = React.useState(0)

//  React.useEffect(() => {
//     window.localStorage.setItem('count', count);
//   }, [count]);

  React.useEffect(()=>{
    const storedData = JSON.parse(window.localStorage.getItem('Tasks'))
    if(storedData){
      setFilteredTasks(storedData)
    }
  } , [])
  // React.useEffect(()=>{
  //   localStorage.setItem('Tasks' , JSON.stringify(doList) )
  // }, [doList])

  //add the local storage in the final adding selection and then checked for the remaining

  const themeToggle = ()=>{
       window.localStorage.setItem('theme' , theme === 'light' ? 'dark' : 'light')
       setTheme(window.localStorage.getItem('theme'))
  }

  React.useEffect(()=>{
      document.body.style.backgroundColor = theme === 'dark' ?  'hsl(235, 21%, 11%)' : 'hsl(0, 0%, 98%)'
  }, [theme])

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
              window.localStorage.setItem('Tasks' , JSON.stringify([...filteredTasks, tasks]))
              e.target.value = ''
      }
      }else{
          return
      }
  }

  // function sortTasks(filteredArray){
  //   const sortedTasks = filteredArray.sort((a, b) => Number(a.completed) - Number(b.completed));
  // }
  React.useEffect(()=>{
    let counter = 0;
    filteredTasks.map((t)=> {
      t.completed ? counter = counter + 1 : counter
    })
    setCount(counter)
  }, [filteredTasks])


  
  function onChange(event){
    const checkedBox = JSON.parse(localStorage.getItem('Tasks')).map((tsks) => {
      if(event.target.id === tsks.id){
        return {
          ...tsks,
          [event.target.name]: event.target.checked
        }
      }
      return tsks
    })
    setDoList(checkedBox)
    setFilteredTasks(checkedBox)
    // JSON.stringify(localStorage.setItem('Tasks' , [...JSON.parse(localStorage.getItem('Tasks')),  checkedBox]))
    // JSON.stringify(localStorage.setItem('Tasks' , checkedBox))
    window.localStorage.setItem('Tasks' , JSON.stringify(checkedBox))
  }
  function deleteHandling(id){
    const lS = JSON.parse(localStorage.getItem("Tasks"));
    const indexOfObject = lS.findIndex(object => {
      return object.id === id;
  });
  lS.splice(indexOfObject, 1);
  localStorage.setItem('Tasks', JSON.stringify(lS));
  setFilteredTasks(lS)
  }
  function completedTasks(){
    // let index;
    // const lS = JSON.parse(localStorage.getItem("Tasks"));
    // for(let i = 0 ; i < lS.length ; i++){
    //   if(lS[i].completed){
    //     index = i;
    //     break;
    //   }
    // }
    // setDoList(doList.filter((detletedTasks) => !detletedTasks.completed))
    // setFilteredTasks(doList.filter((detletedTasks) => !detletedTasks.completed ))
    localStorage.setItem('Tasks' , JSON.stringify(filteredTasks.filter((deletedTasks) => !deletedTasks.completed)))
    setFilteredTasks(filteredTasks.filter((deletedTasks) => !deletedTasks.completed))

  }
  
  function taskFilter(event){
    if(event.target.textContent == 'All'){
      const allItems = JSON.parse(localStorage.getItem('Tasks'))

      setFilteredTasks(allItems)
    }else if (event.target.textContent == "Active"){
      const activeTasks = JSON.parse(localStorage.getItem('Tasks')).filter(tsk => !tsk.completed)

      setFilteredTasks(activeTasks)
    }else if(event.target.textContent == 'Completed'){
      const completedTasks = JSON.parse(localStorage.getItem('Tasks')).filter(tsk => tsk.completed)
      setFilteredTasks(completedTasks)
    }
  }

  const allTasks =filteredTasks.map(tsk=> {
    return (
        <Task  onDelete = {deleteHandling} doTask = {tsk.task} completed = {tsk.completed} key={tsk.id} id = {tsk.id} change = {onChange} />
    )
})

  return (
    <ThemeContext.Provider value={{theme , themeToggle}}>
      <div id={theme}>
        <Header /> 
        <Main theme = {theme} toggleTheme = {themeToggle} completion = {completedTasks} keyHandler= {keyHandler} counter = {filteredTasks.length - count} sort = {taskFilter}>
          {allTasks}
        </Main>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
