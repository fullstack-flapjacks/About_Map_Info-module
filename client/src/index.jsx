import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import bluebird from 'bluebird';
import Description from './components/Description.jsx';
import LeftAbout from './components/LeftAbout.jsx'
import Maps from './components/Map.jsx';
import Ratings from './components/Ratings.jsx';
import RightAbout from './components/RightAbout.jsx';
import Title from './components/Title.jsx';
import TopTags from './components/TopTags.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}, 
      isLoading: true,
      readmore: false //readmore button not toggled
    };
  }

  fetch() {
    let path = this.props.id;
    let id = path.split('/');

    this.getInformation(id[2]);
  }

  //send GET request to get the about information for the restaurant 
  getInformation(restaurant_id) {
    axios.get(`http://127.0.0.1:1127/r/${restaurant_id}/about`)
    .then((response) => {
      console.log(response);
      this.setState({
        restaurant: response.data,
        isLoading: false, 
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  //use native Component Will Mount to invoke the randomSearch function above before rendering
  componentWillMount() {
    this.fetch();
  }

  //will rerender the description when clicked
  readMore() {
    if (this.state.readmore === false) {
      this.setState(prevState => ({
        readmore: !prevState.readmore
      }));
    } 
  }

  //will rerender the description when clicked 
  readLess() {
    if (this.state.readmore === true) {
      this.setState(prevState => ({
        readmore: !prevState.readmore
      }));
    }
  }

  //will unveal the box of text when button is clicked
  reveal() {
    $('.info-box').css('max-height', '800px');
    $('.reveal').css('bottom', '');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <h1>This Page Is Currently Loading</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Title restaurant={this.state.restaurant}/>
          <Ratings restaurant={this.state.restaurant} />
          <TopTags restaurant={this.state.restaurant}/>
          <Description restaurant={this.state.restaurant} readMore={this.readMore.bind(this)} readLess={this.readLess.bind(this)} toggled={this.state.readmore}/>
          <div className='info-box' style={{maxHeight: '300px', position: 'relative', overflow: 'hidden'}}>
            <table style={{marginTop: '15px', marginBottom: '15px', marginRight: '700px', marginLeft: '300px'}}>
              <tbody>
                <tr>
                  <td style={{width: '60%'}}><LeftAbout restaurant={this.state.restaurant}/></td>
                  <td><Maps restaurant={this.state.restaurant}/><RightAbout restaurant={this.state.restaurant}/></td>
                </tr>
              </tbody>
            </table>
          <div className='reveal' style={{position: 'absolute', bottom: '0', width: '40.5%', textAlign: 'center', 
             backgroundImage: 'linear-gradient(to bottom, transparent, #CACACA)', marginRight: '700px', marginLeft: '300px'}}>
            <button className='show-more' onClick={this.reveal.bind(this)} style={{font: 'arial', color: 'red', width: '35%', border: 'bold', background: 'white'}}>View All Details</button></div>
          </div>
        </div> 
      )
    }
  }
}

// export default ReactDOM.render(<App />, document.getElementById('app'));
window.App = App;