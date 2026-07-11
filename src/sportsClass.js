//      "Event Number": 1,
//     "Event Type": "sport",
//     "title": "USAT Collegiate Club Nationals",
//     "link": "https://events.umich.edu/event/144079",
//     "datetime": "2026-03-24 0:00",
//     "time_display": "Mar 24, 2026 12:00am",
//     "location": "Jones Park"


class Sport {
    eventNumber;
    eventType;
    title;
    link;
    datetime;
    timeDisplay;
    location;
 
    constructor(eventNumber, eventType, title, link, datetime, timeDisplay, location) {
        this.eventNumber = eventNumber;
        this.eventType = eventType;
        this.title = title;
        this.link = link;
        this.datetime = datetime;
        this.timeDisplay = timeDisplay;
        this.location = location;
    }
}