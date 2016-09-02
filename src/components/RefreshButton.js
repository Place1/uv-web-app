import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/RefreshButton.css';

function mapStateToProps(state) {
	return {
		spinning: state.events.fetching,
	};
}

@connect(mapStateToProps, null)
class RefreshButton extends React.Component {

	static propTypes = {
		spinning: PropTypes.bool.isRequired,
		className: PropTypes.string,
		onClick: PropTypes.func,
	}

	static defaultProps = {
		className: ''
	}

	render() {
		const { className, spinning, onClick } = this.props;
		const spinningModifer = spinning ? 'refresh-button--spinning' : '';

		return (
			<i
				onClick={onClick}
				className={`fa fa-refresh ${className} refresh-button ${spinningModifer}`}
			/>
		);
	}
}

export default RefreshButton
