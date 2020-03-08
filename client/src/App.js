import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
  } from 'react-router-dom';
import Comp from './components/Comp';
import CompAll from './components/CompAll';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <div>
          <Switch>
            <Route path='/' exact component={withRouter(CompAll)} />
            <Route path='/comp' exact component={withRouter(Comp)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;