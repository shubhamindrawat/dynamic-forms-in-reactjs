import React, { Component } from 'react';
import './App.css';
import DyamicForm from './components/DyamicForm'

class App extends Component {

  onSubmit = (ModelData) => {
    this.setState({
      data: [ModelData, ...this.state.data]
    })
  }

  render() {
    return (
    
      <div className="App">
        <DyamicForm className="form"
          title="Programmer Survery Form"
          ModelData={[
            {
              key: "Q1",
              label: "Which one is your favorite programming language?",
              "choices": [
                { keydrop: '1', value: "JavaScript" },
                { keydrop: '2', value: "Python" },
                { keydrop: '3', value: "Go" },
                { keydrop: '4', value: "Other" }
              ],
              type: "dropDown",
              "required": false
            },
            {
              key: "Q2",
              label: "Rate your Python skills on the scale of 5?",
              type: "StarRating",
              "choices": ["1", "2", "3", "4", "5"],
              "required": true
            },
            {
              key: "Q3",
              label: "Rate your JavaScript skills on the scale of 5?",
              "type": "StarRating",
              "choices": ["1", "2", "3", "4", "5"],
              "required": true
            },
            {
              key: "Q4",
              label: "Why do you love JavaScript?",
              "type": "multipleChoice",
              "choices": [
                { chkindex: '1', value: "JavaScript is used everywhere." },
                { chkindex: '2', value: "There are lots of high-paying jobs for JavaScript developers" },
                { chkindex: '3', value: "JavaScript is an incredibly expressive and powerful language" }
              ],
              "required": true
            },
            {
              key: "Q5",
              label: "What do you enjoy about programming?",
              type: "textbox",
              "choices": [],
              "required": true 
            }
          ]}
          onSubmit={(ModelData) => this.onSubmit(ModelData)}
        />

      </div>
    );
  }
}

export default App;
