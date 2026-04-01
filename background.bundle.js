// background.js
console.log("Background Script Loaded");
function generate_happening_URL() {
  let today_UTC = /* @__PURE__ */ new Date();
  let offset = today_UTC.getTimezoneOffset() * 60 * 1e3;
  let estDate = new Date(today_UTC.getTime() - offset);
  let today_usable = estDate.toISOString().substring(0, 10);
  const skeleton = `https://maizepages.umich.edu/api/discovery/event/search?endsAfter=${today_usable}T18%3A10%3A56-05%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=`;
  return skeleton;
}
var MESSAGE_FROM_CONTENT_For_Happening = "maize pages happening data request";
var MESSAGE_FROM_CONTENT_For_Sports = "sports data request";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === MESSAGE_FROM_CONTENT_For_Happening) {
    const url = generate_happening_URL();
    fetch(url).then((response) => response.json()).then((data) => {
      sendResponse({ success: true, json: data });
    }).catch((error) => {
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
  if (message === MESSAGE_FROM_CONTENT_For_Sports) {
    console.log("Getting info");
    const LAMBDA_URL = "https://lvtiodrkrmergoo2cgdao73n2i0sdyuy.lambda-url.us-east-2.on.aws/";
    fetch(LAMBDA_URL).then((response) => response.json()).then((data) => {
      console.log("GOT");
      sendResponse({ success: true, json: data });
    }).catch((error) => {
      console.log("BROKEN");
      sendResponse({ success: false, error: error.message });
    });
    return true;
  }
});
