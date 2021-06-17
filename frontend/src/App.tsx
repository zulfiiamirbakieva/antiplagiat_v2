import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Editor from "./kit/scenes/Editor";
import Login from "./kit/scenes/Login";
import EditorSplit from "./kit/scenes/EditorSplit";
import Main from "./kit/scenes/Main";
import {useAuth} from "./hooks/use-auth";

function App() {

    const auth = useAuth()

    useEffect(() => {
        console.log(window.location.pathname)
        if((!auth.isAuthenticated && !auth.isLoading && window.location.pathname !== '/login') && window.location.pathname !== '/') {
            window.location.href = '/login'
        }
    }, [auth.isLoading, auth.isAuthenticated])

    return (
        <>
            <Navbar expand="lg" variant="dark">
                <Navbar.Brand href="/">Antiplagiat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {
                        auth.isAuthenticated && !auth.isLoading && <Navbar.Text>
                            {auth.user.lastName} {auth.user.firstName}
                        </Navbar.Text>
                    }
                    {
                        !auth.isAuthenticated && !auth.isLoading && <Navbar.Text>
                            <a href="/login">Вход / Регистрация</a>
                        </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route path="/editor/split">
                        <EditorSplit/>
                    </Route>
                    <Route path="/editor">
                        <Editor/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </Router>
        </>

    );
}

export default App;
