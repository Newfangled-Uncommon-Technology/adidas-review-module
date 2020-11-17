import React from 'react';
import axios from 'axios';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    return (
      <div>
        <div>{this.props.review.starRating}</div>
        <div>{this.props.review.date}</div>
        <div>{this.props.review.title}</div>
        <div>{this.props.review.text}</div>
        <div>{this.props.review.username}</div>
        <div>Was this review Helpful? {this.props.review.yesCount} {this.props.review.noCount}</div>
      </div>
    )
  }
}

export default Review;