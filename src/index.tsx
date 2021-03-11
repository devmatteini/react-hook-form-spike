import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

const ToDo: React.FC = () => {
    return <>TODO</>
}

const App: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <ToDo />
            </Route>
        </Switch>
    </BrowserRouter>
)

render(<App />, document.getElementById("root"))
