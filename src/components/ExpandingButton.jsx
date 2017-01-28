import React, { PropTypes } from 'react';
import '../styles/ExpandingButton.css';

class ExpandingButton extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    expanded: PropTypes.bool, // should the button start expanded
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expanded: props.expanded || false,
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderCollapsed() {
    return (
      <div
        className="expanding-button-collapsed"
        style={{ textAlign: 'center' }}
      >
        {this.props.title}
      </div>
    );
  }

  renderExpanded() {
    return (
      <div className="expanding-button-expanded">{this.props.content}</div>
    );
  }

  render() {
    const expanded = this.state.expanded;
    const modifierClass = !expanded ? 'expanding-button--small' : '';

    return (
      <button
        className={`expanding-button ${modifierClass} ${this.props.className}`}
        onClick={this.handleClick}
      >
        {expanded ? this.renderExpanded() : this.renderCollapsed()}
      </button>
    );
  }
}

export default ExpandingButton;
