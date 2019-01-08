import React from 'react';
import MovieList from './MovieList';

export default props => {
  return (
    <div>
      <h2>New releases</h2>
      <MovieList sortBy='release_date' />
      <h2>Popular</h2>
      <MovieList sortBy='popularity' />
    </div>
  );
};
