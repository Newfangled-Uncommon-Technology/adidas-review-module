import React from 'react';
import axios from 'axios';

export default class App extends React.Component{
  constructor() {
    super();

    this.state = {
      reviews: [],
      reviewStats: [],
      reviewCount: 0,
      showCount: 2
    }

    this.getReviewStats = this.getReviewStats.bind(this);
  }

  componentDidMount() {
    this.getReviewStats();
  }

  getReviewStats() {
    axios.get('/api/reviews/M20324')
    .then((results) => {
      this.setState({
        reviews: results.data[0],
        reviewCount: results.data[0].reviewCount
      });
      console.log(this.state.reviews);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    if (this.state.reviews === []) {
      return (
        <div>Ratings and Reviews</div>
      )
    } else {
      return (
        <div>{this.state.reviewCount}</div>
      )
    }
  }
}