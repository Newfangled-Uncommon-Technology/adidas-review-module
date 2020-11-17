import React from 'react';
import axios from 'axios';

export default class App extends React.Component{
  constructor() {
    super();

    this.state = {
      reviews: [],
      reviewStats: [],
      reviewCount: 0,
      reviewId: [],
      username: [],
      title: [],
      text: [],
      yesCount: [],
      noCount: [],
      date: [],
      starRating: [],
      sizeRating: [],
      widthRating: [],
      comfortRating: [],
      qualityRating: [],
      showCount: [0, 1]
    }

    this.getReviews = this.getReviews.bind(this);
    this.getReviewStats = this.getReviewStats.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getReviewStats();
  }

  getReviewStats() {
    axios.get('/api/reviewStats/M20324')
    .then((results) => {
      this.setState({
        reviewStats: results.data[0],
        averageRating: results.data[0].averageRating,
        averageStar: results.data[0].averageStar,
        fiveStar: results.data[0].fiveStar,
        fourStar: results.data[0].fourStar,
        threeStar: results.data[0].threeStar,
        twoStar: results.data[0].twoStar,
        oneStar: results.data[0].oneStar,
        satisfactionPercent: results.data[0].satisfactionPercent,
        averageSize: results.data[0].averageSize,
        averageWidth: results.data[0].averageWidth,
        averageComfort: results.data[0].averageComfort,
        averageQuality: results.data[0].averageQuality
      })
    })
  }

  getReviews() {
    axios.get('/api/reviews/M20324')
    .then((results) => {
      this.setState({
        reviews: results.data[0],
        reviewCount: results.data[0].reviewCount,
        reviewId: results.data[0].reviewId,
        username: results.data[0].username,
        title: results.data[0].title,
        text: results.data[0].text,
        yesCount: results.data[0].yesCount,
        noCount: results.data[0].noCount,
        date: results.data[0].date,
        starRating: results.data[0].starRating,
        sizeRating: results.data[0].sizeRating,
        widthRating: results.data[0].widthRating,
        comfortRating: results.data[0].comfortRating,
        qualityRating: results.data[0].qualityRating
      });
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
        <div>
          <div>

          </div>
          <ul className="reviews">
            {this.state.showCount.map((ignore, index) => {
              return (
                <div key={index}>
                  <div>{this.state.starRating[index]}</div>
                  <div>{this.state.date[index]}</div>
                  <div>{this.state.title[index]}</div>
                  <div>{this.state.text[index]}</div>
                  <div>{this.state.username[index]}</div>
                  <div>Was this review helpful? {this.state.yesCount[index]} {this.state.noCount[index]}</div>
                </div>
              )
            })}
        </ul>
      </div>
      )
    }
  }
}