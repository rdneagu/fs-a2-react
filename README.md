# How to install

### 1. Prerequisites
#### Windows
- [node.js >= 13.7.0](https://nodejs.org/en/)
  - Make sure to check **`Automatically install the necessary tools`** since the project contains a module that requires compiling
#### Linux
- Debian repository: **`sudo apt install nodejs`**
- AUR repository: **`sudo pacman -S nodejs`**

### 2. Modules

Run **`npm install`** while in the root directory of the project. npm will automatically attempt to download and install all the required dependencies

### 3. Starting Up

#### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run api`

Runs the web service which holds the API endpoints
- /api/getMorningFlights
- /api/getPercentageOfFlights
- /api/getMostPopularDestinations
- /api/getAvgJourneyTime
- /api/getNumberOfFlightsPerDay
