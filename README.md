# Preview

![Project Animation](https://media.giphy.com/media/dUefio9NY26Kw05Ecr/giphy.gif)

# How to install

### 1. Prerequisites
#### Windows
- Python >= 2.7 (comes with node.js)
- Visual Studio 2017 Build Tools (comes with node.js)
- [node.js >= 13.7.0](https://nodejs.org/en/)
  - Make sure to check **`Automatically install the necessary tools`** since node-sass and xml2json packages requires Visual Studio 2017 Build Tools and Python
#### Linux
- Python >= 2.7
- Debian repository: **`sudo apt install nodejs build-essentials`**
- AUR repository: **`sudo pacman -S nodejs base-devel`**

### 2. Installing

After cloning the repository, run **`npm install`** while in the root directory of the project. npm will automatically attempt to download and install all the required dependencies

Read [here](https://github.com/rdneagu/fs-a2-react#4-issues) if you run into problems during this process.

### 3. Starting Up

**`npm run start`**

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**NOTE: that the application will display a continuous loading animation if the API web service is not running**

**`npm run api`**

Runs the web service on port :5000 which contains the API endpoints and the server logic
- **/api/getMorningFlights** (gets all the morning flights betweeen 6 and 12 AM)
- **/api/getPercentageOfFlights** (gets the percentage of the flights going into a specific country)
  - **`country` param** - specify which country to look up for
- **/api/getMostPopularDestinations** (gets the most popular destinations up to n elements)
  - **`limit` param** - specify how many destinations to fit in the response (defaults to 10)
- **/api/getAvgJourneyTime** (gets the average journey time for both in and out flights from a departure point to a destination point)
  - **`departure` param**   - specify the departure point as IATA code
  - **`destination` param** - specify the destination point as IATA code
  
  This one was a bit tricky due to the timezone discrepancies since I did not know if I should take them into consideration. I ended up taking them and the journey times are more or less similar with Google flights
- **/api/getNumberOfFlightsPerDay** (gets the number of flights per day in a specific month and year)
  - **`year` param**  - specify which year to look up into
  - **`month` param** - specify which month to look up into
  
  Due to the nature of data having only information about the flights in January 2018, the API can only support January 2018

### 4. Tools Used

- Front-End
  - [React](https://reactjs.org/)
  - [axios](https://github.com/axios/axios) (to make HTTP requests)
  - [amCharts4](https://www.amcharts.com/docs/v4/) (for the interactive charts)
- Back-end
  - [node.js](https://nodejs.org/en/)
  - [xml2json](https://www.npmjs.com/package/xml2json) (used to convert the XML data file to JSON data on server start up)
- Both ends
  - [lodash](https://lodash.com/)

### 5. Issues

If you run Windows and the packages fail to build (node-expat and/or node-sass) try to re-install node.js and make sure the necessary tools are installed without errors (Python and Visual Studio 2017 Build Tools). There are also some fixes documented [here](https://github.com/astro/node-expat/blob/master/README.md#windows) given the problem still persists.

Linux systems should not have any problems if you followed [the instructions](https://github.com/rdneagu/fs-a2-react#1-prerequisites)
