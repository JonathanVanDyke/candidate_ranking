import React from 'react';
import styled from 'styled-components';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      candidateId: '',
      codingPerc: '',
      commPerc: '',
     };
    console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ candidateId: event.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.candidateId);
    event.preventDefault();
    this.setState({candidateId: 'submitted!'});
    this.setState({codingPerc: 'submitted!'});
    this.setState({commPerc: 'submitted!'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Candidate Id:
          <br></br>
          <input type="text" value={this.state.candidateId} onChange={this.handleChange} />
        </label>
        <br>
        </br>
        <input type="submit" value="Submit" />
        <h1>{this.state.candidateId}</h1>
        <h1>{this.state.candidateId}'s coding percentile is: {this.state.codingPerc}</h1>
        <h1>{this.state.candidateId}'s communication percentile is: {this.state.commPerc}</h1>
      </form>
    );
  }
}

export default Form;