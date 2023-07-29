// Request DTO for Reviews
class ReviewsRequest{
    destination_id;
    user_id;
    rating;
    review;

    constructor(destination_id, user_id, rating, review){
        this.destination_id = destination_id;
        this.user_id = user_id;
        this.rating = rating;
        this.review = review;
    }
}

// Response DTO for Reviews
class ReviewsResponse{
    id;
    destination_id;
    userId;
    rating;
    review;
    date;

    constructor(id, destination_id, userId, rating, review, date){
        this.id = id;
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