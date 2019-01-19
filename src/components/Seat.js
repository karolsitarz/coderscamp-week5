import React from 'react';
import styled from 'styled-components';

const StyledSeat = styled.div`
  background-color: ${props => props.inputColor || '#cacaca'};
  width: 100%;
  height: 100%;
  border-radius: 15%;
  transition: .3s ease transform;

  :hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;

class Seat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status: 'free',
      name: this.props.name
    };
  }
  onClick () {
    // console.log(this.props.name);
    if (this.state.status === 'free') {
      this.setState((state) => ({ status: 'clicked' }));
      this.props.fun('addTicket', this.state.name);
    }
    if ((this.state.status) === 'clicked') {
      this.setState((state) => ({ status: 'free' }));
      this.props.fun('deleteTicket', this.state.name);
    }
  }
  render () {
    if (this.state.status === 'free') {
      return (
        <StyledSeat onClick={e => this.onClick()} />
      );
    }
    if (this.state.status === 'clicked') {
      return (
        <StyledSeat inputColor='#f8b500' onClick={e => this.onClick()} />
      );
    }
  }
}
export default Seat;
