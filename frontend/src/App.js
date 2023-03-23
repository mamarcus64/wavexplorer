import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  // backend_url = 'http://localhost:5000/api'; // use this for local development
  backend_url = '/api'; // use this for deployment to AWS

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
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h5> wavexplorer </h5>
        {/* <a
          className="App-link"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          For your consideration...
        </a>
        <br/>
        <input type='submit' onClick={this.handleSubmit} value='Press to ping backend' />
        <p id='backend_response'>Response: {answer} </p> */}
      
      </header>
      <body className="App-body">
        <h1>Can you find the path?</h1>
        <div class="row">
          <div class="column">
            <img src="https://cdn.discordapp.com/attachments/1082138240586362910/1087437146350162022/ab67616d0000b273fd61ea11e50ba0b7eade9466.jpg"
             alt="Kanye West avatar"/>
            <h2>Kanye West</h2>
          </div>
          <div class="svg-container">
          <svg width="779" height="44" viewBox="0 0 779 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 39.9317L5.93233 39.7528L7.86466 39.4645L9.79699 39.0686L11.7293 38.5673L13.6617 37.964L15.594 37.2622L17.5263 36.4663L19.4586 35.5813L21.391 34.6125L23.3233 33.5659L25.2556 32.448L27.188 31.2657L29.1203 30.0263L31.0526 28.7374L32.985 27.407L34.9173 26.0432L36.8496 24.6545L38.782 23.2495L40.7143 21.8367L42.6466 20.425L44.5789 19.0229L46.5113 17.6392L48.4436 16.2824L50.3759 14.9608L52.3083 13.6827L54.2406 12.4558L56.1729 11.2878L58.1053 10.1858L60.0376 9.15662L61.9699 8.20665L63.9023 7.34172L65.8346 6.56717L67.7669 5.88775L69.6992 5.30768L71.6316 4.83053L73.5639 4.45923L75.4962 4.19607L77.4286 4.04268L79.3609 4L81.2932 4.0683L83.2256 4.24715L85.1579 4.53547L87.0902 4.93144L89.0226 5.43266L90.9549 6.03602L92.8872 6.7378L94.8195 7.53367L96.7519 8.41874L98.6842 9.38754L100.617 10.4341L102.549 11.552L104.481 12.7343L106.414 13.9737L108.346 15.2626L110.278 16.593L112.211 17.9568L114.143 19.3455L116.075 20.7505L118.008 22.1633L119.94 23.575L121.872 24.9771L123.805 26.3608L125.737 27.7176L127.669 29.0392L129.602 30.3173L131.534 31.5442L133.466 32.7122L135.398 33.8142L137.331 34.8434L139.263 35.7934L141.195 36.6583L143.128 37.4328L145.06 38.1122L146.992 38.6923L148.925 39.1695L150.857 39.5408L152.789 39.8039L154.722 39.9573L156.654 40L158.586 39.9317L160.519 39.7528L162.451 39.4645L164.383 39.0686L166.316 38.5673L168.248 37.964L170.18 37.2622L172.113 36.4663L174.045 35.5813L175.977 34.6125L177.91 33.5659L179.842 32.448L181.774 31.2657L183.707 30.0263L185.639 28.7374L187.571 27.407L189.504 26.0432L191.436 24.6545L193.368 23.2495L195.301 21.8367L197.233 20.425L199.165 19.0229L201.098 17.6392L203.03 16.2824L204.962 14.9608L206.895 13.6827L208.827 12.4558L210.759 11.2878L212.692 10.1858L214.624 9.15662L216.556 8.20665L218.489 7.34172L220.421 6.56717L222.353 5.88775L224.286 5.30768L226.218 4.83053L228.15 4.45923L230.083 4.19607L232.015 4.04268L233.947 4L235.88 4.0683L237.812 4.24715L239.744 4.53547L241.677 4.93144L243.609 5.43266L245.541 6.03602L247.474 6.7378L249.406 7.53367L251.338 8.41874L253.271 9.38754L255.203 10.4341L257.135 11.552L259.068 12.7343L261 13.9737L262.932 15.2626L264.865 16.593L266.797 17.9568L268.729 19.3455L270.662 20.7505L272.594 22.1633L274.526 23.575L276.459 24.9771L278.391 26.3608L280.323 27.7176L282.256 29.0392L284.188 30.3173L286.12 31.5442L288.053 32.7122L289.985 33.8142L291.917 34.8434L293.85 35.7934L295.782 36.6583L297.714 37.4328L299.647 38.1122L301.579 38.6923L303.511 39.1695L305.444 39.5408L307.376 39.8039L309.308 39.9573L311.241 40L313.173 39.9317L315.105 39.7528L317.038 39.4645L318.97 39.0686L320.902 38.5673L322.835 37.964L324.767 37.2622L326.699 36.4663L328.632 35.5813L330.564 34.6125L332.496 33.5659L334.429 32.448L336.361 31.2657L338.293 30.0263L340.226 28.7374L342.158 27.407L344.09 26.0432L346.023 24.6545L347.955 23.2495L349.887 21.8367L351.82 20.425L353.752 19.0229L355.684 17.6392L357.617 16.2824L359.549 14.9608L361.481 13.6827L363.414 12.4558L365.346 11.2878L367.278 10.1858L369.211 9.15662L371.143 8.20665L373.075 7.34172L375.008 6.56717L376.94 5.88775L378.872 5.30768L380.805 4.83053L382.737 4.45923L384.669 4.19607L386.602 4.04268L388.534 4L390.466 4.0683L392.398 4.24715L394.331 4.53547L396.263 4.93144L398.195 5.43266L400.128 6.03602L402.06 6.7378L403.992 7.53367L405.925 8.41874L407.857 9.38754L409.789 10.4341L411.722 11.552L413.654 12.7343L415.586 13.9737L417.519 15.2626L419.451 16.593L421.383 17.9568L423.316 19.3455L425.248 20.7505L427.18 22.1633L429.113 23.575L431.045 24.9771L432.977 26.3608L434.91 27.7176L436.842 29.0392L438.774 30.3173L440.707 31.5442L442.639 32.7122L444.571 33.8142L446.504 34.8434L448.436 35.7934L450.368 36.6583L452.301 37.4328L454.233 38.1122L456.165 38.6923L458.098 39.1695L460.03 39.5408L461.962 39.8039L463.895 39.9573L465.827 40L467.759 39.9317L469.692 39.7528L471.624 39.4645L473.556 39.0686L475.489 38.5673L477.421 37.964L479.353 37.2622L481.286 36.4663L483.218 35.5813L485.15 34.6125L487.083 33.5659L489.015 32.448L490.947 31.2657L492.88 30.0263L494.812 28.7374L496.744 27.407L498.677 26.0432L500.609 24.6545L502.541 23.2495L504.474 21.8367L506.406 20.425L508.338 19.0229L510.271 17.6392L512.203 16.2824L514.135 14.9608L516.068 13.6827L518 12.4558L519.932 11.2878L521.865 10.1858L523.797 9.15662L525.729 8.20665L527.662 7.34172L529.594 6.56717L531.526 5.88775L533.459 5.30768L535.391 4.83053L537.323 4.45923L539.256 4.19607L541.188 4.04268L543.12 4L545.053 4.0683L546.985 4.24715L548.917 4.53547L550.85 4.93144L552.782 5.43266L554.714 6.03602L556.647 6.7378L558.579 7.53367L560.511 8.41874L562.444 9.38754L564.376 10.4341L566.308 11.552L568.241 12.7343L570.173 13.9737L572.105 15.2626L574.038 16.593L575.97 17.9568L577.902 19.3455L579.835 20.7505L581.767 22.1633L583.699 23.575L585.632 24.9771L587.564 26.3608L589.496 27.7176L591.429 29.0392L593.361 30.3173L595.293 31.5442L597.226 32.7122L599.158 33.8142L601.09 34.8434L603.023 35.7934L604.955 36.6583L606.887 37.4328L608.82 38.1122L610.752 38.6923L612.684 39.1695L614.617 39.5408L616.549 39.8039L618.481 39.9573L620.414 40L622.346 39.9317L624.278 39.7528L626.211 39.4645L628.143 39.0686L630.075 38.5673L632.008 37.964L633.94 37.2622L635.872 36.4663L637.805 35.5813L639.737 34.6125L641.669 33.5659L643.602 32.448L645.534 31.2657L647.466 30.0263L649.398 28.7374L651.331 27.407L653.263 26.0432L655.195 24.6545L657.128 23.2495L659.06 21.8367L660.992 20.425L662.925 19.0229L664.857 17.6392L666.789 16.2824L668.722 14.9608L670.654 13.6827L672.586 12.4558L674.519 11.2878L676.451 10.1858L678.383 9.15662L680.316 8.20665L682.248 7.34172L684.18 6.56717L686.113 5.88775L688.045 5.30768L689.977 4.83053L691.91 4.45923L693.842 4.19607L695.774 4.04268L697.707 4L699.639 4.0683L701.571 4.24715L703.504 4.53547L705.436 4.93144L707.368 5.43266L709.301 6.03602L711.233 6.7378L713.165 7.53367L715.098 8.41874L717.03 9.38754L718.962 10.4341L720.895 11.552L722.827 12.7343L724.759 13.9737L726.692 15.2626L728.624 16.593L730.556 17.9568L732.489 19.3455L734.421 20.7505L736.353 22.1633L738.286 23.575L740.218 24.9771L742.15 26.3608L744.083 27.7176L746.015 29.0392L747.947 30.3173L749.88 31.5442L751.812 32.7122L753.744 33.8142L755.677 34.8434L757.609 35.7934L759.541 36.6583L761.474 37.4328L763.406 38.1122L765.338 38.6923L767.271 39.1695L769.203 39.5408L771.135 39.8039L773.068 39.9573L775 40" stroke="#F78C58" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </div>
          <div class="column">
            <img src="https://www.seren.bangor.ac.uk/wp-content/uploads/2022/10/Clairo.png" alt="Clairo avatar"/>
            <h2>Clairo</h2>
          </div>
        </div>
        <button class="button button1">Play</button>
        <h6>About</h6>
      </body>
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
