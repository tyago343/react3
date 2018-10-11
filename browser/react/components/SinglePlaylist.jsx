import React from 'react'
import Songs from './Songs'

export default class SinglePlaylist extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.selectPlaylist(this.props.playlistId)
        this.props.getSongs()
    }
    componentWillReceiveProps(nextId){
      

        if(this.props.playlistId !== nextId.playlistId)this.props.selectPlaylist(nextId.playlistId)
    }
    render(){
      console.log(this.props.allSongs)
        return(
                <div>
                    <h3>{ this.props.playlist.name }</h3>
                    <Songs songs={this.props.playlist.songs} /> {/** Hooray for reusability! */}
                    { this.props.playlist.songs && !this.props.playlist.songs.length && <small>No songs.</small> }
                    <hr />
                    <div className="well">
                 <form className="form-horizontal" noValidate name="songSelect">
                   <fieldset>
                     <legend>Add to Playlist</legend>
                     <div className="form-group">
                       <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                       <div className="col-xs-10">
                         <select className="form-control" name="song">
                         {this.props.allSongs.map(elem=>(
                            <option key={elem.id} value={elem.id}>{elem.name}</option>
                         ))}
                           
                         </select>
                       </div>
                     </div>
                     <div className="form-group">
                       <div className="col-xs-10 col-xs-offset-2">
                         <button type="submit" className="btn btn-success">Add Song</button>
                       </div>
                     </div>
                   </fieldset>
                 </form>
               </div>
                </div>
                
        )
    }
} 
