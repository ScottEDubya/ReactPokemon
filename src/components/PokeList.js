//Stateless component for rendering a list of pokemon
import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';
import './PokeList.css';

const PokeList = ({pokemonList}) => {
    try {
        //returns an array of pokemon components ready to be put into a list group
        let pokemon = pokemonList.map( creature => ( //implicit return
                <Col sm={6} md={4} key={creature.name}>
                    <ListGroupItem className="PokeList-item">{creature.name}</ListGroupItem>
                </Col>
            )
        );
    
        return (
            <ListGroup>
                {pokemon}
            </ListGroup>
        );
    } catch (err) {
        return (
            <div> Failed to parse pokemon api response </div>
        );
    } 
};

export default PokeList;