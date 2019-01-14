import React from 'react';
import {Link} from 'react-router-dom';

// initial setup
export default ({ match }) => (
  <div>
     <Link to={`/details/buytickets/${match.params.movieID}`}>
    <div>
      <button>AAA</button>
    </div>
    </Link>  
  </div>
);
