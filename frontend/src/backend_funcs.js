import axios from 'axios';

var backend_url = 'http://localhost:5000/api'; // use this for local development
// var backend_url = '/api'; // use this for deployment to AWS

export async function getCollabs(artist) {
    artist = artist.replace(/ /g, '%20')
    const { data } = await axios.get(
      backend_url + `/get_collabs/` + artist,
    );
    return data;
  }
  
export async function getDailyChallenge() {
    const { data } = await axios.get(
      backend_url + `/daily_challenge`
    );
    return data;
  }