import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Main from "./kit/scenes/Main";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Editor from "./kit/scenes/Editor";

function App() {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#home">Antiplagiat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <Main/>
                    </Route>
                    <Route path="/editor">
                        <Editor/>
                    </Route>
                    <Route path="/login">
                    </Route>
                    <Route path="/register">
                    </Route>
                </Switch>
            </Router>
        </>

    );
}

export default App;
