import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tmdb from '../../apis/tmdb';
import Poster from './MovieListPoster';

// whole list
const StyledMoviePanelContainer = styled.section`
  position: relative;
  width: 100vw;
  max-width: 1200px;
  overflow-x: hidden;
`;

// single panel, containing 4 tiles
const StyledMoviePanel = styled.div`
  position: relative;
  width: 100vw;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 0 5em;
`;

// div containing all panels, so they can scroll
const StyledScrollingList = styled.div`
  display: inline-flex;
  transition: transform .5s ease;
  transform: ${props => `translateX(calc(-100% / ${props.$all.length} * ${props.$page}))`};
`;

// buttons
const StyledArrowButton = styled.div`
  width: 5em;
  height: 5em;
  position: absolute;
  top: calc(50% - 2.5em);
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${props => props.$left ? 0 : 'initial'};
  right: ${props => props.$right ? 0 : 'initial'};
  cursor: pointer;
  opacity: 0.3;
  transition: 
    opacity .3s ease,
    transform .3s ease;

  :hover {
    opacity: 0.5;
    transform: scale(1.1);
  }
  ${props => props.$visible && css`
    opacity: 0 !important;
    pointer-events: none;
  `}
`;

// get data of 4 tiles and transform into JSX
const fetchTilesToArray = (results, j = 0) => {
  let moviesList = [];
  for (let i = j * 4; i < j * 4 + 4; i++) {
    moviesList.push(
      <Poster
        key={results[i].id}
        movieID={results[i].id}
        img={results[i].poster_path}
        alt={results[i].original_title} />);
  }
  return (<StyledMoviePanel key={j}>{moviesList}</StyledMoviePanel>);
};

export default class MovieList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: [],
      page: 0,
      moviesList: []
    };

    tmdb(`/discover/movie`, {
      sort_by: `${props.sortBy}.desc` || ''
    }).then(({ results }) => {
      this.setState({
        movies: results,
        moviesList: [...this.state.moviesList, fetchTilesToArray(results)]
      });
    });
  }
  slideLeft () {
    if (this.state.page === 0) return;
    this.setState({ page: this.state.page - 1 });
  }

  slideRight () {
    const { page, moviesList, movies } = this.state;
    const newPage = page * 1 + 1;

    // if can scroll right and is on the border of rendered tiles
    if (newPage === moviesList.length && newPage * 4 < movies.length) {
      this.setState({
        page: newPage,
        moviesList: [...moviesList, fetchTilesToArray(movies, newPage)]
      });

      // if there is a need to fetch new tiles
    } else if (newPage * 4 > movies.length - 4) {
      tmdb(`/discover/movie`, {
        sort_by: (`${this.props.sortBy}.desc` || ''),
        page: (Math.floor(movies.length / 20) + 1)
      }).then(({ results }) => {
        this.setState({
          movies: [...movies, ...results]
        });
        this.slideRight();
      });
      // else, just move the tiles
    } else {
      this.setState({ page: newPage });
    }
  }

  render () {
    const { moviesList, page } = this.state;
    if (moviesList.length < 1) return null;

    return (
      <StyledMoviePanelContainer>
        <StyledScrollingList $page={page} $all={moviesList}>
          {moviesList}
        </StyledScrollingList>

        <StyledArrowButton $visible={page === 0} $left onClick={e => this.slideLeft()}>
          <FontAwesomeIcon icon='arrow-left' size='3x' />
        </StyledArrowButton>
        <StyledArrowButton $right onClick={e => this.slideRight()}>
          <FontAwesomeIcon icon='arrow-right' size='3x' />
        </StyledArrowButton>
      </StyledMoviePanelContainer>
    );
  }
}
