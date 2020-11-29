import React from 'react';
import styled from 'styled-components';

const TopButton = styled.button `
  padding-top: 16px;
  padding-bottom: 16px;
  width: 33%;
  background: white;
  display: block;
  margin-bottom: 30px;
  color: grey;
  border-color: grey;
  margin-top: 35px;
`;

const PrimaryButton = styled.button `
  padding-top: 16px;
  padding-bottom: 16px;
  width: 33%;
  background: white;
  display: block;
  margin-bottom: 30px;
  border-bottom: 4px solid black;
  margin-top: 35px;
`;

class TopButtons extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    if (this.props.currentSort === 'newest') {
      return (
        <div class="row">
          <PrimaryButton onClick={this.props.sortByNewest}>NEWEST</PrimaryButton>
          <TopButton onClick={this.props.sortByHelpful}>HELPFUL</TopButton>
          <TopButton onClick={this.props.sortByRelevance}>RELEVANT</TopButton>
        </div>
      )
    } else if (this.props.currentSort === 'helpful') {
      return (
        <div class= "row">
          <TopButton onClick={this.props.sortByNewest}>NEWEST</TopButton>
          <PrimaryButton onClick={this.props.sortByHelpful}>HELPFUL</PrimaryButton>
          <TopButton onClick={this.props.sortByRelevance}>RELEVANT</TopButton>
        </div>
      )
    } else {
      return (
      <div class= "row">
        <TopButton onClick={this.props.sortByNewest}>NEWEST</TopButton>
        <TopButton onClick={this.props.sortByHelpful}>HELPFUL</TopButton>
        <PrimaryButton onClick={this.props.sortByRelevance}>RELEVANT</PrimaryButton>
      </div>
      )
    }
  }
}

export default TopButtons;