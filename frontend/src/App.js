import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  // backend_url = 'http://localhost:5000/api';
  // backend_url = 'http://flask-env.eba-d7yx62pk.us-east-1.elasticbeanstalk.com/api';
  backend_url = '/api';

  state = {
    answer: ""
  }

  pingAPI = async () => {
    const { data } = await axios.get(
      this.backend_url + `/ping_backend`,
    );
    return data['data'];
  }

  handleChange = (event) => {
    this.setState({question: event.target.value});
  }

  handleSubmit = async (event) => {
    // this.fetchAnswer();
    // event.preventDefault();
    const answer = await this.pingAPI();
    this.setState({answer});
    event.preventDefault();
  }

  fetchAnswer = async () => {
    const { question } = this.state;
    const { data } = await axios.post(
      this.backend_url + `/submit_question`, { question }
    );
    const { answer } = data;
    this.setState({answer})
  }

  render() {
    const { answer } = this.state;
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          waxexplorer development in progress...
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          For your consideration...
        </a>
        <br/>
        <input type='submit' onClick={this.handleSubmit} value='Press to ping backend' />
        <p id='backend_response'>Response: {answer} </p>
      </header>
    </div>
      // <div className="App">
      //   <header className="App-header">
      //   <h1>List of topics to ask a question on</h1>
      //   <ul>
      //     {topics.map(topic => (<li key={topic}>{topic}</li>))}
      //   </ul>
      //     <form onSubmit={this.handleSubmit}>
      //     <label>
      //       Question:
      //       <input type="text" value={question} onChange={this.handleChange} />
      //     </label>
      //     <input type="submit" value="Submit" />
      //   </form>
      //   <h1>Answer: {answer}</h1>
      //   </header>
      // </div>
    );
  }
}

export default App;
