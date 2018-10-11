import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className="col-xs-2">
    <sidebar>
      <img src="/juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/albums">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item active">
          <Link to="/artists">ARTISTS</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        <h4>
          <ul className="list-unstyled">
            {props.playList.map(playlist => {
              return (
                <li key={playlist.id} className="playlist-item menu-item">
                  <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                </li>
              );
            })}
          </ul>
          <Link className="btn btn-primary btn-block" to="/newplaylist">
            <span className="glyphicon glyphicon-plus" /> PLAYLIST
          </Link>
        </h4>
      </section>
    </sidebar>
  </div>
);
