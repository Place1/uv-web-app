import React, { PropTypes } from 'react';

class ExpandingButton extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		content: PropTypes.node.isRequired,
		expanded: PropTypes.bool, // should the button start expanded
	}

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			expanded: props.expanded || false
		}
	}

	handleClick(e) {
		e.preventDefault();
		this.setState({
			expanded: !this.state.expanded
		});
	}

	renderCollapsed() {
		return (
			<div
				className="ExpandingButton-collapsed"
				style={{textAlign: "center"}}
			>
				{this.props.title}
			</div>
		);
	}

	renderExpanded() {
		return  (
			<div className="ExpandingButton-expanded">{this.props.content}</div>
		);
	}

	render() {
		return (
			<div
				className="ExpandingButton"
				onClick={this.handleClick}
			>
				{this.state.expanded ? this.renderExpanded() : this.renderCollapsed()}
			</div>
		);
	}
}

export default ExpandingButton
