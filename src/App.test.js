import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './components/Spinner';

it('renders a spinner without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Spinner url="reactspinner.png"/>, div);
	ReactDOM.unmountComponentAtNode(div);
});