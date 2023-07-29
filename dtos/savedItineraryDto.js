class SavedItineraryDto{
    id;
    planName;
    destination;
    travelStartDate;
    travelEndDate;
    travelMode;
    details;
    estimatedCost;
    createdBy;

    constructor(id, planName, destination, travelStartDate, travelEndDate, travelMode, details, estimatedCost, createdBy) {
        this.id = id;
        this.planName = planName;
        this.destination = destination;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.travelMode = travelMode;
        this.details = details;
        this.estimatedCost = estimatedCost;
        this.createdBy = createdBy;
    }
}

module.exports = {SavedItineraryDto};