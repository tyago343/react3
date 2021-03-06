import React from 'react';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Albums from '../components/Albums';
import SingleAlbum from '../components/SingleAlbum';
import audio from '../audio';
import Artists from '../components/Artists';
import Artist from '../components/Artist';
import FilterableArtistContainer from './FIlterableArtistContainer';
import NewPlaylists from './NewPlaylists';
import SinglePlaylist from '../components/SinglePlaylist'

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      selectedAlbum: {},
      selectedSong: {},
      isPlaying: false,
      currentSongList: [],
      progress: 0,
      artists: [],
      selectedArtist: {
        albums: [],
        songs: [],
      },
      playList: [],
      selectedPlaylist: {},
      allSongs:[]
    };
    this.selectAlbum = this.selectAlbum.bind(this);
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this)
    this.getSongs = this.getSongs.bind(this)
  }
  addPlaylist(req) {
    return axios
      .post('/api/playlists', { name: req })
      .then(res=>res.data)
      .then(playlist => {
        this.setState({playList : [...this.state.playList, playlist]})
      return playlist.id});      
  }
  componentDidMount() {
    axios
      .get('/api/albums')
      .then(res => res.data)
      .then(albums => this.setState({ albums }));

    axios
      .get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));

    axios
      .get('/api/playlists')
      .then(res => res.data)
      .then(value => this.setState({ playList: value }));

    audio.addEventListener('ended', () => {
      this.next();
    });
    audio.addEventListener('timeupdate', () => {
      this.setState({
        progress: (100 * audio.currentTime) / audio.duration,
      });
    });
  }

  selectAlbum(albumId) {
    axios
      .get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(serverAlbum => this.setState({ selectedAlbum: serverAlbum }));
  }

  selectArtist(artistId) {
    const artistPromise = axios
      .get(`/api/artists/${artistId}`)
      .then(res => res.data);
    const songsPromise = axios
      .get(`/api/artists/${artistId}/songs`)
      .then(res => res.data);
    const albumsPromise = axios
      .get(`/api/artists/${artistId}/albums`)
      .then(res => res.data);
    Promise.all([artistPromise, songsPromise, albumsPromise]).then(
      ([artist, songs, albums]) =>
        this.setState({
          selectedArtist: {
            name: artist.name,
            albums,
            songs,
          },
        }),
    );
  }
  getSongs(){
    axios
      .get(`/api/songs`)
      .then(res => res.data)
      .then(songs => this.setState({ allSongs: songs }));
  }
  
  start(song, songs) {
    this.setState({ selectedSong: song, currentSongList: songs });
    this.loadSong(song.audioUrl);
  }

  loadSong(audioUrl) {
    audio.src = audioUrl;
    audio.load();
    this.play();
  }

  play() {
    audio.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    audio.pause();
    this.setState({ isPlaying: false });
  }

  findSongIndex() {
    return this.state.currentSongList.findIndex(
      song => song.id === this.state.selectedSong.id,
    );
  }

  next() {
    let index = this.findSongIndex() + 1;
    if (index >= this.state.currentSongList.length) {
      index = 0;
    }
    const song = this.state.currentSongList[index];
    this.setState({ selectedSong: song });
    this.loadSong(song.audioUrl);
  }

  previous() {
    let index = this.findSongIndex() - 1;
    if (index < 0) {
      index = this.state.currentSongList.length - 1;
    }
    const song = this.state.currentSongList[index];
    this.setState({ selectedSong: song });
    this.loadSong(song.audioUrl);
  }
  selectPlaylist(playlistId){
    axios
      .get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(value => this.setState({ selectedPlaylist: value }));
  }
  render() {
    const {
      albums,
      selectedAlbum,
      selectedSong,
      isPlaying,
      progress,
      artists,
      selectedArtist,
      playList,
      selectedPlaylist,
      allSongs
    } = this.state;

    return (
      <div id="main" className="container-fluid">
        <Sidebar playList={playList} />
        <div className="col-xs-10">
          <Switch>
            <Route
              exact
              path="/albums"
              render={() => <Albums albums={albums} />}
            />
            <Route
              path="/albums/:id"
              render={({ match }) => (
                <SingleAlbum
                  selectAlbum={this.selectAlbum}
                  selectedSong={selectedSong}
                  start={this.start}
                  album={selectedAlbum}
                  albumId={match.params.id}
                />
              )}
            />
           
            <Route path="/playlist/:playlistid" render={({match})=> <SinglePlaylist allSongs={allSongs} getSongs={this.getSongs} playlist={selectedPlaylist} playlistId={match.params.playlistid} selectPlaylist={this.selectPlaylist} />}/>
            <Route
              path="/artists"
              exact
              render={() => <FilterableArtistContainer artists={artists} />}
            />
            <Route
              path="/artists/:id"
              render={({ match }) => (
                <Artist
                  artistId={match.params.id}
                  url={match.url}
                  path={match.path}
                  artist={selectedArtist}
                  start={this.start}
                  selectedSong={selectedSong}
                  selectArtist={this.selectArtist}
                />
              )}
            />
            <Route
              path="/newplaylist"
              render={({history}) => <NewPlaylists playList={playList} history={history} addPlaylist={this.addPlaylist} />}
            />
            <Redirect from="/" to="/albums" />
          </Switch>
        </div>
        <Footer
          selectedSong={selectedSong}
          isPlaying={isPlaying}
          play={this.play}
          pause={this.pause}
          next={this.next}
          previous={this.previous}
          progress={progress}
        />
      </div>
    );
  }
}
