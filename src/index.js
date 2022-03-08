import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true},
  { id: "todo-1", name: "Sleep", completed: false},
  { id: "todo-2", name: "Repeat", completed: false},
];

// ====== this is the entry point for the react app. We initialize our app component within the ReactDOM.render() method's first parameter, followed
// ====== by a root element that is depicted in index.html as 'root'
ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA}/>
  </React.StrictMode>,
  document.getElementById('root')
);
