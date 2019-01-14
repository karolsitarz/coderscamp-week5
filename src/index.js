import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Details from './components/Details';
import Navbar from './components/Navbar';

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path='/details/:name' component={Details} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector('#root'));
