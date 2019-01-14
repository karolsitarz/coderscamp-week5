import React, { Component } from 'react';
import tmdb from '../apis/tmdb';

export default class Home extends Component {
  componentDidMount () {
    tmdb('/discover/movie', {
      sort_by: 'popularity.desc'
    }).then(res => console.log(res));
  }

  render () {
    return <div>Home</div>;
  }
}
