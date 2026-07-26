# 〽️ Michigan + 

A Chrome extension that enhances the University of Michigan's Canvas dashboard with campus event info, sports schedules, and a cleaner UI.

<img width="2536" height="519" alt="image" src="https://github.com/user-attachments/assets/073a8c62-8c0c-4c01-b4a7-ee5ca909e790" />


## Features

- **Happening Soon Events** : Pulls upcoming campus events from [Maize Pages](https://maizepages.umich.edu/) and displays them directly on the Canvas dashboard, with one-click "Add to Google Calendar" links.
- **Sports Events** : Shows upcoming Michigan sports events, sourced from a companion AWS Lambda + DynamoDB backend.
- **Remove Banners** : Hides promotional "Future" ad banners on the Canvas dashboard.
- **Toggle Popup** : Each feature can be independently enabled or disabled from the extension's popup, with preferences synced via `chrome.storage.sync`.

## Under Development : 
- Google Maps pathfinding for class schedule
- Dining hall menus

## Installation (for development & testing of extension)

1. Clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the repository/folder root.

## Project Structure

```
.
├── manifest.json          # Extension manifest (MV3)
├── background.js          # Service worker source (fetches happening/sports data)
├── background.bundle.js   # Bundled output of background.js (via esbuild)
├── content.js             # Injects UI into the Canvas dashboard
├── eventClass.js          # Event data model + Google Calendar link generation
├── sportsClass.js         # Sports event data model
├── popup/                 # Extension popup UI
│   ├── popup.html
│   ├── display.js
│   └── style.css
├── data/                  # Static image assets
│   ├── 48.png
│   └── 128.png
└── package.sh              # Bundles background.js and zips the extension for release
```

## Development

Install dependencies:

```bash
  npm install
```

### Packaging a release

```bash
./package.sh
```

This bundles `background.js` into `background.bundle.js` and produces a versioned zip (using the version from `manifest.json`) in `zips/`, ready to upload to the Chrome Web Store.

## Permissions

- `storage` > Persists user feature preferences
- `activeTab` > Makes toggle changes to the current Canvas tab.
- Host permissions > for `maizepages.umich.edu` and the sports data AWS Lambda endpoints are used to fetch sports and club event data.

## Authors

Max Maley, Adit Vuppala





