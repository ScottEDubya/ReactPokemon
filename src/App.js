//Main app logic
import 'whatwg-fetch';
import React, { Component } from 'react';
import { Col } from 'react-bootstrap/lib/';
import PokeList from './components/PokeList';
import MyPagination from './components/MyPagination';

import logo from './logo.svg';
import './App.css';

require('bootstrap/dist/css/bootstrap.min.css');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pokemon: [],
			activePage: 1,
			limit: 50,
			offset: 0,
			totalPages: 0
		};

		this.loadPokemon = this.loadPokemon.bind(this);
		this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
	}

	loadPokemon(url) {
		return fetch(url).then(res => {return res.json();}).catch( err => {console.error(err);});
	}

	componentDidMount() { //allow the page to mount first so we can show a progress indicator @TODO
		this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
			.then( json => {
				let pages = Math.round(json.count / this.state.limit);
				this.setState({
					pokemon: json.results,
					totalPages: pages,
					count: json.count
				});
			} );
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>

				{/* <!--my components--> */}
				<Col sm={8} md={10} smOffset={2} mdOffset={1}>
					<PokeList pokemonList={this.state.pokemon} />
				</Col>
				<Col sm={12}>
					<MyPagination 
						bsSize="small"
						activePage={this.state.activePage}
						items={this.state.totalPages}
						onSelect={this.handlePaginationSelect}
					/>
				</Col>
			</div>
		);
	}
	
	handlePaginationSelect(pageSelected) {
		let offset = this.state.limit * pageSelected;

		this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`)
			.then( json => {
				this.setState({
					pokemon: json.results,
					offset: offset,
					activePage: pageSelected
				});
			} );
	}
}

export default App;