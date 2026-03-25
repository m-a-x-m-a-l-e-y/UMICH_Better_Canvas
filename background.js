



// async function fetch_happening_events(url) {
//     //fetching generated URL
//     try {
//         const response = await fetch(url);
//         if(!response.ok) {
//             throw new Error("data could not be fetched");
//         }

//         const data = await response.json();
//         return data.value;
//     }
//     catch (error) {
//         console.error(error);
//         return [];
//     }
// }
function generate_happening_URL() {
    //so this actually gives time based on current location so will only work properly in EST places oops
    today_UTC = new Date();
    offset = today_UTC.getTimezoneOffset() * 60 * 1000;
    estDate = new Date(today_UTC.getTime() - offset);
    today_usable = estDate.toISOString().substring(0,10);
    
    return skeleton = `https://maizepages.umich.edu/api/discovery/event/search?endsAfter=${today_usable}T18%3A10%3A56-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`

}
// !! We are having trouble with scraping the Mdining site currently !!
// function generate_dining_URL(){
//     // General link : 
//     const URL = "https://dining.umich.edu/menus-locations/dining-halls/"
//     dining_halls = ["bursley", "east-quad" , "markley" , "mosher-jordan", "north-quad", "south-quad", "twigs-at-oxford"]
// }

// Listener for happening message from content.js
const MESSAGE_FROM_CONTENT_For_Happening = "maize pages happening data request"
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
    if(message === MESSAGE_FROM_CONTENT_For_Happening){
        url = generate_happening_URL()
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            sendResponse({success:true, json:data})
        })
        .catch(error => {sendResponse({success : false , error: "ERROR : reached catch" + error})})
    }
    return true
})

// Listener for dining message from content.js
// const MESSAGE_OUT_2 = "  "
// chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
//     if(message === MESSAGE_OUT){
//         url = generate_happening_URL()
//         fetch(url)
//         .then((response) => response.json())
//         .then(data => {
//             sendResponse({success:true, json:data})
//         })
//         .catch(error => {sendResponse({success : false , error: "ERROR : reached catch" + error})})
//     }
//     return true
// })


// Listener for sports data request
// const MESSAGE_FROM_CONTENT_For_Sports = "sports data request"

// chrome.runtime.addListener((message, sender, sendResponse) => {
//     if(message === MESSAGE_FROM_CONTENT_For_Sports){
//         // Get the info
//         const client = new DynamoDBClient({
//             region: "us-east-1",
//             credentials: fromCognitoIdentityPool({
//                 identityPoolId: "us-east-1:your-identity-pool-id-here", // Get from AWS Console
//                 clientConfig: { region: "us-east-1" }
//             })
//         })




//     }
    
    
// })
