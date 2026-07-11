class Event {
    name;
    orgName;
    id;
    time;
    endTime;
    location;
    link;
    gcal;
    
    constructor (name, orgName, id, time, endTime, location, link) {
        this.name = name;
        this.orgName = orgName;
        this.id = id;
        this.time = time;
        this.endTime = endTime;
        this.location = location;
        this.link = link;

        //console.log("running gcal generator:")
        this.gcal = this.generateGCalLink();
        //console.log("gcal generated");
    }

    generateGCalLink() {

        const format = (str) => str.replace(/[-:]/g, '').split('.')[0] + 'Z';

        const start = format(this.time);
        const end = format(this.endTime);

        const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
        const params = [
            `text=${encodeURIComponent(this.name)}`,
            `dates=${start}/${end}`,
            `details=${encodeURIComponent("Organization: " + this.orgName + "\nMaize Pages: " + this.link)}`,
            `location=${encodeURIComponent(this.location)}`,
            `sf=true`,
            `output=xml`
        ];

        return `${baseUrl}&${params.join('&')}`;
    }
}

