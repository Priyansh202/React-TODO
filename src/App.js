import Header from "./MyComponents/Header";
import {Footer} from "./MyComponents/Footer";
import {Todos} from "./MyComponents/Todos";
import About from "./MyComponents/About";
import AddTodo from "./MyComponents/AddTodo";
import React, { useState } from 'react';
import  {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  let initTodo
  if(localStorage.getItem('todos')===null)
  {
    initTodo= [];

  }
  else{
     initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("delete", todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo =(title,desc)=>{
    console.log("adding",title);
    let sno;
    if(todos.length==0){
      sno=0;
    }
    else{
     sno=todos[todos.length-1].sno+1;
    }
    const mytodo={
      sno:sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,mytodo]);
console.log(mytodo)



  }
  

  const [todos, setTodos] = useState(initTodo );
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
   
  },[todos])
  return (
  <>
  <Router>
 <Header title="My todo" searchBar={false}/>
 <Switch>
          <Route path="/about">
            <About />
          </Route>
        
        
          <Route exact path="/" render={()=>{
            return(
              <>
              <Todos todos={todos} onDelete={onDelete}/>
 <AddTodo addTodo={addTodo}/>
 </>)
          }}>
          
          </Route>
        </Switch>
 <Footer/>
 
 </Router>
  </>
  );
}

export default App;
