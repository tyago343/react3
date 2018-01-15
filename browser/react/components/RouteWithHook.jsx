import React from 'react';
import { Route } from 'react-router-dom';

class HigherComponent extends React.Component {
  componentDidMount() {
    this.props.onEnter(this.props)
  }

  render() {
    const { component: Component } =  this.props
    return <Component />;
  }
}

const RouteWithHook = ({ path, component, onEnter }) => (
  <Route 
    path={path} 
    render={({ match }) => <HigherComponent onEnter={onEnter} component={component} match={match} /> } />
);

export default RouteWithHook;

