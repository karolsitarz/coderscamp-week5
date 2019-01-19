import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import tmdb from '../apis/tmdb';
import styled from 'styled-components';
import YoutubeEmbedVideo from 'youtube-embed-video';

export default class Details extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      overview: '',
      genres: '',
      year: '',
      trailerID: '',
      movieID: props.match.params.movieID,
      img: ''
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData () {
    if (!this.props.match.params.movieID) return;
    const id = this.props.match.params.movieID;
    tmdb(`/movie/${id}`).then(res => {
      if (!res) return;
      const { title, overview, genres } = res;
      this.setState({
        title,
        overview,
        genres,
        year: res.release_date.split('-')[0]
      });
    });
    tmdb(`/movie/${id}/images`, { language: 'en' }).then(res => {
      if (!res || !res.posters || !res.posters[0]) return;
      if (!res.posters[0].file_path) return;
      this.setState({ img: res.posters[0].file_path });
    });
    tmdb(`/movie/${id}/videos`, { language: 'en' }).then(res => {
      if (!res || !res.results || !res.results[0]) return;
      if (!res.results[0].key) return;
      console.log(res.results[0]);
      this.setState({ trailerID: res.results[0].key });
    });
  }
  componentDidUpdate () {
    if (this.props.match.params.movieID !== this.state.movieID) {
      this.setState({ movieID: this.props.match.params.movieID });
      this.fetchData();
    }
  }
  componentDidMount () {
    this.fetchData();
  }
  render () {
    return (
      <Section>
        <StyledContent>
          <Poster alt={this.state.title} img={this.state.img} />
        </StyledContent>
        <StyledContent>
          <h1>{this.state.title} ({this.state.year})</h1>
          <h4>Overview:</h4>
          <p>{this.state.overview}</p>
          <h4>Genres:</h4>
          <p>{!Array.isArray(this.state.genres) ? null : this.state.genres.map(c => c.name).join(', ')}</p>
            <Link>
              <div>
                <button>AAA</button>
              </div>
            </Link>
          {!this.state.trailerID ? null
            : <YoutubeEmbedVideo videoId={this.state.trailerID} suggestions={false} />}
        </StyledContent>
      </Section>
    );
  }
}

const Section = styled.section`
  display: flex;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  margin: 2em;
  display: flex;
  flex-direction: column;
  > iframe {
    align-self: center;
    margin-top: 2em;
  }
`;
const StyledImg = styled.img`
  width: 500px;
  max-width: 30vw;
  height: 750px;
  max-height: calc(3 / 2 * 30vw);
  border-radius: 2em;
  box-shadow: 0 0 1em #00000011;
`;
class Poster extends Component {
  componentDidMount () {
    this.imgRef.onload = e => {
      e.target.setAttribute('src', (`https://image.tmdb.org/t/p/w500` + this.props.img));
    };
  }
  render () {
    const { alt, img } = this.props;
    return (
      <StyledImg
        ref={e => (this.imgRef = e)}
        alt={alt}
        src={img ? `https://image.tmdb.org/t/p/w92` + img : ''} />
    );
  }
}
