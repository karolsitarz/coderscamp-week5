import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tmdb from '../apis/tmdb';
const IMG_URL = 'https://image.tmdb.org/t/p/';
const IMG_QUALITY = {
  low: 'w92',
  high: 'w500'
};

const StyledPoster = styled.div`
  width: 15em;
  height: 22.5em;
  transition: .3s ease transform;
  position: relative;

  :hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;

const StyledPosterImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

class Poster extends Component {
  componentDidMount () {
    this.imgRef.onload = e => {
      e.target.setAttribute('src', (IMG_URL + IMG_QUALITY.high + this.props.img));
    };
  }
  render () {
    const { alt, img, movieID } = this.props;
    return (
      <Link to={`/details/${movieID}`}>
        <StyledPoster>
          <StyledPosterImg
            ref={e => (this.imgRef = e)}
            alt={alt}
            src={IMG_URL + IMG_QUALITY.low + img} />
        </StyledPoster>
      </Link>
    );
  }
}

const StyledMoviePanelContainer = styled.section`
  position: relative;
  width: 100vw;
  /* overflow: hidden; */
`;

const StyledMoviePanel = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 0 5em;
`;

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
`;

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
      console.log(results);

      let moviesList = [];
      for (let i = 0; i < 4; i++) {
        moviesList.push(
          <Poster
            key={results[i].id}
            movieID={results[i].id}
            img={results[i].poster_path}
            alt={results[i].original_title} />);
      }
      this.setState({
        movies: results,
        moviesList
      });
    });
  }

  render () {
    const { moviesList } = this.state;
    if (moviesList.length < 1) return null;

    return (
      <StyledMoviePanelContainer>
        <div style={{ display: 'inline-flex' }}>
          <StyledMoviePanel>
            {moviesList}
          </StyledMoviePanel>
        </div>

        <StyledArrowButton $left>
          <FontAwesomeIcon icon='arrow-left' size='3x' />
        </StyledArrowButton>
        <StyledArrowButton $right>
          <FontAwesomeIcon icon='arrow-right' size='3x' />
        </StyledArrowButton>
      </StyledMoviePanelContainer>
    );
  }
}
