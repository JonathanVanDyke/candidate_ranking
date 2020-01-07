import React from 'react';
import data from '../assets/score-records'
import compData from '../assets/companies'
import { Page, Dash, UserInput, Input, Label } from '../styledComponents/styles'


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      candidateId: '',
      codingPerc: '',
      commPerc: '',
     };
    this.data = data()
    this.compData = compData()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.candidate_code_percentile = this.candidate_code_percentile.bind(this);
  }

  handleChange(event) {
    this.setState({ candidateId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.candidate_communication_percentile(this.state.candidateId);
    let results = this.candidate_code_percentile()
    this.setState({ codingPerc: results[0]});
    this.setState({ commPerc: results[1]});
  }

  similar_companies(company_id1, company_id2) {
    return (this.compData[company_id1] - this.compData[company_id2]) < 0.15
  }

  filter_by_title_and_company(title, company_id) {
    let filtered = this.data.filter((entries) => {
      return entries.title === title && this.similar_companies(entries.company_id, company_id)
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
    let company_id = candidate.company_id
    let title = candidate.title;
    let filtered_set = this.filter_by_title_and_company(title, company_id);

    let sorted_filtered_set_coding = this.sort_data_coding(filtered_set);
    let sorted_filtered_set_communication = this.sort_data_communication(filtered_set);
    
    let rank_code = this.get_rank(sorted_filtered_set_coding, this.state.candidateId)
    let rank_comm = this.get_rank(sorted_filtered_set_communication, this.state.candidateId)
    let coding_percentile = Math.round(((rank_code - 1) / sorted_filtered_set_coding.length) * 100);
    let comm_percentile = Math.round(((rank_comm - 1) / sorted_filtered_set_communication.length) * 100);

    return [coding_percentile, comm_percentile]
  }

  candidate_communication_percentile(candidateId) {

  }

  render() {
    return (
      <Page>
        <Dash>
          <UserInput>
            <form onSubmit={this.handleSubmit}>
              <Label>
                Candidate Id:
                <br/>
                <Input 
                  autoFocus 
                  type="number" 
                  value={this.state.candidateId} 
                  onChange={this.handleChange} 
                />
              </Label>
              <p>{this.state.candidateId ? this.state.candidateId + "'s" : ''} coding percentile is: {this.state.codingPerc}%</p>
              <p>{this.state.candidateId ? this.state.candidateId + "'s" : ''} communication percentile is: {this.state.commPerc}%</p>
            </form>
          </UserInput>
        </Dash>
      </Page>
    );
  }
}

export default Form;