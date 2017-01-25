import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import TabBar from './components/TabBar';
import TopBar from './components/TopBar';
import Login from './views/Login';
import LoadingIndicator from './components/LoadingIndicator';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userInfo.isAuthenticated,
    loading: state.appmeta.loading,
  };
}

@connect(mapStateToProps, null)
class App extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  renderAuthenticated() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="slide-down"
          transitionAppear
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          <TopBar key={1} />
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="navigation-animation"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname,
          })}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="slide-up"
          transitionAppear
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          <TabBar key={1} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  renderLogin() {
    return (
      <Login />
    );
  }

  renderLoading() {
    return (
      <LoadingIndicator />
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    }

    return (
      <div className="app">
        {this.props.isAuthenticated ?
          this.renderAuthenticated() :
          this.renderLogin()
        }
      </div>
    );
  }
}

export default App;
