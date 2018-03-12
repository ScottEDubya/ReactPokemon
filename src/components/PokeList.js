//Component for rendering a list of pokemon with an event handler for all
import 'whatwg-fetch';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap/lib/';
import PokeModal from './PokeModal'
import './PokeList.css';

class PokeList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentPokemonData: null,
            name: ""
        };

        this.showPokeModal = this.showPokeModal.bind(this);
        this.clearPokeModal = this.clearPokeModal.bind(this);
    }

    showPokeModal(name, url) {
        this.setState({
            isLoadingModalData: true,
            name: name,
            currentPokemonData: null
        });
        fetch(url).then(r=>r.json()).then( json => {
            //update modal
            this.setState({
                isLoadingModalData: false,
                currentPokemonData: json
            });
        }).catch( err => {
            console.error(err); //sad modal
        });
    }

    clearPokeModal() { //removes the state affiliated with the recently opened modal
        this.setState({
            name: "",
            currentPokemonData: null,
            isLoadingModalData: false
        });
    }

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
                    { this.state.isLoadingModalData || this.state.currentPokemonData
                        ? <PokeModal
                            currentPokemon={this.state.currentPokemonData}
                            name={this.state.name}
                            clearModal={this.clearPokeModal}
                            />
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