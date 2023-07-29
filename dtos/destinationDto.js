// ResponseDTO
class GetDestination{
    id;
    destinationName;
    cityName;
    latitude;
    longitude;
    landmarks;
    state;
    description;
    images;
    avgTravelExpenses;
    attractions;
    category;
    currentWeather;
    weatherIcon;
    currentTemperature;

    constructor(id,destinationName, cityName, latitude, longitude, landmarks, state, description, images, avgTravelExpenses, attractions, category, currentWeather, weatherIcon, currentTemperature){
        this.id = id;
        this.destinationName = destinationName;
        this.cityName = cityName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.landmarks = landmarks;
        this.state = state;
        this.description = description;
        this.images = images;
        this.avgTravelExpenses = avgTravelExpenses;
        this.attractions = attractions;
        this.category = category;
        this.currentWeather = currentWeather;
        this.weatherIcon = weatherIcon;
        this.currentTemperature = currentTemperature;
    }
}

//Request DTO
class CreateDestionation{
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

    constructor(destinationName, cityName, landmarks, latitude, longitude, state, description, images, avgTravelExpenses, attractions, category){
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

module.exports = {
    GetDestination,
    CreateDestionation
}