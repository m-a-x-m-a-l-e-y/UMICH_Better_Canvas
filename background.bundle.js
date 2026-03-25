(() => {
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
    } else if (message === MESSAGE_FROM_CONTENT_For_Sports) {
      sendResponse({ success: false, error: "Sports data feature is currently disabled." });
      console.log("Getting info");
      const client = new DynamoDBClient({
        region: "us-east-1",
        credentials: fromCognitoIdentityPool({
          identityPoolId: "us-east-1:your-identity-pool-id-here",
          // Get from AWS Console
          clientConfig: { region: "us-east-1" }
        })
      });
      return true;
    }
  });
})();
