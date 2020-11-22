var mongoose = require('mongoose');
var Reviews = require('./reviews.js');
var ReviewStats = require('./reviewStats.js');


const LoremIpsum = require('lorem-ipsum').LoremIpsum;




const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});



var sampleReviews = {
  shoeIds: ['M20324', 'M20325', 'M20327'],
  reviewCount: 100,
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
  qualityRating: []
};

for (var i = 0; i < sampleReviews.reviewCount; i++) {
  var month = Math.ceil(Math.random() * 10);
  var day = Math.ceil(Math.random() * 28);
  sampleReviews.reviewId.push(i);
  sampleReviews.username.push('Julian');
  sampleReviews.title.push(lorem.generateWords(1));
  sampleReviews.text.push(lorem.generateSentences(4));
  sampleReviews.yesCount.push(Math.floor(Math.random() * 5));
  sampleReviews.noCount.push(Math.floor(Math.random() * 5));
  sampleReviews.date.push(`${month}/${day}/2020`);
  sampleReviews.starRating.push(Math.ceil(Math.random() * 5));
  sampleReviews.sizeRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.widthRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.comfortRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.qualityRating.push(Math.ceil(Math.random() * 10));
}


var fiveStar = 0;
var fourStar = 0;
var threeStar = 0;
var twoStar = 0;
var oneStar = 0;
var avgStar = 0;

for (var i = 0; i < 100; i++) {
  if (sampleReviews.starRating[i] === 5) {
    fiveStar++;
    avgStar += 5;
  } else if (sampleReviews.starRating[i] === 4) {
    fourStar++;
    avgStar += 4;
  } else if (sampleReviews.starRating[i] === 3) {
    threeStar++;
    avgStar += 3;
  } else if (sampleReviews.starRating[i] === 2) {
    twoStar++;
    avgStar += 2;
  } else {
    oneStar++;
    avgStar += 1;
  }
}


avgStar = avgStar / 100;
avgRating = avgStar;


var sampleReviewStats = {
  shoeIds: ['M20324', 'M20325', 'M20327'],
  reviewCount: 100,
  averageRating: avgRating,
  averageStar: Math.round(avgStar),
  fiveStar: fiveStar,
  fourStar: fourStar,
  threeStar: threeStar,
  twoStar: twoStar,
  oneStar: oneStar,
  satisfactionPercent: Math.ceil(Math.random() * 100),
  averageSize: Math.random() * 10,
  averageWidth: Math.random() * 10,
  averageComfort: Math.random() * 10,
  averageQuality: Math.random() * 10
}

Reviews.create(sampleReviews);
ReviewStats.create(sampleReviewStats);