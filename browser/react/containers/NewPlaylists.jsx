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
    
   
  }
  createPlaylist(e) {
    
    const valor = e.target.value;
    this.setState({ value: valor, flag: true });
    e.preventDefault();
  }
  setFather(e) {
    e.preventDefault();
    this.props.addPlaylist(this.state.value)
    .then((id)=>{this.setState({ value: '', flag:false }), this.props.history.push(`/playlist/${id}`)}
    )
    
    

    
    
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
