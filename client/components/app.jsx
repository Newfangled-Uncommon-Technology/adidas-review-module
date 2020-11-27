import React from 'react';
import axios from 'axios';
import styled, {css} from 'styled-components';
import Review from './Review.jsx';
import TopButtons from './TopButtons.jsx';

const Container = styled.div `
margin-left: 30px;
margin-right: 30px;
  font-size: 13px;
  font-family: Helvetica;
`;

const AverageRating = styled.div `
  position: absolute;
  left: 50%;
`

const StarButton = styled.button `
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

const RatingOverview = styled.div `
  background: #00cc66;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 10px;
`;

const StepWrapper = styled.div `
  display: flex;
  height:100%;
  justify-content:space-between;
  width:100%;
  color: black;
`;

const Bar = styled.hr `
  border: 2px solid grey;
  z-index: 1;
`;

const FirstSeparator = styled.div `
  background-color: white;
  height: 4px;
  width: 4px;
  position: absolute;
  left: 23%;
  z-index: 2;
  top: 45%;
`;

const SecondSeparator = styled.div `
  background-color: white;
  height: 4px;
  width: 4px;
  position: absolute;
  left: 46%;
  z-index: 2;
  top: 45%;
`;

const ThirdSeparator = styled.div `
  background-color: white;
  height: 4px;
  width: 4px;
  position: absolute;
  left: 71%;
  z-index: 2;
  top: 45%;
`;



const ArrowDown = styled.div `
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #2ada71;
  position: absolute;
  z-index: 3;
  top: 20%;
`;

const Arrow = styled(ArrowDown)`
  left: ${props => props.left};
`;

const Right = styled.div `
  position: absolute;
  right: 0px;
`;

const TopButton = styled.button `
  padding-top: 16px;
  padding-bottom: 16px;
  width: 33%;
  background: white;
  display: block;
  margin-bottom: 30px;
`;

const BottomButton = styled.button `
  width: 50%;
  padding-top: 16px;
  padding-bottom: 16px;
  background: white;
`;

const Star = styled.div `
  display: inline;
  width: 12%;
`;

const StarButtonCol = styled.div `
  margin-right: 0px;
  margin-left: 15px;
  margin-top: 7px;
`;

const ReviewCountCol = styled.div `
  margin-top: 7px;
`

const ReviewBar = styled.hr `
  border: 2px solid grey;
  border-radius: 5px;
`;

const FilledReviewBar = styled.div `
z-index: 7;
border-radius: 5px;
position: absolute;
left: 15px;
top: 16px;
z-index: 3;
border: 2px solid #2ada71;
background-color: #2ada71;
`;

const FilledBar = styled(FilledReviewBar) `
  width: ${props => props.width};
`;

const Title = styled.h4 `
  font-weight: bold;
`;

const Breakdown = styled.h5 `
  font-weight: 800;
`;

const ReviewsContainer = styled.div `
  width: 92%;
