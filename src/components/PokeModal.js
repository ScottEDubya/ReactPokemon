import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap/lib/';
import Spinner from './Spinner';

const centerContent = {
    textAlign: "center"
};

const ModalBodyWrapper = (props) => {
    if(props.currentPokemon) {
        return (
            <Modal.Body>
                {JSON.stringify(props.currentPokemon)}
            </Modal.Body>
        );
    }
    return (
        <Modal.Body style={centerContent}>
            <Spinner url="reactspinner.png"/>
        </Modal.Body>
    );
};

class PokeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
        this.props.clearModal();
    }

    componentWillReceiveProps() {
        this.setState({
            show: true
        });
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton style={centerContent}>
                    <Modal.Title>{this.props.name}</Modal.Title>
                </Modal.Header>

                <ModalBodyWrapper currentPokemon={this.props.currentPokemon}/>

                <Modal.Footer style={centerContent}>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PokeModal;