import React from 'react';
import logo from './logo.svg';
import { BrowserRouter,  Router, Route, Link } from "react-router-dom";
import './App.css';
import HelloMessage from './component/Component'
import Users from './component/Users';
import $ from 'jquery';

$(document).ready(function() {
  $(document).delegate('.open', 'click', function(event){
    $(this).addClass('oppenned');
    event.stopPropagation();
  })
  $(document).delegate('body', 'click', function(event) {
    $('.open').removeClass('oppenned');
  })
  $(document).delegate('.cls', 'click', function(event){
    $('.open').removeClass('oppenned');
    event.stopPropagation();
  });
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <div  class="open">
        <span class="cls"></span>
          <span>
        <ul class="sub-menu ">
              
              <Header/>

            </ul>
        </span>
        <span class="cls"></span>
      </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
       
       
          <Route exact path="/" component={Home} ></Route>
          <Route exact path="/users" component={Users} ></Route>
              
          </BrowserRouter>
      </header>
    
    </div>

   
    
   
	
  );
}


function Home() {
  return <h2>Home</h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  );
} 

export default App;
