import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BlackBar = styled.hr `
  border: 1px solid black;
`;

const Star = styled.div `
  display: inline;
  width: 12%;
`;

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    var starArr = [];
    for (var i = 0; i < this.props.review.starRating; i++) {
      starArr.push('filled');
    }
    for (var i = 5; i > this.props.review.starRating; i--) {
      starArr.push('unfilled');
    }

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
        </div>
        <div>{this.props.review.date}</div>
        <div>{this.props.review.title}</div>
        <div>{this.props.review.text}</div>
        <div>{this.props.review.username}</div>
        <div>Was this review Helpful? {this.props.review.yesCount} {this.props.review.noCount}</div>
        <BlackBar></BlackBar>
      </div>
    )
  }
}

export default Review;