import {
  apiUrl,
  mapZoomLevel,
  issIcon,
  intTime,
  noOfArticles,
  newsApiUrl,
} from "./config.js";

let issMarker;
let map;

//--- Functions ----//

/*/**
 * Function to get ISS data
 * @param {api url for getting ISS data} url
 * @returns (latitude, longitude, velocity, visibility, altitude)
 */
const getIssData = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  const { latitude, longitude, velocity, visibility, altitude } = data; // using deconstruction method to get the data. less code.
  return { latitude, longitude, velocity, visibility, altitude };
};

/*/**
 * Function to update ISS Marker position
 */
const updateIssPosition = async function () {
  const cordinates = await getIssData(apiUrl);
  map.panTo([cordinates.latitude, cordinates.longitude]);
  issMarker.setLatLng([cordinates.latitude, cordinates.longitude]);
  updateIssDataOnScreen(cordinates);
};

/*/**
 * Function to update ISS details on screeen
 * @param {data from ISS (This is coming from the getISSData function)} data
 */
const updateIssDataOnScreen = function (data) {
  const latitude = document.getElementById("latitude");
  const longitude = document.getElementById("longitude");
  const velocity = document.getElementById("velocity");
  const visibility = document.getElementById("visibility");
  const altitude = document.getElementById("altitude");

  latitude.innerHTML = data.latitude.toFixed(6);
  longitude.innerHTML = data.longitude.toFixed(6);
  velocity.innerHTML = `${data.velocity.toFixed(2)} kph`;
  altitude.innerHTML = data.altitude.toFixed(6);
  visibility.innerHTML = `${
    data.visibility === "daylight" ? "Day light ☀️" : data.visibility
  }`;
};

/*/**
 * Function to get the News articles from News API
 * @param {news api url} url
 * @returns newsArticles
 */
const getNews = async function (url) {
  const response = await fetch(url);
  const newsData = await response.json();
  const newsArticles = newsData.articles;
  return newsArticles;
};

//------------------------------------------------------------------>
/*/**
// Initializing the Map & ISS Marker
*/

// Setting up the Map
getIssData(apiUrl).then((data) => {
  map = L.map("issMap").setView([data.latitude, data.longitude], mapZoomLevel);
  updateIssDataOnScreen(data);
  // setting up map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Creating a custom icon
  const mapIcon = L.icon({
    iconUrl: issIcon,
    iconSize: [100, 64], // size of the icon
    iconAnchor: [50, 32], // point of the icon which will correspond to marker's location
  });
  // Adding the Marker
  issMarker = L.marker([data.latitude, data.longitude], {
    icon: mapIcon,
  }).addTo(map);
  return issMarker;
});

/*/**
// Update HTML with new News data
*/
getNews(newsApiUrl).then((artcles) => {
  for (let i = 0; i < noOfArticles; i++) {
    let newsHtml = `<div class="news">
<img id="news-image" class="news-item" src="/media/planet.png"
alt="blue color planet icon" >
<a href="${artcles[i].url}" target="_blank" class="news-item">${artcles[i].title}</a>
</div>`;
    document
      .getElementById("news-container")
      .insertAdjacentHTML("afterend", newsHtml);
  }
});

// Updating ISS Marker every 1 second
setInterval(updateIssPosition, intTime);

//----------------- Adjusting Style ----------------------------------

// Adjusting the Container height based on browser window height
const screenHeight = window.screen.height;
document.getElementById("container").style.height = screenHeight;

// Adjusting top-margine for footer in Info panel
const idealWindowSize = 900;
const newMargine = screenHeight - idealWindowSize;
document.getElementById("footer-container").style.marginTop = newMargine;
