// Request DTO for Reviews
class ReviewsRequest{
    reviewerName
    destination_id;
    user_id;
    rating;
    review;

    constructor(reviewerName, destination_id, user_id, rating, review){
        this.reviewerName = reviewerName;
        this.destination_id = destination_id;
        this.user_id = user_id;
        this.rating = rating;
        this.review = review;
    }
}

// Response DTO for Reviews
class ReviewsResponse{
    id;
    reviewerName
    destination_id;
    userId;
    rating;
    review;
    date;

    constructor(id, reviewerName, destination_id, userId, rating, review, date){
        this.id = id;
        this.reviewerName = reviewerName;
        this.destination_id = destination_id;
        this.userId = userId;
        this.rating = rating;
        this.review = review;
        this.date = date;
    }
}

module.exports = {
    ReviewsResponse,
    ReviewsRequest
}