import React from 'react';
import Songs from './Songs';

export default class Playlist extends React.Component {
  componentDidMount() {
    this.props.selectPlaylist(this.props.playlistId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlistId !== this.props.playlistId) {
      this.props.selectPlaylist(nextProps.playlistId);
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.playlist.name}</h3>
        <Songs songs={this.props.playlist.songs} />
        {/** Hooray for reusability! */}
        {this.props.playlist.songs &&
          !this.props.playlist.songs.length && <small>No songs.</small>}
        <hr />
      </div>
    );
  }
}
