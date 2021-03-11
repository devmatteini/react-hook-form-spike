import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import SimpleForm from "./pages/simple/simple-form"
import "bootstrap/dist/css/bootstrap.min.css"
import WatchersForm from "./pages/watchers/watchers-form"

const routes = {
    simpleForm: "/simple-form",
    watchers: "/watchers",
}

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" fixed="top">
            <Navbar.Collapse id="basic-navbar-nav" className="mr-5">
                <Nav className="text-uppercase">
                    <Nav.Link as={Link} to={routes.simpleForm} className="px-3">
                        Simple Form
                    </Nav.Link>
                    <Nav.Link as={Link} to={routes.watchers} className="px-3">
                        Watchers
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const App: React.FC = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/">
                <div className="m-3">
                    <a className="mr-1" href="https://react-hook-form.com/">
                        https://react-hook-form.com/
                    </a>
                    +
                    <a className="ml-1" href="https://www.typescriptlang.org/">
                        Typescript (strict)
                    </a>
                </div>
            </Route>
            <Route path={routes.simpleForm}>
                <SimpleForm />
            </Route>
            <Route path={routes.watchers}>
                <WatchersForm />
            </Route>
        </Switch>
    </BrowserRouter>
)

render(<App />, document.getElementById("root"))
