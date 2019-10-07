import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import './App.css';
import HelloMessage from './component/Component'
import Users from './component/Users';
import Message from './component/Message';
import $ from 'jquery';
import { Navbar, Nav, Button } from 'react-bootstrap'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Asylum</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/users">Utilisateurs</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            <Nav.Link href="/">A propos</Nav.Link>
          </Nav>
          <Nav>
            <img src="logo-new.png" className="App-logo" alt="logo" />
          </Nav>
        </Navbar>

        <Route exact path="/" component={Home} ></Route>
        <Route exact path="/users" component={Users} ></Route>
        <Route exact path="/messages" component={Message} ></Route>



      </BrowserRouter>
    </div>




  );
}


function Home() {
  return <h2 className="mainTitle">Home</h2>;
}



export default App;
