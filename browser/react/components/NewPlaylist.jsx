import React from 'react';
import axios from 'axios';

export default class NewPlaylist extends React.Component {
  constructor() {
    super();
    this.state = {
      newPlayName: '',
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  handleChange(e) {
    const playlistName = e.target.value;
    if (playlistName.length > 16 || playlistName.length === 0) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });
    }
    this.setState({
      newPlayName: playlistName,
    });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.addPlaylist(this.state.newPlayName);
    this.setState({ newPlayName: '' });
  }
  render() {
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.onFormSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.newPlayName}
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  disabled={this.state.error}
                  className="btn btn-success"
                >
                  Create Playlist
                </button>
              </div>
            </div>
            {this.state.error && (
              <p className="alert alert-danger">
                El nombre de la Playlist es un campo requerido y no puede tener
                más de 16 carácteres
              </p>
            )}
          </fieldset>
        </form>
      </div>
    );
  }
}
