import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const IMG_URL = 'https://image.tmdb.org/t/p/';
const IMG_QUALITY = {
  low: 'w92',
  high: 'w500'
};

const StyledPoster = styled.div`
  width: 15em;
  height: 22.5em;
  transition:
    .3s ease box-shadow,
    .3s ease transform;
  position: relative;
  background: #00000022;
  border-radius: 1em;
  overflow: hidden;
  margin: 1em;
  box-shadow: 0 0 2em 0px #00000022;
  transform: scale(0.95);

  :hover {
    cursor: pointer;
    transform: scale(1);
    box-shadow: 0 0 4em 0px #00000022;
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

export default class Poster extends Component {
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
