import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/';
import Details from './components/Details';
import Navbar from './components/Navbar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import Reservation from './components/Reservation';
library.add(faArrowLeft, faArrowRight, faShoppingCart);

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path='/details/buytickets/:movieID' component={Reservation} />
        <Route path='/details/:movieID' component={Details} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector('#root'));
