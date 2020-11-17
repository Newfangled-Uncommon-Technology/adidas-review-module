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
        {this.props.review.date}
      </div>
    )
  }
}

export default Review;