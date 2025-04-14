const snapshotDate = "1942"

//function buildingExistedAt(properties, snapshot) {
    //const start = properties.tags.start_date;
    //const end = properties.tags.end_date;

    //console.log(start, end)

    //if (start && snapshot < start) return false;
    //if (end && snapshot > end) return false;
    //return true;
//}

// Extract the first 4-digit year from a string
function extractYear(str) {
  if (!str) return null;
  const match = str.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

// Parse the OHM 'other_tags' string into a JS object
function parseOtherTags(otherTagsStr) {
  const tags = {};
  if (!otherTagsStr) return tags;

  // This regex matches key=>value pairs in the string
  const regex = /"([^"]+)"=>"(.*?)"/g;
  let match;
  while ((match = regex.exec(otherTagsStr)) !== null) {
    tags[match[1]] = match[2];
  }
  return tags;
}

// Filter function that checks if a building existed at the snapshot year
function buildingExistedAt(properties, snapshotYear) {
  const tags = parseOtherTags(properties.other_tags);

  const startYear = extractYear(tags.start_date);
  const endYear = extractYear(tags.end_date);

  if (startYear && snapshotYear < startYear) return false;
  if (endYear && snapshotYear > endYear) return false;
  return true;
}

var map = L.map('map').setView([39.1031, -84.5120], 13);

L.control.scale().addTo(map);

document.getElementById("map").style.backgroundColor = "#26252c";

//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //maxZoom: 19,
    //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

fetch('../assets/map/lines.geojson')
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(data => {
    const filtered = {
        type: "FeatureCollection",
        features: data.features.filter(f => buildingExistedAt(f.properties, snapshotDate))
    }

    L.geoJSON(filtered, {
      style: {
        color: "#d2b069ff",
        //fillColor: "#d2b06933",
        fillOpacity: 0.5,
        weight: 1
      }
      //onEachFeature: function (feature, layer) {
        //const buildingId = feature.properties['@id'] || 'unknown';

        //layer.on('click', () => {
          //showGalleryForBuilding(buildingId);
        //});
    }).addTo(map);
  //data.features.map(f => f.geometry.type)
  });

fetch('../assets/map/multipolygons.geojson')
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(data => {
    const filtered = {
        type: "FeatureCollection",
        features: data.features.filter(f => buildingExistedAt(f.properties, snapshotDate))
    }

    L.geoJSON(filtered, {
      style: {
        color: "#d2b069ff",
        fillColor: "#d2b069ff",
        fillOpacity: 0.2,
        weight: 1
      }
      //onEachFeature: function (feature, layer) {
        //const buildingId = feature.properties['@id'] || 'unknown';

        //layer.on('click', () => {
          //showGalleryForBuilding(buildingId);
        //});
    }).addTo(map);
  //data.features.map(f => f.geometry.type)
  });

function showGalleryForBuilding(buildingId) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  const images = getImagesForBuilding(buildingId);
  images.forEach(({ date, src }) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${buildingId} in ${date}`;
    gallery.appendChild(img);
  });

  document.getElementById('galleryModal').showModal();
}