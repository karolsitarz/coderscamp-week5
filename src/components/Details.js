import React from 'react';

// initial setup
export default ({ match }) => (
  <div>
    { match.params.name }
  </div>
);
