class SavedDestonationDto {
    id;
    destinationName;
    cityName;
    landmarks;
    latitude;
    longitude;
    state;
    description;
    images;
    avgTravelExpenses;
    attractions;
    category;

    constructor(id, destinationName, cityName, landmarks, latitude, longitude, state, description, images, avgTravelExpenses, attractions, category) {
        this.id = id;
        this.destinationName = destinationName;
        this.cityName = cityName;
        this.landmarks = landmarks;
        this.latitude = latitude;
        this.longitude = longitude;
        this.state = state;
        this.description = description;
        this.images = images;
        this.avgTravelExpenses = avgTravelExpenses;
        this.attractions = attractions;
        this.category = category;
    }
}

module.exports = SavedDestonationDto;