import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

import tmdb from '../apis/tmdb';

const StyledNavbar = styled.nav`
  width: 100%;
  padding: 1em;
  background: whitesmoke;
  display: flex;
  align-items: center;
  position: relative;
  
  a {
    color: #bbb;
    margin: 0 1em;
    transition: transform .3s ease;
    :hover {
      cursor: pointer;
      transform: scale(0.9);
    }
  }
  ::before {
    content: "";
    width: 100vw;
    height: 100%;
    background: inherit;
    position: absolute;
    top: 0;
    z-index: -1;
    left: calc(-50vw + 600px);
  }
`;

const StyledInput = styled.input`
  border: 0;
  border-radius: 3em;
  background: #e5e5e5;
  color: inherit;
  padding: .5em 2em;
  outline: none;
  margin-left: auto;
`;

const StyledForm = styled.form`
  margin-left: auto;
`;

class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  sendData (e) {
    e.preventDefault();

    tmdb('/search/movie', {
      query: this.state.value
    }).then(res => {
      if (!res) return;
      if (!res.results) return;
      if (res.results.length === 0) {
        window.alert('no movie found');
        return;
      }
      this.props.history.push(`/details/${res.results[0].id}`);
      this.setState({ value: '' });
    });
  }
  render () {
    console.log(this.props.history);
    return (
      <StyledNavbar>
        {this.props.history.location.pathname !== '/'
          ? (<Link to='/'>
            <FontAwesomeIcon icon='home' size='2x' />
          </Link>) : null}
        <StyledForm onSubmit={e => this.sendData(e)}>
          <StyledInput
            onChange={e => this.setState({ value: e.target.value })}
            placeholder='Search for a movie...'
            value={this.state.value}
            type='text' />
        </StyledForm>
      </StyledNavbar>
    );
  }
}

export default withRouter(Navbar);
