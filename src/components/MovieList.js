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
  background: #00000022;
  border-radius: 1em;
  overflow: hidden;

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
  text-align: center;
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
            src={img ? IMG_URL + IMG_QUALITY.low + img : ''} />
        </StyledPoster>
      </Link>
    );
  }
}

const StyledMoviePanelContainer = styled.section`
  position: relative;
  width: 100vw;
  overflow: hidden;
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
  cursor: pointer;
`;

const StyledScrollingList = styled.div`
  display: inline-flex;
  transition: transform .5s ease;
  transform: ${props => `translateX(-${props.$page * 100}vw)`}
`;

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
        moviesList: [fetchTilesToArray(results)]
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
        <StyledScrollingList $page={page}>
          {moviesList}
        </StyledScrollingList>

        <StyledArrowButton $left onClick={e => this.slideLeft()}>
          <FontAwesomeIcon icon='arrow-left' size='3x' />
        </StyledArrowButton>
        <StyledArrowButton $right onClick={e => this.slideRight()}>
          <FontAwesomeIcon icon='arrow-right' size='3x' />
        </StyledArrowButton>
      </StyledMoviePanelContainer>
    );
  }
}
