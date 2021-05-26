import React from 'react'
import GlobalStyle from './globalStyles'
import {LoginRedirect, MainPage, Tracker, TrackerList} from "./views/";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import history from "./history";

function App() {
  return (
    <div>
      <GlobalStyle/>
      <Router history={history}>
        <Switch>
          <Route path={'/trackers/:id'} component={Tracker}/>
          <Route path={'/trackers'} component={TrackerList}/>
          <Route path={'/loginRedirect'} component={LoginRedirect}/>
          <Route path={'/'} component={MainPage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
