# How to install

### 1. Prerequisites
#### Windows
- Python >=2.7 (comes with node.js)
- Visual Studio 2017 Build Tools (comes with node.js)
- [node.js >= 13.7.0](https://nodejs.org/en/)
  - Make sure to check **`Automatically install the necessary tools`** since node-sass and xml2json packages requires Visual Studio 2017 Build Tools and Python
#### Linux
- Python >=2.7
- Debian repository: **`sudo apt install nodejs build-essentials`**
- AUR repository: **`sudo pacman -S nodejs base-devel`**

### 2. Modules

After cloning the repository, run **`npm install`** while in the root directory of the project. npm will automatically attempt to download and install all the required dependencies

Read [here](https://github.com/rdneagu/fs-a2-react#4-issues) if you run into problems during this process.

### 3. Starting Up

**`npm run start`**

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**`npm run api`**

Runs the web service on port :5000 which contains the API endpoints and the server logic
- /api/getMorningFlights
- /api/getPercentageOfFlights
- /api/getMostPopularDestinations
- /api/getAvgJourneyTime
- /api/getNumberOfFlightsPerDay

### 4. Issues

If you run Windows and the packages fail to build (node-expat and/or node-sass) try to re-install node.js and make sure the necessary tools are installed without errors (Python and Visual Studio 2017 Build Tools). There are also some fixes documented [here](https://github.com/astro/node-expat/blob/master/README.md#windows) given the problem still persists.

Linux systems should not have any problem if you followed [the instructions](https://github.com/rdneagu/fs-a2-react#1-prerequisites)

