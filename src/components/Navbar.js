import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import tmdb from '../apis/tmdb';

const StyledNavbar = styled.nav`
  width: 100%;
  padding: 1em;
  background: whitesmoke;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 0;
  border-radius: 3em;
  background: #ddd;
  padding: .5em 2em;
  outline: none;
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
    });
  }
  render () {
    return (
      <StyledNavbar>
        <form onSubmit={e => this.sendData(e)}>
          <StyledInput
            onChange={e => this.setState({ value: e.target.value })}
            placeholder='Search for a movie...'
            value={this.state.value}
            type='text' />
        </form>
      </StyledNavbar>
    );
  }
}

export default withRouter(Navbar);
