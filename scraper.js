// Scrape ' '
const URL = 'https://maizepages.umich.edu/events'


const events_list = document.querySelector('#event-discovery-list > div');

const scrapedResults = [];

// 2. Loop through each item
events_list.forEach((item) => {
    // 3. Find details INSIDE this specific item using item.querySelector (not document)
    
    const event_name = item.querySelector('h3')?.innerText.trim();

    // 4. Push to our results array
    if (title) { // Only add if we actually found a title
        scrapedResults.push({
            title: title,
            price: price,
            url: link,
            image: img
        });
    }
});

// 5. Send the whole list to storage
chrome.storage.local.set({ allData: scrapedResults }, () => {
    console.log(`Successfully scraped ${scrapedResults.length} items!`);
});