`;

export default class App extends React.Component {
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
      sortingByStars: false,
      starArr: []
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
        var avgSize = (results.data[0].averageSize * 10).toString() + '%';
        var avgWidth = (results.data[0].averageWidth * 10).toString() + '%';
        var avgComfort = (results.data[0].averageComfort * 10).toString() + '%';
        var avgQuality = (results.data[0].averageQuality * 10).toString() + '%';
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
          averageSize: avgSize,
          averageWidth: avgWidth,
          averageComfort: avgComfort,
          averageQuality: avgQuality
        }, () => {
          var starArr = [];
          for (var i = 0; i < this.state.averageStar; i++) {
            starArr.push('filled');
          }
          for (var i = 5; i > this.state.averageStar; i--) {
            starArr.push('unfilled');
          }
          var fiveStarPercent = (this.state.fiveStar / this.state.reviewCount * 100).toString() + '%';
          var fourStarPercent = (this.state.fourStar / this.state.reviewCount * 100).toString() + '%';
          var threeStarPercent = (this.state.threeStar / this.state.reviewCount * 100).toString() + '%';
          var twoStarPercent = (this.state.twoStar / this.state.reviewCount * 100).toString() + '%';
          var oneStarPercent = (this.state.oneStar / this.state.reviewCount * 100).toString() + '%';
          this.setState({
            starArr: starArr,
            fiveStarPercent: fiveStarPercent,
            fourStarPercent: fourStarPercent,
            threeStarPercent: threeStarPercent,
            twoStarPercent: twoStarPercent,
            oneStarPercent: oneStarPercent
          });
        });
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

    while (currentArray.length < this.state.showCount) {
      i++;
      var correctStarCount = false;
      for (var j = 0; j < this.state.currentStars.length; j++) {
        if (this.state.starRating[i] === this.state.currentStars[j]) {
          correctStarCount = true;
        }
      }
      if (correctStarCount) {
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
      }, () => { this.determineSort() });
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
            this.determineSort()
          })
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 5) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => { this.determineSort() });
        }
      } else {
        currentStars.push(5);
        this.setState({
          currentStars: currentStars
        }, () => { this.determineSort() });
      }
    }
  }

  sortBy4() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [4],
        sortingByStars: true
      }, () => { this.determineSort() });
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
            this.determineSort()
          })
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 4) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => { this.determineSort() });
        }
      } else {
        currentStars.push(4);
        this.setState({
          currentStars: currentStars
        }, () => { this.determineSort() });
      }
    }
  }

  sortBy3() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [3],
        sortingByStars: true
      }, () => { this.determineSort() });
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
            this.determineSort()
          })
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 3) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => { this.determineSort() });
        }
      } else {
        currentStars.push(3);
        this.setState({
          currentStars: currentStars
        }, () => { this.determineSort() });
      }
    }
  }

  sortBy2() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [2],
        sortingByStars: true
      }, () => { this.determineSort() });
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
            this.determineSort()
          })
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 2) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => { this.determineSort() });
        }
      } else {
        currentStars.push(2);
        this.setState({
          currentStars: currentStars
        }, () => { this.determineSort() });
      }
    }
  }

  sortBy1() {
    if (!this.state.sortingByStars) {
      this.setState({
        currentStars: [1],
        sortingByStars: true
      }, () => { this.determineSort() });
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
            this.determineSort()
          })
        } else {
          for (var i = 0; i < currentStars.length; i++) {
            if (currentStars[i] === 1) {
              currentStars.splice(i, 1);
            }
          }
          this.setState({
            currentStars: currentStars
          }, () => { this.determineSort() });
        }
      } else {
        currentStars.push(1);
        this.setState({
          currentStars: currentStars
        }, () => { this.determineSort() });
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
    if (this.state.reviews === [] || this.state.averageRating === undefined) {
      return (
        <div>Ratings and Reviews</div>
      )
    } else if (!this.state.sortingByStars) {
      return (
        <Container>
          <div class="row">
          <div class="col-md-4">
          <Title>RATINGS & REVIEWS</Title>
          <RatingOverview>
            <div class="row">
              <div class="col-md-5">
                  <div class="row">
                    <AverageRating>
                      <h1>{this.state.averageRating.toPrecision(2) || 0}</h1>
                    </AverageRating>
                  </div>
              </div>
              <div class="col-md-7">

                <div class="row">

                {this.state.starArr.map((fillStatus, index) => {
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
                <div>{this.state.reviewCount} Reviews</div>
              </div>
            </div>
          </RatingOverview>
          <Breakdown>RATING BREAKDOWN</Breakdown>
            <div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy5}>5 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.fiveStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.fiveStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy4}>4 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.fourStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.fourStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy3}>3 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.threeStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.threeStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy2}>2 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.twoStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.twoStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy1}>1 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.oneStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.oneStar}</ReviewCountCol>
              </div>

            </div>
            <hr></hr>
            <h1>{this.state.satisfactionPercent}%</h1>
            <div>of customers recommended this product</div>
            <br></br>
            <div>SIZE</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageSize}></Arrow>
              </div>
              <div class="col-md-4">TOO SMALL</div>
              <div class="col-md-4">PERFECT</div>
              <div class="col-md-4">TOO LARGE</div>
            </div>
            <br></br>
            <div>WIDTH</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageWidth}></Arrow>
              </div>
              <div class="col-md-4">TOO NARROW</div>
              <div class="col-md-4">PERFECT</div>
              <div class="col-md-4">TOO WIDE</div>
            </div>
            <br></br>
            <div>COMFORT</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageComfort}></Arrow>
              </div>
              <div class="col-md-6">UNCOMFORTABLE</div>
              <div class="col-md-6">
                <div class="row">
                  <Right class="col-md-12">COMFORTABLE</Right>
                </div>
              </div>
            </div>
            <br></br>
            <div>QUALITY</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageQuality}></Arrow>
              </div>
              <div class="col-md-6">POOR</div>
              <div class="col-md-6">
                <div class="row">
                  <Right class="col-md-12">PERFECT</Right>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8">
              <TopButtons currentSort={this.state.currentSort} sortByNewest={this.sortByNewest} sortByHelpful={this.sortByHelpful} sortByRelevance={this.sortByRelevance} />
              <div className="reviews">
                {this.state.currentlyShowing.map((reviewId, index) => {
                  var thisReview = {
                    reviewId: reviewId,
                    starRating: this.state.starRating[reviewId],
                    date: this.state.date[reviewId],
                    title: this.state.title[reviewId],
                    text: this.state.text[reviewId],
                    username: this.state.username[reviewId],
                    yesCount: this.state.yesCount[reviewId],
                    noCount: this.state.noCount[reviewId]
                  }

                  return (
                    <Review review={thisReview} />
                  )
                })}
              </div>
                <BottomButton onClick={this.loadMore}>LOAD MORE</BottomButton>
                <BottomButton>WRITE A REVIEW</BottomButton>
          </div>
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
        <div class="row">

          <div class="col-md-4">
          <Title>RATINGS & REVIEWS</Title>
          <RatingOverview>
            <div class="row">
              <div class="col-md-5">
                <div class="row">
                  <AverageRating>
                    <h1>{this.state.averageRating.toPrecision(2) || 0}</h1>
                  </AverageRating>
                </div>
              </div>
              <div class="col-md-7">
                <div class="row">

                  {this.state.starArr.map((fillStatus, index) => {
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
                <div>{this.state.reviewCount} Reviews</div>
              </div>
            </div>
          </RatingOverview>
          <Breakdown>RATING BREAKDOWN</Breakdown>
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
                <StarButton onClick={onClick}>{number} STARS</StarButton>
              )
            })}
            </div>
            <div>
            <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy5}>5 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.fiveStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.fiveStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy4}>4 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.fourStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.fourStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy3}>3 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.threeStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.threeStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy2}>2 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.twoStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.twoStar}</ReviewCountCol>
              </div>

              <div class="row">
                <StarButtonCol class="col-md-3"> <StarButton onClick={this.sortBy1}>1 STARS</StarButton></StarButtonCol>
                <div class="col-md-8"><ReviewBar></ReviewBar><FilledBar width={this.state.oneStarPercent}></FilledBar></div>
                <ReviewCountCol class="col-md-1">{this.state.oneStar}</ReviewCountCol>
              </div>
            </div>
            <hr></hr>
            <h1>{this.state.satisfactionPercent}%</h1>
            <div>of customers recommended this product</div>
            <br></br>
            <div>SIZE</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageSize}></Arrow>
              </div>
              <div class="col-md-4">TOO SMALL</div>
              <div class="col-md-4">PERFECT</div>
              <div class="col-md-4">TOO LARGE</div>
            </div>
            <br></br>
            <div>WIDTH</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageWidth}></Arrow>
              </div>
              <div class="col-md-4">TOO NARROW</div>
              <div class="col-md-4">PERFECT</div>
              <div class="col-md-4">TOO WIDE</div>
            </div>
            <br></br>
            <div>COMFORT</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageComfort}></Arrow>
              </div>
              <div class="col-md-6">UNCOMFORTABLE</div>
              <div class="col-md-6">
                <div class="row">
                  <Right class="col-md-12">COMFORTABLE</Right>
                </div>
              </div>
            </div>
            <br></br>
            <div>QUALITY</div>
            <div class="row">
              <div class="col-md-12">
                <Bar></Bar>
                <FirstSeparator></FirstSeparator>
                <SecondSeparator></SecondSeparator>
                <ThirdSeparator></ThirdSeparator>
                <Arrow left={this.state.averageQuality}></Arrow>
              </div>
              <div class="col-md-6">POOR</div>
              <div class="col-md-6">
                <div class="row">
                  <Right class="col-md-12">PERFECT</Right>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8">
          <TopButtons currentSort={this.state.currentSort} sortByNewest={this.sortByNewest} sortByHelpful={this.sortByHelpful} sortByRelevance={this.sortByRelevance} />
                <div className="reviews">
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
                      <Review review={thisReview} />
                    )
                  })}
            </div>
              <BottomButton onClick={this.loadMore}>LOAD MORE</BottomButton>
              <BottomButton>WRITE A REVIEW</BottomButton>
          </div>
        </div>
        </Container>
      )
    }
  }
}