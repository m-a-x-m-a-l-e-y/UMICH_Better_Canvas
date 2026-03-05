async function scrape_events() {
    //function that actually scrapes maize_pages
    const url = generate_URL()
    console.log("going through event data")
    const raw_data = fetchEvents(url);

    console.log("formatting data into html (?)");
    const events_list = raw_data.map(event => {
        return {
            title: event.name,
            link: 'https://maizepages.umich.edu/event/${event.id}',
            description: event.description,
            organization: event.organizationName
        }
    }
    )
    return events_list;

}
async function fetchEvents(url) {
    //fetching generated URL
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("data could not be fetched");
        }

        const data = await response.json();
        return data.value;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function generate_URL() {
    //so this actually gives time based on current location so will only work properly in EST places oops
    //trying again
    today_UTC = new Date();
    offset = today_UTC.getTimezoneOffset() * 60 * 1000;
    estDate = new Date(today_UTC.getTime() - offset);
    //estDate = new Date(today_UTC.getTime() - (5 * 60 * 60 * 1000));
    today_usable = estDate.toISOString().substring(0,10);
    
    return skeleton = `https://maizepages.umich.edu/api/discovery/event/search?endsAfter=${today_usable}T18%3A10%3A56-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`
}




// Listener for message from content.js
const MESSAGE_OUT = "maize pages data request"
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
    if(message === MESSAGE_OUT){
        url = generate_URL()
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            sendResponse({success:true, json:data})
        })
        .catch(error => {sendResponse({success : false , error: "ERROR : reached catch" + error})})
    }
    return true
})
