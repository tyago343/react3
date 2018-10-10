import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
export default class NewPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      flag: false,
    };
    this.createPlaylist = this.createPlaylist.bind(this);
    this.setFather = this.setFather.bind(this);
    console.log(props);
  }
  createPlaylist(e) {
    console.log(e.target.value);
    const valor = e.target.value;
    this.setState({ value: valor, flag: true });
    e.preventDefault();
  }
  setFather(e) {
    e.preventDefault();
    this.props.addPlaylist(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <NewPlaylist
        flag={this.state.flag}
        input={this.state.value}
        createPlaylist={this.createPlaylist}
        setFather={this.setFather}
      />
    );
  }
}
