import BaseFetch from "./baseFetch";
class ReviewService {
  private REVIEW_URL = "review/";
  getReviews(body: any) {
    return BaseFetch.baseHttp(this.REVIEW_URL + "reviews", "post", body);
  }
  addReview(body: any) {
    return BaseFetch.baseHttp(this.REVIEW_URL + "addReview", "post", body);
  }
}
export default new ReviewService();
