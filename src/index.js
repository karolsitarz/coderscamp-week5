import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/';
import Details from './components/Details';
import Navbar from './components/Navbar';
import Reservation from './components/Reservation';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faHome, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft, faArrowRight, faHome, faShoppingCart);

const Main = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const App = () => (
  <BrowserRouter>
    <Main>
      <Navbar />
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/details/:movieID/buy'} component={Reservation} />
        <Route path={process.env.PUBLIC_URL + '/details/:movieID'} component={Details} />
        <Route path={process.env.PUBLIC_URL + '/'} component={Home} />
      </Switch>
    </Main>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector('#root'));
