import React from 'react';
import Seat from './Seat';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tmdb from '../apis/tmdb';

const StyledReservationSite = styled.div`
    margin: auto;
    max-width: 1200px;
    background-color: #393e46;
    text-align: center;
    color: white;
    position: relative;
`;

const StyledScreeningRoom = styled.div`
    margin:auto;
    display: grid;
    grid-template-columns: 1fr repeat(10,minmax(auto,50px)) 1fr;
    place-items: start;
    grid-gap: 10px;
    align-items: center;
    
    > ::before {
    content: "";
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
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: #f8b500;
    color: #ffffff;
    font-size:20px;
    border: 0px;
`;
const StyledScreen = styled.div`
    background-color:grey;
    width: 60%;
    margin: 20px auto ;
    font-size: 20px;
`;
const StyledRowName = styled.p`
    justify-self: ${props => props.site };
    font-size: 2vw;
    margin: 0;
    padding: 0;
`;
const StyledShoppingCart = styled.div`
    margin: 20px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;
const StyledParagraphInfo = styled.div`
    font-size: 2em;
    margin: 20px;
`;
const StyledShoppingCartButton = styled.div`
    margin: 0 auto;
    padding: 20px;
    color: #f8b500;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    
`;
export default class Reservation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price: 0,
            numOfTickets: 0,
            seats: [],
            id: props.match.params,
            movieName: ''

        }
    }   
    componentDidMount() {
        console.log(this.state.id.movieID);
        tmdb(`/movie/${this.state.id.movieID}`).then((
            results
        ) => {
            console.log(results);
            this.setState({
                movieName: results.title
            });
        });
    };

    deleteSeat(x,name){
            let arr = x;
            let index = arr.indexOf(name);
            if (index > -1) {
                arr.splice(index, 1);
            }
        return arr;
    }
    getstatus =(addOrDelete,name) =>{
        if (addOrDelete === 'addTicket'){
            this.setState({
                price: this.state.price +20 , 
                numOfTickets: this.state.numOfTickets +1,
                seats: [...this.state.seats,name]
            }); 
            
        }
        else if (addOrDelete === 'deleteTicket') {
            this.setState({
                price: this.state.price - 20,
                numOfTickets: this.state.numOfTickets - 1,
                seats: this.deleteSeat(this.state.seats,name)
            });
        }  
        console.log(this.state.seats);
        
    }
    
    render(){
       return (
        <StyledReservationSite>
            <StyledTopMovieInfo>
                <h1>{this.state.movieName}</h1>
                <h3>20.01.2019   20:45</h3>
                <StyledCloseButton> X </StyledCloseButton>
            </StyledTopMovieInfo>
            <StyledScreen>SCREEN</StyledScreen>
            <StyledScreeningRoom>
                <StyledRowName site="right">A</StyledRowName>
                <Seat fun={this.getstatus} name={"A1"}/>
                <Seat fun={this.getstatus} name={"A2"}/> 
                <Seat fun={this.getstatus} name={"A3"}/> 
                <Seat fun={this.getstatus} name={"A4"}/>    
                <Seat fun={this.getstatus} name={"A5"}/> 
                <Seat fun={this.getstatus} name={"A6"}/> 
                <Seat fun={this.getstatus} name={"A7"}/> 
                <Seat fun={this.getstatus} name={"A8"}/>
                <Seat fun={this.getstatus} name={"A9"}/>  
                <Seat fun={this.getstatus} name={"A10"}/>
                <StyledRowName site="left">A</StyledRowName>

                <StyledRowName site="right">B</StyledRowName>
                <Seat fun={this.getstatus} name={"B1"}/>
                <Seat fun={this.getstatus} name={"B2"}/> 
                <Seat fun={this.getstatus} name={"B3"}/> 
                <Seat fun={this.getstatus} name={"B4"}/>    
                <Seat fun={this.getstatus} name={"B5"}/> 
                <Seat fun={this.getstatus} name={"B6"}/> 
                <Seat fun={this.getstatus} name={"B7"}/> 
                <Seat fun={this.getstatus} name={"B8"}/>
                <Seat fun={this.getstatus} name={"B9"}/>  
                <Seat fun={this.getstatus} name={"B10"}/> 
                <StyledRowName site="left">B</StyledRowName>

                <StyledRowName site="right">C</StyledRowName>
                <Seat fun={this.getstatus} name={"C1"}/>
                <Seat fun={this.getstatus} name={"C2"}/> 
                <Seat fun={this.getstatus} name={"C3"}/> 
                <Seat fun={this.getstatus} name={"C4"}/>    
                <Seat fun={this.getstatus} name={"C5"}/> 
                <Seat fun={this.getstatus} name={"C6"}/> 
                <Seat fun={this.getstatus} name={"C7"}/> 
                <Seat fun={this.getstatus} name={"C8"}/>
                <Seat fun={this.getstatus} name={"C9"}/>  
                <Seat fun={this.getstatus} name={"C10"}/>  
                <StyledRowName site="left">C</StyledRowName>

                <StyledRowName site="right">D</StyledRowName>
                <Seat fun={this.getstatus} name={"D1"}/>
                <Seat fun={this.getstatus} name={"D2"}/> 
                <Seat fun={this.getstatus} name={"D3"}/> 
                <Seat fun={this.getstatus} name={"D4"}/>    
                <Seat fun={this.getstatus} name={"D5"}/> 
                <Seat fun={this.getstatus} name={"D6"}/> 
                <Seat fun={this.getstatus} name={"D7"}/> 
                <Seat fun={this.getstatus} name={"D8"}/>
                <Seat fun={this.getstatus} name={"D9"}/>  
                <Seat fun={this.getstatus} name={"D10"}/> 
                <StyledRowName site="left">D</StyledRowName>

                <StyledRowName site="right">E</StyledRowName>
                <Seat fun={this.getstatus} name={"E1"}/>
                <Seat fun={this.getstatus} name={"E2"}/> 
                <Seat fun={this.getstatus} name={"E3"}/> 
                <Seat fun={this.getstatus} name={"E4"}/>    
                <Seat fun={this.getstatus} name={"E5"}/> 
                <Seat fun={this.getstatus} name={"E6"}/> 
                <Seat fun={this.getstatus} name={"E7"}/> 
                <Seat fun={this.getstatus} name={"E8"}/>
                <Seat fun={this.getstatus} name={"E9"}/>  
                <Seat fun={this.getstatus} name={"E10"}/>  
                <StyledRowName site="left">E</StyledRowName>

                <StyledRowName site="right">F</StyledRowName>
                <Seat fun={this.getstatus} name={"F1"}/>
                <Seat fun={this.getstatus} name={"F2"}/> 
                <Seat fun={this.getstatus} name={"F3"}/> 
                <Seat fun={this.getstatus} name={"F4"}/>    
                <Seat fun={this.getstatus} name={"F5"}/> 
                <Seat fun={this.getstatus} name={"F6"}/> 
                <Seat fun={this.getstatus} name={"F7"}/> 
                <Seat fun={this.getstatus} name={"F8"}/>
                <Seat fun={this.getstatus} name={"F9"}/>  
                <Seat fun={this.getstatus} name={"F10"}/>  
                <StyledRowName site="left">F</StyledRowName>

                <StyledRowName site="right">G</StyledRowName>
                <Seat fun={this.getstatus} name={"G1"}/>
                <Seat fun={this.getstatus} name={"G2"}/> 
                <Seat fun={this.getstatus} name={"G3"}/> 
                <Seat fun={this.getstatus} name={"G4"}/>    
                <Seat fun={this.getstatus} name={"G5"}/> 
                <Seat fun={this.getstatus} name={"G6"}/> 
                <Seat fun={this.getstatus} name={"G7"}/> 
                <Seat fun={this.getstatus} name={"G8"}/>
                <Seat fun={this.getstatus} name={"G9"}/>  
                <Seat fun={this.getstatus} name={"G10"}/> 
                <StyledRowName site="left">G</StyledRowName>

                <StyledRowName site="right">H</StyledRowName>
                <Seat fun={this.getstatus} name={"H1"}/>
                <Seat fun={this.getstatus} name={"H2"}/> 
                <Seat fun={this.getstatus} name={"H3"}/> 
                <Seat fun={this.getstatus} name={"H4"}/>    
                <Seat fun={this.getstatus} name={"H5"}/> 
                <Seat fun={this.getstatus} name={"H6"}/> 
                <Seat fun={this.getstatus} name={"H7"}/> 
                <Seat fun={this.getstatus} name={"H8"}/>
                <Seat fun={this.getstatus} name={"H9"}/>  
                <Seat fun={this.getstatus} name={"H10"}/>  
                <StyledRowName site="left">H</StyledRowName>
            </StyledScreeningRoom>
            <StyledShoppingCart>
                <StyledParagraphInfo>CURRENT PRICE: {this.state.price}$</StyledParagraphInfo>
                <StyledParagraphInfo>NUMBER OF TICKETS: {this.state.numOfTickets}</StyledParagraphInfo>
                <StyledParagraphInfo>SEATS: {this.state.seats.map(seat => {return seat + " "})}</StyledParagraphInfo>
            </StyledShoppingCart>
            <StyledShoppingCartButton>
                    BUY TICKETS
                    <FontAwesomeIcon icon='shopping-cart' size='2x'/>
                </StyledShoppingCartButton>
        </StyledReservationSite>
   );
   }
}

