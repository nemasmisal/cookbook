import BaseFetch from './base-fetch';
class ReviewService {
  REVIEW_URL = 'review/';
  getReviews(body) {
    return BaseFetch.baseHttp(this.REVIEW_URL + 'reviews', 'post', body);
  }
  addReview(body) {
    return BaseFetch.baseHttp(this.REVIEW_URL + 'addReview', 'post', body);
  }
}
export default new ReviewService();
