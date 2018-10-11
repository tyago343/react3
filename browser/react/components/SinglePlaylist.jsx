import React from 'react'
import Songs from './Songs'

export default class SinglePlaylist extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.selectPlaylist(this.props.playlistId)
    }
    componentWillReceiveProps(nextId){
      

        if(this.props.playlistId !== nextId.playlistId)this.props.selectPlaylist(nextId.playlistId)
    }
    render(){
        return(
                <div>
                    <h3>{ this.props.playlist.name }</h3>
                    <Songs songs={this.props.playlist.songs} /> {/** Hooray for reusability! */}
                    { this.props.playlist.songs && !this.props.playlist.songs.length && <small>No songs.</small> }
                    <hr />
                </div>
        )
    }
} 
