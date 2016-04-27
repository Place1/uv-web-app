import React from 'react';
import ReactDOM from 'react-dom';
import Upcoming from './views/Upcoming';

class App extends React.Component {

	render() {
		return (
			<div>
				<Upcoming />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('App'));
