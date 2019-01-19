import React from 'react';
import styled from 'styled-components';

import MovieList from './MovieList';

const Header = styled.h2`
  padding-left: 5rem;
`;

export default props => {
  return (
    <div>
      <Header>New releases</Header>
      <MovieList sortBy='release_date' />
      <Header>Popular</Header>
      <MovieList sortBy='popularity' />
    </div>
  );
};
