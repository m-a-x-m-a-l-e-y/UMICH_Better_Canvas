// Happening Today UMICH Extension
// 

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

    // Adds this extension div next to the top images carousel
        let targetDiv = document.querySelector('#content > div');
        row_1 = "AAAA";
      

        html_insert = `<div id = "inserted">  
                <table style="border-collapse: collapse; border: none;">
                    <tr>
                        <td>${row_1}</td>
                        <td>${row_1}</td>
                    </tr>
                    <tr>
                        <td>Row 2, Col 1</td>
                        <td>Row 2, Col 2</td>
                    </tr>
                    <tr>
                        <td>Row 2, Col 1</td>
                        <td>Row 2, Col 2</td>
                    </tr>
                    <tr>
                        <td>Row 2, Col 1</td>
                        <td>Row 2, Col 2</td>
                    </tr>
                    <tr>
                        <td>Row 2, Col 1</td>
                        <td>Row 2, Col 2</td>
                    </tr>
                </table>
            
            </div>`;

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

async function run(){
    const info_json = await fetch_request()
    events_list = parse(info_json)
    addElems(events_list)

    // console.log("AAAA")
    // page_text = document.documentElement.outerHTML;
    // console.log(page_text)

}

run()





