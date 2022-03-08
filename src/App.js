/* eslint-disable jsx-a11y/no-redundant-roles */
import React, {useState} from "react";
import {nanoid} from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {

  // ====== sets up the state for the component to keep track of variables using {useState}
  // ====== useState returns a variable 'tasks' and then a function that is used to update that variable 'setTasks'
  // ====== Here we want to keep track of tasks that are passed via the property tasks typed in our component. This is
  // ====== an array of objects with the properties - 'id', 'name', 'completed'
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: false}; // assigns a unique id using 'nanoid'
    setTasks([...tasks, newTask]); // copies tasklist and adds our new task at the end of the array and sets it to 'tasks'
  }

  // ====== this function is ran when a checkbox is toggled on or off. In order to sync that state between the browser and our code,
  // ====== we need to iterate through all the tasks, and find the checkbox that has had the onChange event fired. That will be the id argument passed
  // ====== into this function. If we compare that with each iterations id in the tasklist named 'tasks', we need to use object spread syntax to make a new
  // ====== object whose 'completed' prop has been inverted and return it (add it to the updatedTasks array created by the map function). If the current
  // ====== iteration of tasks id doesn't match, then just add that to the updatedTasks array. At the end of the function, lets make sure we update our
  // ====== tasks with our new updatedTasks array
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose 'completed' prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // ====== this function is ran when the delete button of the task is clicked. We filter through all the tasks that don't match the current id because,
  // ====== the current id is the task that is wanting to be deleted. Everything else is filtered into a new array and that new array is passed into setTasks
  // ====== to update our tasks
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  // ====== for every task object in our tasks property, we are going to map or 'do something' for each one.
  // ====== A Todo component will be created and each property will be populated using the current task's properties
  // ====== We need to make a special key property as a unique identifier for indexing purposes. An id is usually suitable for this
  const taskList = tasks.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}               // this is used as a special prop to index / order by React and cannot be used for any other purpose
      toggleTaskCompleted={toggleTaskCompleted} // we include this so we can access it inside the Todo component and attach it to an event handler
      deleteTask={deleteTask} // we include this so we can access it inside the Todo component and attach it to an event handler
    />
  ));


  // ====== changes num of tasks heading to reflect number of tasks in tasklist ======
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  // ====== returns an app component, which houses our entire app for index.js
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
