import React from 'react';
import data from '../assets/score-records'
import styled from 'styled-components';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      candidateId: '',
      codingPerc: '',
      commPerc: '',
     };

    this.data = data()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ candidateId: event.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.candidateId);
    event.preventDefault();
    // this.setState({candidateId: 'submitted!'});
    // this.candidate_code_percentile(this.state.candidateId);
    this.candidate_communication_percentile(this.state.candidateId);
    this.setState({codingPerc: 'submitted!'});
    this.setState({commPerc: 'submitted!'});
    this.candidate_code_percentile()
  }

  filter_by_title(title) {
    let filtered = this.data.filter((entries) => {
      return entries.title === title
    })
    // console.log(filtered.slice(0, 5))
    return filtered
  }

  rank_col_by_name(data, filtered_set, col_name, rank_col) {
    
    let sorted = filtered_set.slice().sort(function (a, b) { return b - a })
    let ranks = filtered_set.slice().map(function (v) { return sorted.indexOf(v) + 1 });
    return
  }

  find_candidate_by_id() {
    // debugger
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].candidate_id === this.state.candidateId) {
        return this.data[i]
      }
    }
    return 'no candidate found'
  }

  candidate_code_percentile() {
    let candidate = this.find_candidate_by_id();
    let filtered_set = this.filter_by_title('Engineer')
    console.log(candidate);
  }

  candidate_communication_percentile(candidateId) {

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
        {/* <h1>{this.state.candidateId}'s communication percentile is: {this.state.commPerc}</h1> */}
      </form>
    );
  }
}

export default Form;