import React, { Component } from 'react';
import ConnectingWave from './ConnectingWave';
import {getCollabs, getDailyChallenge} from './backend_funcs'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

class Game extends Component {

    constructor() {
        super();
        this.state = {
            currentArtist : '',
            startArtist : '',
            goalArtist: '',
            startURL : "https://cdn.discordapp.com/attachments/1082138240586362910/1087437146350162022/ab67616d0000b273fd61ea11e50ba0b7eade9466.jpg",
            goalURL : "https://www.seren.bangor.ac.uk/wp-content/uploads/2022/10/Clairo.png",
            path : '',
            collabs : [],
            query : ''
        };
    }

    async componentDidMount() {
        /* this function is called once the page loads, so below we are getting the 
           connecting artists and updating all of the important state information
         */
        const challenge = await getDailyChallenge();
        this.setState({startArtist : challenge['start']});
        this.setState({goalArtist : challenge['end']});
        this.setState({currentArtist : challenge['start']});
        const real_collabs = await getCollabs(this.state.currentArtist);
        this.setState({collabs : real_collabs['data']});
        this.setState({path : this.state.currentArtist});
    }

    updateItems = async () => {
        const new_collabs = await getCollabs(this.state.query);
        if (new_collabs['valid']) {
          this.setState({collabs : new_collabs['data']});
          const updated_path = this.state.path + ', ' + this.state.query;
          this.setState({path : updated_path});
        }
        this.setState({query : ''});
      }

      updateQuery = (string) => {
        // when called from onSelect
        if (typeof string === "object") {
          string = string['name'];
        }
        this.setState({query : string})
      }
    
      formatResult = (item) => {
        return (
          <>
          <span style={{ display: 'block', textAlign: 'left' }}>artist: {item.name}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>song: {item.song}</span>
          </>
        )
      }

    render() {
        return (
            <div>
                <ConnectingWave start_artist={this.state.startArtist} end_url={this.state.goalURL}
                end_artist={this.state.goalArtist} start_url={this.state.startURL}/>
                <p> Current path: {this.state.path} </p>
                <div id='autocomplete'>
                <ReactSearchAutocomplete
                items = {this.state.collabs}
                onSearch = {this.updateQuery}
                onSelect = {this.updateQuery}
                inputDebounce = '5'
                formatResult = {this.formatResult}
                inputSearchString = {this.state.query}   
                />
            </div>
          <button class="button" onClick={this.updateItems}>Search</button>
             </div>
        );
    }

}

export default Game;