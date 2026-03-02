console.log("Hello world")
function generate_date() {
    today_exact = new Date().toISOString();
    // 2026-02-28T23:31:09.063Z
    today_usable = today_exact.substring(0, 10)
    skeleton = `https://maizepages.umich.edu/api/discovery/event/search?endsAfter=${today_usable}T18%3A10%3A56-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`
    return today_usable
}
data = generate_date()
console.log(data)

function fetch_request(){
    chrome.runtime.sendMessage(("maize pages data request"), (response) => 
    {
        if(response && response.success){
            console.log("Successfully got event data lalalalal")
            console.log(response.json)
        }
        else{
            console.log("Something went wrong")
        }
    })
}

fetch_request()