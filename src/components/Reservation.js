import React from 'react';
import Seat from './Seat';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tmdb from '../apis/tmdb';

const StyledReservationSite = styled.div`
    margin: auto;
    max-width: 1200px;
    text-align: center;
    position: relative;
`;

const StyledScreeningRoom = styled.div`
    margin:auto;
    display: grid;
    grid-template-columns: 1fr repeat(10,minmax(auto,40px)) 1fr;
    grid-template-rows: repeat(8,40px);
    place-items: start;
    grid-gap: 8px;
    align-items: center;
    
    > ::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 80;
    padding-bottom: 100%;
    }
`;
const StyledTopMovieInfo = styled.div`
    margin: auto;
    padding: 40px 0 10px 0;

    > h1{
        font-size: 3em;
    }

    > h3{
        font-size: 1.5em;
    }
`;
const StyledCloseButton = styled.button`
  position: absolute;
  top: 1em;
  left: 1em;
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
  background-color: #f5f5f5;
  color: #bbb;
  font-size: 20px;
  border: 0px;
  cursor: pointer;
`;
const StyledScreen = styled.div`
    background-color: whitesmoke;
    width: 60%;
    margin: 20px auto ;
    font-size: 20px;
`;
const StyledRowName = styled.p`
  justify-self: ${props => props.site};
  font-size: 1.5em;
  opacity: 0.8;
  padding: 0;
  margin: auto 0.25em;
`;
const StyledShoppingCart = styled.div`
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;
const StyledParagraphInfo = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`;
const StyledShoppingCartButton = styled.div`
display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  padding: .5em 2em;
  color: #fff;
  border-radius: 5em;
  margin-top: 2em;
  background: ${props => props.$number > 0 ? '#f8b500' : '#ddd'};
  pointer-events: ${props => props.$number > 0 ? 'auto' : 'none'};
  transition: .3s ease transform;

  :hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;
export default class Reservation extends React.Component {
  constructor (props) {
    super(props);
    const reservedinit = 'reserved';
    this.state = {
      price: 0,
      numOfTickets: 0,
      seats: [],
      id: props.match.params,
      movieName: '',
      reservedSeats: this.getLocalMemory(reservedinit)
    };
  }
  componentDidMount () {
    const reserved = 'reserved';
    tmdb(`/movie/${this.state.id.movieID}`).then((
      results
    ) => {
      this.setState({
        movieName: results.title,
        reservedSeats: this.getLocalMemory(reserved)
      });
    });
  }
  getLocalMemory (value) {
    return JSON.parse(localStorage.getItem(value));
  }
  setLocalMemory (key) {
    let acctualStorage = JSON.parse(localStorage.getItem('reserved'));
    if (acctualStorage == null) {
      acctualStorage = [];
    }
    if (acctualStorage != null && this.state.seats.length > 0) {
      this.state.seats.map((seat) => { return acctualStorage.push(seat); });
    }
    localStorage.setItem(key, JSON.stringify(acctualStorage));
    this.setState({
      reservedSeats: this.getLocalMemory('reserved'),
      price: 0,
      numOfTickets: 0,
      seats: []
    });
  }
  deleteSeat (x, name) {
    let arr = x;
    let index = arr.indexOf(name);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  getstatus = (addOrDelete, name) => {
    if (addOrDelete === 'addTicket') {
      this.setState({
        price: this.state.price + 20,
        numOfTickets: this.state.numOfTickets + 1,
        seats: [...this.state.seats, name]
      });
    }
    else if (addOrDelete === 'deleteTicket') {
      this.setState({
        price: this.state.price - 20,
        numOfTickets: this.state.numOfTickets - 1,
        seats: this.deleteSeat(this.state.seats, name)
      });
    }
  }

  include (name) {
    let isInclude = false;
    if (this.state.reservedSeats) {
      isInclude = this.state.reservedSeats.includes(name);
    }
    return isInclude;
  }
  render () {
    return (
      <StyledReservationSite>
        <StyledTopMovieInfo>
          <h1>{this.state.movieName}</h1>
          <h3>20.01.2019   20:45</h3>
          <Link to={`${process.env.PUBLIC_URL}/details/${this.props.match.params.movieID}`}>
            <StyledCloseButton>
              <FontAwesomeIcon icon='arrow-left' size='1x' />
            </StyledCloseButton>
          </Link>
        </StyledTopMovieInfo>
        <StyledScreen>SCREEN</StyledScreen>
        <StyledScreeningRoom>
          <StyledRowName site='right'>A</StyledRowName>
          <Seat fun={this.getstatus} name={'A1'} isReserved={this.include('A1')} />
          <Seat fun={this.getstatus} name={'A2'} isReserved={this.include('A2')} />
          <Seat fun={this.getstatus} name={'A3'} isReserved={this.include('A3')} />
          <Seat fun={this.getstatus} name={'A4'} isReserved={this.include('A4')} />
          <Seat fun={this.getstatus} name={'A5'} isReserved={this.include('A5')} />
          <Seat fun={this.getstatus} name={'A6'} isReserved={this.include('A6')} />
          <Seat fun={this.getstatus} name={'A7'} isReserved={this.include('A7')} />
          <Seat fun={this.getstatus} name={'A8'} isReserved={this.include('A8')} />
          <Seat fun={this.getstatus} name={'A9'} isReserved={this.include('A9')} />
          <Seat fun={this.getstatus} name={'A10'} isReserved={this.include('A10')} />
          <StyledRowName site='left'>A</StyledRowName>

          <StyledRowName site='right'>B</StyledRowName>
          <Seat fun={this.getstatus} name={'B1'} isReserved={this.include('B1')} />
          <Seat fun={this.getstatus} name={'B2'} isReserved={this.include('B2')} />
          <Seat fun={this.getstatus} name={'B3'} isReserved={this.include('B3')} />
          <Seat fun={this.getstatus} name={'B4'} isReserved={this.include('B4')} />
          <Seat fun={this.getstatus} name={'B5'} isReserved={this.include('B5')} />
          <Seat fun={this.getstatus} name={'B6'} isReserved={this.include('B6')} />
          <Seat fun={this.getstatus} name={'B7'} isReserved={this.include('B7')} />
          <Seat fun={this.getstatus} name={'B8'} isReserved={this.include('B8')} />
          <Seat fun={this.getstatus} name={'B9'} isReserved={this.include('B9')} />
          <Seat fun={this.getstatus} name={'B10'} isReserved={this.include('B10')} />
          <StyledRowName site='left'>B</StyledRowName>

          <StyledRowName site='right'>C</StyledRowName>
          <Seat fun={this.getstatus} name={'C1'} isReserved={this.include('C1')} />
          <Seat fun={this.getstatus} name={'C2'} isReserved={this.include('C2')} />
          <Seat fun={this.getstatus} name={'C3'} isReserved={this.include('C3')} />
          <Seat fun={this.getstatus} name={'C4'} isReserved={this.include('C4')} />
          <Seat fun={this.getstatus} name={'C5'} isReserved={this.include('C5')} />
          <Seat fun={this.getstatus} name={'C6'} isReserved={this.include('C6')} />
          <Seat fun={this.getstatus} name={'C7'} isReserved={this.include('C7')} />
          <Seat fun={this.getstatus} name={'C8'} isReserved={this.include('C8')} />
          <Seat fun={this.getstatus} name={'C9'} isReserved={this.include('C9')} />
          <Seat fun={this.getstatus} name={'C10'} isReserved={this.include('C10')} />
          <StyledRowName site='left'>C</StyledRowName>

          <StyledRowName site='right'>D</StyledRowName>
          <Seat fun={this.getstatus} name={'D1'} isReserved={this.include('D1')} />
          <Seat fun={this.getstatus} name={'D2'} isReserved={this.include('D2')} />
          <Seat fun={this.getstatus} name={'D3'} isReserved={this.include('D3')} />
          <Seat fun={this.getstatus} name={'D4'} isReserved={this.include('D4')} />
          <Seat fun={this.getstatus} name={'D5'} isReserved={this.include('D5')} />
          <Seat fun={this.getstatus} name={'D6'} isReserved={this.include('D6')} />
          <Seat fun={this.getstatus} name={'D7'} isReserved={this.include('D7')} />
          <Seat fun={this.getstatus} name={'D8'} isReserved={this.include('D8')} />
          <Seat fun={this.getstatus} name={'D9'} isReserved={this.include('D9')} />
          <Seat fun={this.getstatus} name={'D10'} isReserved={this.include('D10')} />
          <StyledRowName site='left'>D</StyledRowName>

          <StyledRowName site='right'>E</StyledRowName>
          <Seat fun={this.getstatus} name={'E1'} isReserved={this.include('E1')} />
          <Seat fun={this.getstatus} name={'E2'} isReserved={this.include('E2')} />
          <Seat fun={this.getstatus} name={'E3'} isReserved={this.include('E3')} />
          <Seat fun={this.getstatus} name={'E4'} isReserved={this.include('E4')} />
          <Seat fun={this.getstatus} name={'E5'} isReserved={this.include('E5')} />
          <Seat fun={this.getstatus} name={'E6'} isReserved={this.include('E6')} />
          <Seat fun={this.getstatus} name={'E7'} isReserved={this.include('E7')} />
          <Seat fun={this.getstatus} name={'E8'} isReserved={this.include('E8')} />
          <Seat fun={this.getstatus} name={'E9'} isReserved={this.include('E9')} />
          <Seat fun={this.getstatus} name={'E10'} isReserved={this.include('E10')} />
          <StyledRowName site='left'>E</StyledRowName>

          <StyledRowName site='right'>F</StyledRowName>
          <Seat fun={this.getstatus} name={'F1'} isReserved={this.include('F1')} />
          <Seat fun={this.getstatus} name={'F2'} isReserved={this.include('F2')} />
          <Seat fun={this.getstatus} name={'F3'} isReserved={this.include('F3')} />
          <Seat fun={this.getstatus} name={'F4'} isReserved={this.include('F4')} />
          <Seat fun={this.getstatus} name={'F5'} isReserved={this.include('F5')} />
          <Seat fun={this.getstatus} name={'F6'} isReserved={this.include('F6')} />
          <Seat fun={this.getstatus} name={'F7'} isReserved={this.include('F7')} />
          <Seat fun={this.getstatus} name={'F8'} isReserved={this.include('F8')} />
          <Seat fun={this.getstatus} name={'F9'} isReserved={this.include('F9')} />
          <Seat fun={this.getstatus} name={'F10'} isReserved={this.include('F10')} />
          <StyledRowName site='left'>F</StyledRowName>

          <StyledRowName site='right'>G</StyledRowName>
          <Seat fun={this.getstatus} name={'G1'} isReserved={this.include('G1')} />
          <Seat fun={this.getstatus} name={'G2'} isReserved={this.include('G2')} />
          <Seat fun={this.getstatus} name={'G3'} isReserved={this.include('G3')} />
          <Seat fun={this.getstatus} name={'G4'} isReserved={this.include('G4')} />
          <Seat fun={this.getstatus} name={'G5'} isReserved={this.include('G5')} />
          <Seat fun={this.getstatus} name={'G6'} isReserved={this.include('G6')} />
          <Seat fun={this.getstatus} name={'G7'} isReserved={this.include('G7')} />
          <Seat fun={this.getstatus} name={'G8'} isReserved={this.include('G8')} />
          <Seat fun={this.getstatus} name={'G9'} isReserved={this.include('G9')} />
          <Seat fun={this.getstatus} name={'G10'} isReserved={this.include('G10')} />
          <StyledRowName site='left'>G</StyledRowName>

          <StyledRowName site='right'>H</StyledRowName>
          <Seat fun={this.getstatus} name={'H1'} isReserved={this.include('H1')} />
          <Seat fun={this.getstatus} name={'H2'} isReserved={this.include('H2')} />
          <Seat fun={this.getstatus} name={'H3'} isReserved={this.include('H3')} />
          <Seat fun={this.getstatus} name={'H4'} isReserved={this.include('H4')} />
          <Seat fun={this.getstatus} name={'H5'} isReserved={this.include('H5')} />
          <Seat fun={this.getstatus} name={'H6'} isReserved={this.include('H6')} />
          <Seat fun={this.getstatus} name={'H7'} isReserved={this.include('H7')} />
          <Seat fun={this.getstatus} name={'H8'} isReserved={this.include('H8')} />
          <Seat fun={this.getstatus} name={'H9'} isReserved={this.include('H9')} />
          <Seat fun={this.getstatus} name={'H10'} isReserved={this.include('H10')} />
          <StyledRowName site='left'>H</StyledRowName>
        </StyledScreeningRoom>
        <StyledShoppingCart>
          <StyledParagraphInfo>CURRENT PRICE: {this.state.price}$</StyledParagraphInfo>
          <StyledParagraphInfo>NUMBER OF TICKETS: {this.state.numOfTickets}</StyledParagraphInfo>
          <StyledParagraphInfo>SEATS: {this.state.seats.map(seat => { return seat + ' '; })}</StyledParagraphInfo>
        </StyledShoppingCart>
        <StyledShoppingCartButton $number={this.state.numOfTickets} onClick={e => this.setLocalMemory('reserved')} >
          BUY TICKETS
          <FontAwesomeIcon icon='shopping-cart' size='2x' style={{ marginLeft: '.5em' }} />
        </StyledShoppingCartButton>
      </StyledReservationSite>
    );
  }
}
