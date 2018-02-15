import React from 'react';
import { Link } from 'react-router-dom';

export default ({ playlists }) => (
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
            {playlists &&
              playlists.map(playlist => {
                return (
                  <li className="playlist-item menu-item" key={playlist.id}>
                    <Link to={`/playlists/${playlist.id}`}>
                      {playlist.name}
                    </Link>
                  </li>
                );
              })}
          </ul>

          <Link className="btn btn-primary btn-block" to="/playlists/add">
            <span className="glyphicon glyphicon-plus" /> PLAYLIST
          </Link>
        </h4>
      </section>
    </sidebar>
  </div>
);
