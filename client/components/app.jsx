import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';

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
      showCount: 2,
      currentlyShowing: [],
      currentSort: '',
      currentStars: [5, 4, 3, 2, 1],
      sortingByStars: false
    }

    this.getReviews = this.getReviews.bind(this);
    this.getReviewStats = this.getReviewStats.bind(this);
    this.sortByNewest = this.sortByNewest.bind(this);
    this.sortByHelpful = this.sortByHelpful.bind(this);
    this.sortByRelevance = this.sortByRelevance.bind(this);
    this.sortBy5 = this.sortBy5.bind(this);
    this.sortBy4 = this.sortBy4.bind(this);
    this.sortBy3 = this.sortBy3.bind(this);
    this.sortBy2 = this.sortBy2.bind(this);
    this.sortBy1 = this.sortBy1.bind(this);
    this.determineSort = this.determineSort.bind(this);
    this.loadMore = this.loadMore.bind(this);
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

  sortByNewest() {
    var currentArray = [];

      for (var k = 0; k < this.state.showCount; k++) {
        var newestIndex = -1;
        var newestDate = [-1];


        for (var i = 0; i < this.state.reviewCount; i++) {

          var found = false;
          for (var j = 0; j < currentArray.length; j++) {
            if (currentArray[j] === i) {
              found = true;
            }
          }

          var correctStarCount = false;
          for (var j = 0; j < this.state.currentStars.length; j++) {
            if (this.state.starRating[i] === this.state.currentStars[j]) {
              correctStarCount = true;
            }
          }

          if (!found && correctStarCount) {
            var currentDate = this.state.date[i].split('/');
            currentDate[0] = Number(currentDate[0]);
            currentDate[1] = Number(currentDate[1]);
            if (newestDate === [-1]) {
              newestDate = currentDate;
              newestIndex = i;
            } else if (currentDate[0] > newestDate[0]) {
                newestDate = currentDate;
                newestIndex = i
            } else if ((currentDate[0] === newestDate[0]) && (currentDate[1] > newestDate[1])) {
              newestDate = currentDate;
              newestIndex = i
            }
          }
        }
        currentArray.push(newestIndex)
      }

      this.setState({
        currentlyShowing: currentArray,
        currentSort: 'newest'
      });
  }

  sortByHelpful() {
    var currentArray = [];
    for (var i = 0; i < this.state.showCount; i++) {
    var bestIndex = -1;
    var bestDifference = -99999999;

      for (var j = 0; j < this.state.reviewCount; j++) {

        var found = false;
        for (var k = 0; k < currentArray.length; k++) {
          if (currentArray[k] === j) {
            found = true;
          }
        }

        var correctStarCount = false;
        for (var k = 0; k < this.state.currentStars.length; k++) {
          if (this.state.starRating[j] === this.state.currentStars[k]) {
            correctStarCount = true;
          }
        }

        if (!found && correctStarCount) {
          var currentDifference = this.state.yesCount[j] - this.state.noCount[j];
          if (currentDifference > bestDifference) {
            bestDifference = currentDifference;
            bestIndex = j;
          }
        }
      }
      currentArray.push(bestIndex);
    }

    this.setState({
      currentlyShowing: currentArray,
      currentSort: 'helpful'
    });
  }

  sortByRelevance() {
    var currentArray = [];
    var i = -1;

    while (currentArray.length <this.state.showCount) {
      i++;
      var correctStarCount = false;
      for (var j = 0; j < this.state.currentStars.length; j++) {
        if (this.state.starRating[i] === this.state.currentStars[j]) {
          correctStarCount = true;
        }
      }
      if(correctStarCount) {
        currentArray.push(i);
      }
    }

    this.setState({
      currentlyShowing: currentArray,
      currentSort: 'relevance'
    });
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

      this.sortByNewest();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  sortBy5() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [5],
        sortingByStars: true
      }, () => {this.determineSort()});
    } else {
      var currentStars = this.state.currentStars;
      var found = false;
      for (var i = 0; i < currentStars.length; i++) {
        if (currentStars[i] === 5) {
          found = true;
        }
      }

      if (found) {
        if (currentStars.length === 1) {
          this.setState({
            currentStars: [5, 4, 3, 2, 1],
            sortingByStars: false
          }, () => {
            this.determineSort()})
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 5) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => {this.determineSort()});
        }
      } else {
        currentStars.push(5);
        this.setState({
          currentStars: currentStars
        }, () => {this.determineSort()});
      }
    }
  }

  sortBy4() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [4],
        sortingByStars: true
      }, () => {this.determineSort()});
    } else {
      var currentStars = this.state.currentStars;
      var found = false;
      for (var i = 0; i < currentStars.length; i++) {
        if (currentStars[i] === 4) {
          found = true;
        }
      }

      if (found) {
        if (currentStars.length === 1) {
          this.setState({
            currentStars: [5, 4, 3, 2, 1],
            sortingByStars: false
          }, () => {
            this.determineSort()})
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 4) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => {this.determineSort()});
        }
      } else {
        currentStars.push(4);
        this.setState({
          currentStars: currentStars
        }, () => {this.determineSort()});
      }
    }
  }

  sortBy3() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [3],
        sortingByStars: true
      }, () => {this.determineSort()});
    } else {
      var currentStars = this.state.currentStars;
      var found = false;
      for (var i = 0; i < currentStars.length; i++) {
        if (currentStars[i] === 3) {
          found = true;
        }
      }

      if (found) {
        if (currentStars.length === 1) {
          this.setState({
            currentStars: [5, 4, 3, 2, 1],
            sortingByStars: false
          }, () => {
            this.determineSort()})
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 3) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => {this.determineSort()});
        }
      } else {
        currentStars.push(3);
        this.setState({
          currentStars: currentStars
        }, () => {this.determineSort()});
      }
    }
  }

  sortBy2() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [2],
        sortingByStars: true
      }, () => {this.determineSort()});
    } else {
      var currentStars = this.state.currentStars;
      var found = false;
      for (var i = 0; i < currentStars.length; i++) {
        if (currentStars[i] === 2) {
          found = true;
        }
      }

      if (found) {
        if (currentStars.length === 1) {
          this.setState({
            currentStars: [5, 4, 3, 2, 1],
            sortingByStars: false
          }, () => {
            this.determineSort()})
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 2) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => {this.determineSort()});
        }
      } else {
        currentStars.push(2);
        this.setState({
          currentStars: currentStars
        }, () => {this.determineSort()});
      }
    }
  }

  sortBy1() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [1],
        sortingByStars: true
      }, () => {this.determineSort()});
    } else {
      var currentStars = this.state.currentStars;
      var found = false;
      for (var i = 0; i < currentStars.length; i++) {
        if (currentStars[i] === 1) {
          found = true;
        }
      }

      if (found) {
        if (currentStars.length === 1) {
          this.setState({
            currentStars: [5, 4, 3, 2, 1],
            sortingByStars: false
          }, () => {
            this.determineSort()})
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 1) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => {this.determineSort()});
        }
      } else {
        currentStars.push(1);
        this.setState({
          currentStars: currentStars
        }, () => {this.determineSort()});
      }
    }
  }

  determineSort() {
    if (this.state.currentSort === 'newest') {
      this.sortByNewest();
    } else if (this.state.currentSort === 'helpful') {
      this.sortByHelpful();
    } else {
      this.sortByRelevance();
    }
  }

  loadMore() {
    var reviewsShowing = this.state.showCount;
    reviewsShowing = reviewsShowing + 2;
    this.setState({
      showCount: reviewsShowing
    }, () => {
      this.determineSort();
    });
  }

  render() {
    if (this.state.reviews === []) {
      return (
        <div>Ratings and Reviews</div>
      )
    } else if (!this.state.sortingByStars) {
      return (
        <div>

          <div>
            <button onClick={this.sortByNewest}>Newest</button> <button onClick={this.sortByHelpful}>Helpful</button> <button onClick={this.sortByRelevance}>Relevant</button>
          </div>
          <div>
            <button onClick={this.sortBy5}>5 STARS</button>
            <button onClick={this.sortBy4}>4 STARS</button>
            <button onClick={this.sortBy3}>3 STARS</button>
            <button onClick={this.sortBy2}>2 STARS</button>
            <button onClick={this.sortBy1}>1 STARS</button>
          </div>

          <ul className="reviews">
            {this.state.currentlyShowing.map((reviewId, index) => {
              var thisReview = {
                starRating: this.state.starRating[reviewId],
                date: this.state.date[reviewId],
                title: this.state.title[reviewId],
                text: this.state.text[reviewId],
                username: this.state.username[reviewId],
                yesCount: this.state.yesCount[reviewId],
                noCount: this.state.noCount[reviewId]
              }

              return (
                <Review review={thisReview}/>
              )
            })}
        </ul>
        <button onClick={this.loadMore}>LOAD MORE</button> <button>WRITE A REVIEW</button>
      </div>
      )
    } else {
      return (
        <div>

          <div>
            <button onClick={this.sortByNewest}>Newest</button> <button onClick={this.sortByHelpful}>Helpful</button> <button onClick={this.sortByRelevance}>Relevant</button>
          </div>
          <div>
            Showing reviews: {this.state.currentStars.map((number, index) => {
              var onClick;
              if (number === 1) {
                onClick = this.sortBy1;
              } else if (number === 2) {
                onClick = this.sortBy2;
              } else if (number === 3) {
                onClick = this.sortBy3;
              } else if (number === 4) {
                onClick = this.sortBy4;
              } else if (number === 5) {
                onClick = this.sortBy5;
              }
              return (
              <button onClick={onClick}>{number} STARS</button>
              )
            })}
          </div>
          <div>
            <button onClick={this.sortBy5}>5 STARS</button>
            <button onClick={this.sortBy4}>4 STARS</button>
            <button onClick={this.sortBy3}>3 STARS</button>
            <button onClick={this.sortBy2}>2 STARS</button>
            <button onClick={this.sortBy1}>1 STARS</button>
          </div>

          <ul className="reviews">
            {this.state.currentlyShowing.map((reviewId, index) => {
              var thisReview = {
                starRating: this.state.starRating[reviewId],
                date: this.state.date[reviewId],
                title: this.state.title[reviewId],
                text: this.state.text[reviewId],
                username: this.state.username[reviewId],
                yesCount: this.state.yesCount[reviewId],
                noCount: this.state.noCount[reviewId]
              }

              return (
                <Review review={thisReview}/>
              )
            })}
        </ul>

        <button onClick={this.loadMore}>LOAD MORE</button> <button>WRITE A REVIEW</button>
      </div>
      )
    }
  }
}