import React from 'react';

import FilterInput from '../components/FilterInput';
import Artists from '../components/Artists';

export default class FilterableArtistsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  render() {
    const filteredArtists = this.props.artists.filter(artist => {
      return artist.name
        .toLowerCase()
        .includes(this.state.inputValue.toLowerCase());
    });
    return (
      <div>
        <FilterInput handleChange={this.handleChange} />
        <Artists artists={filteredArtists} />
      </div>
    );
  }
}
