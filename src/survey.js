import React, { Component } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import firebase from "firebase/app"
import "firebase/database";
// import "firebase/compat/firestor";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

var uuid = require("uuid");

const firebaseConfig = {
  apiKey: "AIzaSyB6uzlJn1eACmgTRHB-dup-lsGjZShbP-I",
  authDomain: "surveyform-de6e2.firebaseapp.com",
  projectId: "surveyform-de6e2",
  storageBucket: "surveyform-de6e2.appspot.com",
  messagingSenderId: "1042108859037",
  appId: "1:1042108859037:web:632dde193a9b6af047ca74",
  measurementId: "G-0KX14D2YQQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class Survey extends Component {
  studentnamesubmit(event) {
    var name = this.refs.name.value;
    this.setState({ username: name }, function () {
      console.log(this.state);
    });
  };

  surveysubmit(event) {
    firebase.database().ref('surveyform/'+this.state.uid).set({
        username: this.state.username,
        answers: this.state.answers
      });
    this.setState({ issubmitted: true })
  };

  selans(event) {
    var answers = this.state.answers;

    if (event.target.name === "ans1") {
      answers.ans1 = event.target.value;
    } else if (event.target.name === "ans2") {
      answers.ans2 = event.target.value;
    } else if (event.target.name === "ans3") {
      answers.ans3 = event.target.value;
    } else if (event.target.name === "ans4") {
      answers.ans4 = event.target.value;
    } else if (event.target.name === "ans5") {
      answers.ans5 = event.target.value;
    }
    this.setState({ answers: answers }, function () {
      console.log(this.state);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: uuid.v1(),
      username: "",
      answers: {
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        ans5: "",
      },
      issubmitted: false,
    };
    this.studentnamesubmit = this.studentnamesubmit.bind(this);
    this.surveysubmit = this.surveysubmit.bind(this);
    this.selans = this.selans.bind(this);
  }

  render() {
    var name = "";
    var questions = "";
    if (this.state.username === '' && this.state.issubmitted === false) {
      name = <div className="main_box">
          <p> Please enter your name </p>
          <form onSubmit={this.studentnamesubmit}>
            <input type="text" placeholder="enter your name" ref="name"></input>
          </form>
        </div>;
    } else if (this.state.username !== '' && this.state.issubmitted === false) {
      name = <div>
          <h1>Welcome! {this.state.username}</h1>
        </div>;
      questions = <div>
          <h2>Questions: </h2>
          <form onSubmit={this.surveysubmit}>
            <div className="card">
              <label>
                1. For each device in the application ecosystem, would you like
                to know the number of ports that are exposed to the Internet?
              </label>
              <br />
              <input
                type="radio"
                name="ans1"
                value="Sports"
                onChange={this.selans}
              />
              Yes
              <input
                type="radio"
                name="ans1"
                value="Tech"
                onChange={this.selans}
              />
              No
              <input
                type="radio"
                name="ans1"
                value="Movies"
                onChange={this.selans}
              />
              Movies
              <input
                type="radio"
                name="ans1"
                value="Study"
                onChange={this.selans}
              />
              Study
            </div>

            <div className="card">
              <label>2. What protocols are used for data exchange?</label>
              <br />
              <input
                type="radio"
                name="ans2"
                value="MQTT"
                onChange={this.selans}
              />
              MQTT
              <input
                type="radio"
                name="ans2"
                value="HTTP"
                onChange={this.selans}
              />
              http-based REST APIs
              <input
                type="radio"
                name="ans2"
                value="Other"
                onChange={this.selans}
              />
              Other
              <input
                type="radio"
                name="ans2"
                value="Study"
                onChange={this.selans}
              />
              Study
            </div>

            <div className="card">
              <label>3. Do all the stakeholders use TCP-based protocols?</label>
              <br />
              <input
                type="radio"
                name="ans3"
                value="Sports"
                onChange={this.selans}
              />
              Yes
              <input
                type="radio"
                name="ans3"
                value="Tech"
                onChange={this.selans}
              />
              No
              <input
                type="radio"
                name="ans3"
                value="Movies"
                onChange={this.selans}
              />
              Maybe
              <input
                type="radio"
                name="ans3"
                value="Study"
                onChange={this.selans}
              />
              Dont know
            </div>

            <div className="card">
              <label>
                4. Are there any non-encrypted communications in the application
                ecosystem?
              </label>
              <br />
              <input
                type="radio"
                name="ans4"
                value="Sports"
                onChange={this.selans}
              />
              Yes
              <input
                type="radio"
                name="ans4"
                value="Tech"
                onChange={this.selans}
              />
              No
              <input
                type="radio"
                name="ans4"
                value="Movies"
                onChange={this.selans}
              />
              Maybe
              <input
                type="radio"
                name="ans4"
                value="Study"
                onChange={this.selans}
              />
              Dont know
            </div>

            <div className="card">
              <label>
                5. Would you like to have an independent audit of each
                stakeholder’s security practices?
              </label>
              <br />
              <input
                type="radio"
                name="ans5"
                value="Sports"
                onChange={this.selans}
              />
              Yes
              <input
                type="radio"
                name="ans5"
                value="Tech"
                onChange={this.selans}
              />
              No
              <input
                type="radio"
                name="ans5"
                value="Movies"
                onChange={this.selans}
              />
              Maybe
              <input
                type="radio"
                name="ans5"
                value="Study"
                onChange={this.selans}
              />
              Dont know
            </div>
            <input className="submitbtn" type="submit" value="submit" />
            {/* <button
              type="button"
              className="submitbtn"
              onClick={this.surveysubmit}
            > 
              SUBMIT
            </button>*/}
            </form>
          </div>
        // {/* </div> */}
    }

    return (
      <div>
        {name}
        {questions}
      </div>
    );
  }
}

export default Survey;
