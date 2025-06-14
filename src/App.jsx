import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
  const [showFinished,setShowFinished]=useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const togglefinished=(e) => {
    setShowFinished(!showFinished);
  }
  

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo);
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }
  

  return (
    <>
    <Navbar/>
    <div className="container mx-3 md:mx-auto my-5 rounded-x1 bg-violet-100 p-5 min-h-[80vh] md:w-30%">
    <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Add A Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" className=' bg-white w-full rounded-full px-5 py-1'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disable:bg-ciolet-700 text-white text-sm mx-2 p-2 py-1 font-bold rounded-full'>SAVE</button>
        </div>
      </div>
      <input className="my-4" id="show" onChange={togglefinished} type="checkbox" checked={showFinished}/>
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className="h-[1px] bg-black opacity-15 w-9/10 my-2 mx-auto"></div>
      <h1 className='text-2xl font-bold'>Your Todos</h1>
      <div className="todos">
        {todos.length===0&& <div className='m-5 font-bold'>No Todos today</div>}
        {todos.map(item=>{
        return(showFinished||!item.isCompleted) &&  <div key={item.id} className="todo flex  justify-between my-3 text-lg">
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons gap-1 flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white p-2 text-sm font-bold py-1 rounded-md mx-1'><FaEdit /></button>
            <button  onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white p-2 text-sm font-bold py-1 rounded-md mx-1'><MdDelete /></button>
          </div>
        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
