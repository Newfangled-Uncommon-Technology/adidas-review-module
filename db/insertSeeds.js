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
  reviewCount: 3,
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
  sampleReviews.reviewId.push(i);
  sampleReviews.username.push('Julian');
  sampleReviews.title.push(lorem.generateWords(1));
  sampleReviews.text.push(lorem.generateSentences(4));
  sampleReviews.yesCount.push(Math.floor(Math.random() * 5));
  sampleReviews.noCount.push(Math.floor(Math.random() * 5));
  sampleReviews.date.push(`11/${i}/2020`);
  sampleReviews.starRating.push(Math.ceil(Math.random() * 5));
  sampleReviews.sizeRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.widthRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.comfortRating.push(Math.ceil(Math.random() * 10));
  sampleReviews.qualityRating.push(Math.ceil(Math.random() * 10));
}

var averageRating = Math.random() * 5;

var sampleReviewStats = {
  shoeIds: ['M20324', 'M20325', 'M20327'],
  reviewCount: 3,
  averageRating: averageRating,
  averageStar: Math.round(averageRating),
  fiveStar: Math.floor(Math.random() * 2),
  fourStar: Math.floor(Math.random() * 2),
  threeStar: Math.floor(Math.random() * 2),
  twoStar: Math.floor(Math.random() * 2),
  oneStar: Math.floor(Math.random() * 2),
  satisfactionPercent: Math.ceil(Math.random() * 100),
  averageSize: Math.random() * 10,
  averageWidth: Math.random() * 10,
  averageComfort: Math.random() * 10,
  averageQuality: Math.random() * 10
}

Reviews.create(sampleReviews);
ReviewStats.create(sampleReviewStats);