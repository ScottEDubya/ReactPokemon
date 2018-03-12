//Component for rendering a list of pokemon with an event handler for all
import 'whatwg-fetch';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';
import PokeModal from './PokeModal'
import './PokeList.css';

class PokeList extends Component {
    constructor(props) {
        super(props);
        this.showPokeModal = this.showPokeModal.bind(this);
        this.state = {
            currentPokemon: null
        };
    }

    showPokeModal(name, url) {
        this.setState({
            isLoadingModalData: true,
            name: name,
            currentPokemon: null
        });
        fetch(url).then(r=>r.json()).then( json => {
            //update modal
            this.setState({
                currentPokemon: json
            });
        }).catch( err => {
            console.error(err); //sad modal
        });
    }

    // shouldComponentUpdate() {
    // }

    render() {
        try {
            //returns an array of pokemon components ready to be put into a list group
            let pokemon = this.props.pokemonList.map( creature => ( //implicit return
                <Col sm={6} md={4} key={creature.name}>
                    <a onClick={() => this.showPokeModal(creature.name, creature.url)}>
                        <ListGroupItem className="PokeList-item">{creature.name}</ListGroupItem>
                    </a>
                </Col>
                )
            );
        
            return (
                <div>
                    { this.state.isLoadingModalData || this.state.currentPokemon
                        ? <PokeModal currentPokemon={this.state.currentPokemon} name={this.state.name} />
                        : ""
                    }
                    <ListGroup>
                        {pokemon}
                    </ListGroup>
                </div>
            );
        } catch (err) {
            return (
                <div> Failed to parse pokemon api response </div>
            );
        } 
    }
};
    
export default PokeList;