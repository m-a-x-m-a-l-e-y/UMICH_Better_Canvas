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

function parse(json_info){
    console.log("AAAAAAAAA")
    console.log(json_info)
    const AMOUNT_EVENTS_AVAILABLE = 15;
    let eventArray = [];
    for(i = 0; i < AMOUNT_EVENTS_AVAILABLE; i++) {
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
    return eventArray


}

function addElems(list_of_events) {
    console.log("INSERTINGGGGG")

    // Adds this extension div next to the top images carousel
        let targetDiv = document.querySelector('#content > div');
        row_1 = "AAAA";
      

        html_insert = `<div id = "inserted"> ew content
                <table style="border-collapse: collapse; border: none;">
                    <tr>
                        <td>${row_1}</td>
                        <td>Row 1, Col 2</td>
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
    //

    // Our Extension's Div Styles
        let happening_div = document.querySelector('#content > div > div')
        happening_div.style.display = 'flex';
        happening_div.style.backgroundColor = 'green';
        happening_div.style.width = '400px';
        happening_div.style.height = 'auto';
        
        happening_div.style.margin = '10px';
        happening_div.style.alignItems = 'center';
    //
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





