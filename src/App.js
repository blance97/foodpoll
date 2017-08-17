import React, { Component } from 'react';
import { Progress, Container, Button, Checkbox, Header, Divider, Icon } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Slider from 'react-slick';
import Stepper from './Components/Stepper';
import HomePage from './Components/index';
import About from './Components/About';
import CreatePoll from './Components/CreatePoll';
import SharePoll from './Components/SharePoll';
import Voting from './Components/Voting';
import Results from './Components/Results';
import base from './rebase';
import firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { link: '' }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      let err = {
        code: error.code,
        message: error.message
      }
      console.log(err);
    });
  }


  next() {
    this.slider.slickNext();
  }

  prev() {
    this.slider.slickPrev()
  }


  createPoll(id, data) {
    console.log("id", id);
    console.log("data:", data)
    base.post(id, data).then(() => {
      this.setState({ link: `/vote/${id}` }, () => {
        this.next();
      })
    })
  }

  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false
    };
    const slider = ({ }) => (
      <div>
        <Slider ref={c => this.slider = c} {...settings} >
          <div>
            <CreatePoll next={this.next} prev={this.prev} createPoll={(id, data) => this.createPoll(`${id}`, { data })} />
          </div>
          <div>
            <SharePoll next={this.next} prev={this.prev} link={this.state.link} />
          </div>
        </Slider></div>
    );

    return (
      <div style={{ backgroundColor: "#424242", minHeight: "100vh" }}>
        <Router>
          <div>
            <Stepper />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/about" component={About} />
              <Route path="/createPoll" component={slider} />
              <Route path="/vote/:id" component={Voting} />
              <Route path="/results/:id" component={Results} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </Router>
      </div >
    )
  }
}

export default App;
