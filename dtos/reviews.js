class Reviews{
    id;
    destinationId;
    userId;
    rating;
    review;
    date;

    constructor(id, destinationId, userId, rating, review, date){
        this.id = id;
        this.destinationId = destinationId;
        this.userId = userId;
        this.rating = rating;
        this.review = review;
        this.date = date;
    }
}

module.exports = Reviews;