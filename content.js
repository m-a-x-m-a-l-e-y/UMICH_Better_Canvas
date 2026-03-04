// Happening Today UMICH Extension
// 

// IMPORTS

//

function add_libraries(){
    let header = document.querySelector('head')
    header.insertAdjacentHTML('beforeend' , `
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"> 
        `)
}
function fetch_request(){
    // This returns a promise for the fetch request, which allows us to wait for this function
    // Message is sent, which background.js checks if string matches
    // Then sends back an object 'response'. 
    // response has 2 elements : boolean 'response.success' and json object 'response.json' [or response.error if something went wrong]

    return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(("maize pages data request"), (response) => 
    {
        if(response && response.success){
            console.log("Successfully got event data lalalalal")
            console.log(response.json)
            resolve(response.json)
        }
        else{
            console.log("Something went wrong" + response.error)
            reject(response?.error)
        }
    })
    })
}
function sort_events(rawEventsArray){
    rawEventsArray.sort((a, b) => a.time - b.time);
    console.log(rawEventsArray);
    return rawEventsArray;
}
function parse(json_info){
    // turns json object into a sorted list of events
    console.log("AAAAAAAAA")
    console.log(json_info)
    const AMOUNT_EVENTS_AVAILABLE = 15;
    let eventArray = [];

    //add events found to array, filtering out ones that have already passed
    const now = new Date();
    for(i = 0; i < AMOUNT_EVENTS_AVAILABLE; i++) {
        const eventDate = new Date(json_info.value[i].startsOn)
        if(eventDate >= now) {
            console.log('i :'  + i )
            _event = new Event(
                json_info.value[i].name,
                json_info.value[i].organizationName,
                json_info.value[i].id,
                json_info.value[i].startsOn,
                json_info.value[i].location
            );
            eventArray.push(_event);
        }
    }

    //sort eventArray by date
    eventArray.sort((a, b) => new Date(a.time) - new Date(b.time));
    console.log(eventArray);
    return eventArray;
}
function addElems(list_of_events) {
    console.log("INSERTINGGGGG")

    // Adds each event to extension div next to the top images carousel
        inner_events_html = ''
        for (_event in list_of_events){
            

            events += `<div class = event_and_time>
                            <div class = "time"> $</div>
                            <div class = "event" ></div>
                       </div>`;
        }



        targetDiv.insertAdjacentHTML('beforeend', html_insert);
    //

    // Container Styles 
        targetDiv.style.display = 'flex';
        targetDiv.style.flexDirection = 'row';
        targetDiv.style.alignItems = 'flex-start';
        targetDiv.style.backgroundColor = 'red';
        targetDiv.style.padding = '20px';
        targetDiv.style.height = '200px'

    //

    // Our Extension's Div Styles
        let happening_div = document.querySelector('#content > div > div')
        happening_div.style.display = 'flex';
        happening_div.style.padding = '10px';
        happening_div.style.backgroundColor = 'white';
        happening_div.style.width = '400px';
        happening_div.style.height = '175px';
        happening_div.style.marginLeft = '75px';
        happening_div.style.alignItems = 'center';
        happening_div.style.justiftContent = 'center';
        happening_div.style.border = '1px solid grey';
        happening_div.style.borderRadius = '10px';

        
    //
    console.log(happening_div)
    table= happening_div.querySelector('table')
    table.style.backgroundColor = 'yellow'
    table.style.height = '100px'

    rows = table.querySelectorAll('tr')
    rows.style.height = '15px'
    rows.style.fontFamily = '10px'
}
function format_date(time_in){
    return time_in.slice(0,10)
}
function format_time(time_in){
    let prefix = 'am'
    if(Number(time_in.slice(11,13)) > 11){
        prefix = 'pm'
    }

    let hour = Number(time_in.slice(11,13))%12 
    let minutes = Number(time_in.slice(14,16))
    // This logic ensures that there are 2 digits in the minutes place
    if(minutes.toString().length == 1){
        let zero = "0"
        zero += minutes
        minutes = zero
    }
    let time = hour + ":" + minutes + " " + prefix
    return time
}
function addElems_gemini(list_of_events) {
    console.log("INSERTING EVENTS WIDGET");

    let targetDiv = document.querySelector('#content > div');
    
    // 1. Generate the HTML dynamically based on the 5 events
    // We slice(0, 5) just to ensure we strictly only show 5 rows max
    const eventsHtml = list_of_events.slice(0, 15).map(event => `
        <div class="umich-event-row">
            <div>
                <div class="umich-time">${format_time(event.time)}</div>
                <div class="umich-date">${format_date(event.time)}</div>
            </div>
            
            
            <div class="umich-details">
                <div class="umich-title"><a href = "${event.link}">${event.name || "Unknown Event"}</a></div>
                <div class="umich-loc">${event.location || "Location TBD"} • ${event.orgName}</div>
            </div>

            
        </div>
    `).join('');

    // 2. Wrap it in a nice container with a header
    const widgetHtml = `
        <div id="umich-widget-container">
            <div class="umich-widget-header">HAPPENING TODAY</div>
            <div class="umich-events-list">
                ${eventsHtml}
            </div>
        </div>
    `;
 // #content div{
        //     display: flex;
        //     flex-direction: row;
        //     align-items: flex-start;
        //     gap: 20px; /* Space between original content and your widget */
        // }
    // 3. Inject CSS styles into the document head
    // This is MUCH cleaner than writing targetDiv.style.backgroundColor over and over
    const style = document.createElement('style');
    style.innerHTML = `
        /* Container styling to sit nicely next to the carousel */
       

        /* The Widget Itself */
        #umich-widget-container {
            width: 400px;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border: none;
            border-radius: 8px;
            // box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            box-shadow: none;
            font-family: 'Roboto', sans-serif;
            overflow: hidden; /* Keeps border-radius clean */
            flex-shrink: 0;
            margin-left: 20px;
        }

        /* UMich Blue Header */     
        .umich-widget-header {
            background-color: #ffffff; /* UMich Blue */
            color: #00274C; /* UMich Maize */
            padding: 12px 16px;
            // font-weight: bold;
            font-size: 16px;
            text-align: center;
        }

        /* List container with scrollbar just in case */
        .umich-events-list {
            max-height: 150px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }

        .umich-date{
            font-size: 10px;
            color: #233e57;
            width: 70px; /* Fixed width so all titles align */
            flex-shrink: 0;
            margin-right: 12px;
            padding-top: 2px;
        }

        /* Individual Event Row */
        .umich-event-row {
            display: flex;
            padding: 12px 16px;
            border-bottom: 1px solid #f0f0f0;
            transition: background-color 0.2s;
        }

        .umich-event-row:last-child {
            border-bottom: none;
        }

        .umich-event-row:hover {
            background-color: #f9f9f9;
        }

        /* Time Column */
        .umich-time {
            font-size: 12px;
            font-weight: bold;
            color: #00274C;
            width: 70px; /* Fixed width so all titles align */
            flex-shrink: 0;
            margin-right: 12px;
            padding-top: 2px;
        }

        /* Details Column */
        .umich-details {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .umich-title {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            line-height: 1.2;
        }

        .umich-loc {
            font-size: 11px;
            color: #666666;
            line-height: 1.3;
        }
    `;
    
    document.head.appendChild(style);
    targetDiv.style.display = 'flex';
    targetDiv.style.flexDirection = 'row';
    targetDiv.style.alignItems = 'flex-start';
    targetDiv.style.backgroundColor = 'white';
    targetDiv.style.padding = '20px';
    targetDiv.style.height = '200px'
    targetDiv.insertAdjacentHTML('beforeend', widgetHtml);
}

function happening_today(){
    return true
}
function no_ads(){
    return true
}
async function run(){
    
    add_libraries()
    if(HAPPENING_TODAY_OPTION){
        const info_json = await fetch_request()
        events_list = parse(info_json)
        addElems_gemini(events_list)
    }
    if(NO_ADS_OPTION){
        console.log("removing ads")
    }
}



const HAPPENING_TODAY_OPTION = happening_today();
const NO_ADS_OPTION = no_ads();

run()





