import React from 'react';

const NewPlaylist = props => {
  {
    console.log(props);
  }
  return (
    <div className="well">
      <form className="form-horizontal" onSubmit={props.setFather}>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input
                value={props.input}
                className="form-control"
                type="text"
                onChange={props.createPlaylist}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              {(props.flag && props.input.length < 1) ||
              props.input.length > 16 ? (
                <div className="alert alert-warning">Error</div>
              ) : (
                <button type="submit" className="btn btn-success">
                  Create Playlist
                </button>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default NewPlaylist;
