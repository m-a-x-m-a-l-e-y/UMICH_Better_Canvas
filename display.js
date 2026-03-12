

async function settings(){
    console.log("WORKING")
    happening_toggle = document.querySelector('#toggle-happening')
    ads_off_toggle = document.querySelector('#toggle-ads')
    // get chrome storage settings 
    const { 
        happening_toggle: isHappening, 
        ads_off_toggle: adsDisabled 
    } = await chrome.storage.sync.get(["happening_toggle", "ads_off_toggle"]);
    happening_toggle.checked =  isHappening
    ads_off_toggle.checked = adsDisabled



    happening_toggle.addEventListener('change', () => {
        chrome.storage.sync.set({happening_toggle: (happening_toggle.checked) }).then((result)=> {
            console.log("value set to "  + happening_toggle.checked)
        }).catch((error)=> {"error :  "+ error})
        

        send_message_to_current_tab("happening_toggle", happening_toggle.checked)
        
    })

    ads_off_toggle.addEventListener('change', () => {
        send_message_to_current_tab("ads_off_toggle", ads_off_toggle.checked)
        chrome.storage.sync.set({ads_off_toggle: (ads_off_toggle.checked) }).then((result)=> {
            console.log("value set to "  + ads_off_toggle.checked)
        }).catch((error)=> {"error :  "+ error})
    })

    

    
}

async function send_message_to_current_tab(message, checked_status){

    try{
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow : true})
        if(tab?.id){
            await chrome.tabs.sendMessage(tab.id, {message : message, status : checked_status})
        }
        else{
            console.log("Error : " + error)
        }
    }
    catch (error){
        console.log(error)
    }
}

console.log("WORKING...")
document.addEventListener('DOMContentLoaded', () => {
    settings()
})