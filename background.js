
// Checking if we are in the canvas page
// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if(tab.url && tab.url.includes("umich.instructure.com")){
        
//     }
// });

async function scrape_events() {
    const url = generate_url()
    

}

function generate_URL() {
    today_exact = new Date().toISOString();
    // 2026-02-28T23:31:09.063Z
    today_usable = today_exact.substring(0, 10)
    skeleton = `https://maizepages.umich.edu/api/discovery/event/search?endsAfter=${today_usable}T18%3A10%3A56-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`
}