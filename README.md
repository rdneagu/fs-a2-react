# How to install

### 1. Prerequisites
#### Windows
- [node.js >= 13.7.0](https://nodejs.org/en/)
  - Make sure to check **`Automatically install the necessary tools`** since the xml2json package has a dependency that requires compiling
#### Linux
- Debian repository: **`sudo apt install nodejs`**
- AUR repository: **`sudo pacman -S nodejs`**

### 2. Modules

After cloning the repository, run **`npm install`** while in the root directory of the project. npm will automatically attempt to download and install all the required dependencies

Try one of the fixes [here](https://github.com/rdneagu/fs-a2-react#4-issues) if you run into problems during this process though the problem arises only on older versions of node.js, fresh Linux distro system or Windows systems that did not install the necessary tools during the node.js installation process.

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

If you run Windows and the node-expat dependency, used by the [xml2json](https://www.npmjs.com/package/xml2json) package, failes to build, there are some fixes documented [here](https://github.com/astro/node-expat/blob/master/README.md#windows)

Alternatively, if you run Ubuntu (possibly all the Debian distros) and the node-expat dependency fails to build, try to install **`sudo apt install build-essential`** and then run the **`npm install`** command again

