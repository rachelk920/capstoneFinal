import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {BACKEND_URL} from '../config'
import '../styles/Attractions.css'
import { Db } from 'mongodb';


const Attraction = (props) => {
    return (
        <div className='allAttractions'>
            <div className='attractionsCard' data-aos="flip-up">
                <div className='cardImage'>
                    <img className='attractionImage' src={props.attraction.imageURL} alt='attraction' />
                </div>
                <div>
                    <div className='attractionTitle'>{props.attraction.title}</div>
                    <div className='attractionDescription'>{props.attraction.description}</div>
                    <div className='attractionLocation'>{props.attraction.location}</div>
                    <a className='attractionWeb' href={props.attraction.website} target="_blank" rel="noreferrer">Visit</a>
                </div>
            </div>
        </div>
    )
}

     
export default class Attractions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attractions:[],
            loading: true
        };
    }
    componentDidMount() {
        axios.get(BACKEND_URL + 'attractions/')
        .then(response => {
            this.setState({
                attractions: response.data,
                restaurants:response.data,
                loading: false
            })
            console.log('this is the list of attractions')
        })
        .catch((error) => {
            console.log(error)
        });
    }



    AttractionsList() {
        return this.state.attractions.map((currentAttraction) => {
           return <Attraction attraction = {currentAttraction} key={currentAttraction._id} />
        })
   }


    render() {
        return (
        
            this.state.loading === false ? (
                <div className='row'>
                <div className="jumbotron jumbotron-fluid attracthover">
          <div className="attractcontainer">
              <h1>Explore Cincinnati</h1>
          </div>
      </div>
      <div className='attractheader'>
          <h1>The Queen City <span className='crown'><i class="fas fa-crown fa-xs"></i></span> Porkopolis <span className='crown'><i class="fas fa-crown fa-xs"></i></span> The City That Sings <span className='crown'><i class="fas fa-crown fa-xs"></i></span> The 'Nati</h1>
          <h2>WHATEVER NAME YOU KNOW US BY, THERE'S ONLY ONE CINCINNATI</h2>
      </div>
      
                <div className='AttractionsContainer'>
                    <h2 className='AttractionsHeader'></h2>
                    <div className='AttractionsInnerContainer'>
                        {this.AttractionsList()}
                    </div>  </div>
                    <div className="container att">
                    <div>
                    <h2>Did We Miss Your Favorite Attraction?</h2><br/></div>
                    <div>
                   <a href="/NewAttraction" class="button">Add Attraction</a></div></div>
                    </div>
            ) : (
                <div>
                    <h1 className="loading-spinner">Loading...</h1>
                </div>
            )
        )
    }
}