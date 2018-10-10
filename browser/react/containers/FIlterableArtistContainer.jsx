import React from 'react';
import Artists from '../components/Artists';
import FilterInput from '../components/FIlterInput';

export default class FilterableArtistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.filter = this.filter.bind(this);
  }
  filter(e) {
    const valor = [e.target.value];
    this.setState({ value: valor });
  }
  render() {
    return (
      <div>
        <FilterInput filter={this.filter} />
        <Artists artists={this.props.artists} value={this.state.value} />
      </div>
    );
  }
}
