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
    return filtered
  }

  sort_data_coding(dataSet) {
    return dataSet.slice().sort(function(a,b) {
      return Number(a.coding_score) > Number(b.coding_score) ? 1 : Number(a.coding_score) < Number(b.coding_score) ? -1 : 0
    })
  }

  sort_data_communication(dataSet) {
    return dataSet.slice().sort(function(a,b) {
      return Number(a.communication_score) > Number(b.communication_score) ? 1 : Number(a.communication_score) < Number(b.communication_score) ? -1 : 0
    })
  }

  get_rank(dataSet, candidateId) {
    for (let i = 0; i < dataSet.length; i++) {
      if (dataSet[i].candidate_id === candidateId) {
        return i + 1
      }
    }
    return 'no candidate found'
  }

  find_candidate_by_id() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].candidate_id === this.state.candidateId) {
        return this.data[i]
      }
    }
    return 'no candidate found'
  }

  candidate_code_percentile() {
    let candidate = this.find_candidate_by_id();
    let title = candidate.title;
    let filtered_set = this.filter_by_title(title);
    console.log(candidate);
    console.log(filtered_set.slice(0,3));
    let sorted_filtered_set_coding = this.sort_data_coding(filtered_set);
    console.log(sorted_filtered_set_coding);
    let rank = this.get_rank(sorted_filtered_set_coding, this.state.candidateId)
    console.log(rank)
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