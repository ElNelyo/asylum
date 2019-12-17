import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Users from './component/Users';
import Message from './component/Message';
import About from './component/About';
import { Navbar, Nav } from 'react-bootstrap'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Asylum</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/users">Utilisateurs</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            <Nav.Link href="/about">A propos</Nav.Link>
          </Nav>
          <Nav>
            <img src="logo-new.png" className="App-logo" alt="logo" />
          </Nav>
        </Navbar>

        <Route exact path="/" component={Home} ></Route>
        <Route exact path="/users" component={Users} ></Route>
        <Route exact path="/messages" component={Message} ></Route>
        <Route exact path="/about" component={About} ></Route>



      </BrowserRouter>
    </div>




  );
}


function Home() {
  return <div style={{ width: "100%", height: 'auto' }}>
  <ResponsiveEmbed aspectRatio="16by9">
    <embed type="image/svg+xml" src="http://195.154.150.105/asylum/" />
  </ResponsiveEmbed>
</div>
  ;
}



export default App;
