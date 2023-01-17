import React, { useCallback } from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import { nanoid } from 'nanoid'
import Task from './Components/Task'
import { DragDropContext, Draggable , Droppable} from 'react-beautiful-dnd';

export const ThemeContext = React.createContext(null)

function App() {
  const [doList , setDoList] = React.useState([])
  const [filteredTasks , setFilteredTasks] = React.useState([])
  const [theme , setTheme] = React.useState(window.localStorage.getItem('theme') || 'light')
  const [count , setCount] = React.useState(0)

  React.useEffect(()=>{
    const storedData = JSON.parse(window.localStorage.getItem('Tasks'))
    if(storedData){
      setFilteredTasks(storedData)
    }
  } , [])

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
    localStorage.setItem('Tasks' , JSON.stringify(filteredTasks.filter((deletedTasks) => !deletedTasks.completed)))
    setFilteredTasks(filteredTasks.filter((deletedTasks) => !deletedTasks.completed))
  }

  const setActive = (option)=>{
   const completedOptions = document.querySelectorAll('.comp-tsks ') 
   for(let i = 0 ; i < completedOptions.length; i++){
    completedOptions[i].classList.remove('active')
    if(completedOptions[i].innerHTML === option){
      completedOptions[i].classList.add('active')
    }
   }
  }
  
  function taskFilter(event){
    if(event.target.textContent == 'All'){
      const allItems = JSON.parse(localStorage.getItem('Tasks'))
      setFilteredTasks(allItems)
      setActive('All')
      
    }else if (event.target.textContent == "Active"){
      const activeTasks = JSON.parse(localStorage.getItem('Tasks')).filter(tsk => !tsk.completed)
      setFilteredTasks(activeTasks)
      setActive('Active')
    }else if(event.target.textContent == 'Completed'){
      const completedTasks = JSON.parse(localStorage.getItem('Tasks')).filter(tsk => tsk.completed)
      setFilteredTasks(completedTasks)
      setActive('Completed')
    }
  }

function onDragHandle(result){
  if(!result.destination) return
  const tsks = Array.from(filteredTasks)
  const [reordredTsks] = tsks.splice(result.source.index , 1)
  tsks.splice(result.destination.index, 0 , reordredTsks)
  setFilteredTasks(tsks)
  localStorage.setItem('Tasks' , JSON.stringify(tsks))
}
  return (
    <ThemeContext.Provider  value={{theme , themeToggle}}>
      <div id={theme}>
        <Header /> 
         <Main  theme = {theme} toggleTheme = {themeToggle} completion = {completedTasks} keyHandler= {keyHandler} counter = {filteredTasks.length - count} sort = {taskFilter}>
        <DragDropContext onDragEnd={onDragHandle}>
          <Droppable droppableId= {filteredTasks.map((tsk) => tsk.id)}>
            {(provided )=>(
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredTasks.map((tsk , index)=> {
                  return (
                    <Draggable draggableId = {tsk.id}  key={tsk.id} index = {index}>
                      {(provided)=>(
                      <div ref={provided.innerRef} {...provided.dragHandleProps}  {...provided.draggableProps}>
                        <Task 
                        onDelete = {deleteHandling} 
                        doTask = {tsk.task} 
                        completed = {tsk.completed}
                        key = {tsk.id} 
                        id = {tsk.id} 
                        change = {onChange} />
                        </div>
                        )}
                    </Draggable>
                    )
                  })} 
                  {provided.placeholder}
                  </div>
                    )}
          </Droppable>
        </DragDropContext>
                    </Main>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
