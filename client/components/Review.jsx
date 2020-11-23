import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BlackBar = styled.hr `
  border: 1px solid black;
`;

const Star = styled.div `
  display: inline;
  width: 4%;
`;

const Date = styled.div `
  position: absolute;
  right: 15px;
`;

const Title = styled.h5 `
  margin-top: 5px;
`;

const HelpfulButton = styled.button `
  border: none;
  background: white;
  text-decoration: underline;
  padding-right: 3px;
  padding-left: 3px;
  :hover {
    background: black;
    color: white;
  }
`;

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yesCount: this.props.review.yesCount,
      noCount: this.props.review.noCount,
      feedbackSubmitted: false
    }

    this.addYes = this.addYes.bind(this);
    this.addNo = this.addNo.bind(this);
  }

  addYes() {
    axios.put('/api/reviews/yes/M20324', {
      "reviewId": this.props.review.reviewId,
      "increment": 1
    })
    .then(() => {
      var nextYes = this.state.yesCount + 1;
      this.setState({
        yesCount: nextYes,
        feedbackSubmitted: true
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  addNo() {
    axios.put('/api/reviews/no/M20324', {
      "reviewId": this.props.review.reviewId,
      "increment": 1
    })
    .then(() => {
      var nextNo = this.state.noCount + 1;
      this.setState({
        noCount: nextNo,
        feedbackSubmitted: true
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    var starArr = [];
    for (var i = 0; i < this.props.review.starRating; i++) {
      starArr.push('filled');
    }
    for (var i = 5; i > this.props.review.starRating; i--) {
      starArr.push('unfilled');
    }


    if (!this.state.feedbackSubmitted) {
    return (
      <div>
        <div class="row">
        {starArr.map((fillStatus, index) => {
                  if (fillStatus === 'filled') {
                    return (
                      <Star>
                      <svg class="gl-star-rating__star" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-rating__fill" fill="currentColor" stroke="0" d="M13.277,6.182L9.697,8.782L11.057,12.992L7.487,10.392L3.907,12.992L5.277,8.782L1.697,6.182L6.117,6.182L7.487,1.992L8.857,6.182L13.277,6.182Z"></path></svg>
                      </Star>
                    )
                  } else {
                    return (
                      <Star>
                      <svg class="gl-star-rating__star" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-rating__outline"  fill="none" stroke="currentColor" stroke-miterlimit="10" d="M13.277,6.182L9.697,8.782L11.057,12.992L7.487,10.392L3.907,12.992L5.277, 8.782L1.697,6.182L6.117,6.182L7.487,1.992L8.857,6.182L13.277,6.182Z"></path></svg>
                      </Star>
                    )
                  }
        })}

        <Date>{this.props.review.date}</Date>
        </div>
        <Title>{this.props.review.title}</Title>
        <div>{this.props.review.text}</div>
        <h5>{this.props.review.username}</h5>
        <div>Was this review Helpful? <HelpfulButton onClick={this.addYes}>Yes</HelpfulButton>({this.props.review.yesCount})  <HelpfulButton onClick={this.addNo}>No</HelpfulButton>({this.props.review.noCount})</div>
        <BlackBar></BlackBar>
      </div>
    )
    } else {
      return (
        <div>
        <div class="row">
        {starArr.map((fillStatus, index) => {
                  if (fillStatus === 'filled') {
                    return (
                      <Star>
                      <svg class="gl-star-rating__star" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-rating__fill" fill="currentColor" stroke="0" d="M13.277,6.182L9.697,8.782L11.057,12.992L7.487,10.392L3.907,12.992L5.277,8.782L1.697,6.182L6.117,6.182L7.487,1.992L8.857,6.182L13.277,6.182Z"></path></svg>
                      </Star>
                    )
                  } else {
                    return (
                      <Star>
                      <svg class="gl-star-rating__star" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-rating__outline"  fill="none" stroke="currentColor" stroke-miterlimit="10" d="M13.277,6.182L9.697,8.782L11.057,12.992L7.487,10.392L3.907,12.992L5.277, 8.782L1.697,6.182L6.117,6.182L7.487,1.992L8.857,6.182L13.277,6.182Z"></path></svg>
                      </Star>
                    )
                  }
        })}

        <Date>{this.props.review.date}</Date>
        </div>
        <Title>{this.props.review.title}</Title>
        <div>{this.props.review.text}</div>
        <h5>{this.props.review.username}</h5>
        <div>Was this review Helpful? <HelpfulButton onClick={this.addYes}>Yes</HelpfulButton>({this.props.review.yesCount})  <HelpfulButton onClick={this.addNo}>No</HelpfulButton>({this.props.review.noCount})</div>
        <br></br>
        <div>Thank you! You have successfully submitted feedback for this review</div>
        <BlackBar></BlackBar>
      </div>
      )
    }
  }
}

export default Review;