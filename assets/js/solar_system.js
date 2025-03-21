
const svg = document.getElementById("solar_system");

// Dimensions and scaling
const svgWidth = svg.clientWidth;
const svgHeight = svg.clientHeight;
const scale = 200; // Pixels per AU

// Center of the SVG
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

// Function to get the current UTC time
async function getUTCTime() {
    try {
        // Fetch the current UTC time
        const response = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");

        // If the fetch fails, throw an error to exit the try block
        if (!response.ok) {
            throw new Error("Failed to fetch the current UTC time.");
        }

        // Place the fetch into a JSON format
        const data = await response.json();

        // Parse the datetime string
        const now = new Date(data.datetime); // This is already in UTC
        const unixTime = now.getTime(); // Milliseconds since Unix epoch
        const JD_UNIX_EPOCH = 2440587.5; // Julian Date for Unix epoch
        return JD_UNIX_EPOCH + unixTime / 86400000; // Convert milliseconds to days
    } catch (error) {
        console.error("Error fetching current time:", error);
        return null; // Handle fallback if the fetch fails
    }
}

// Function to get the client system's local time
function getLocalTime() {
    // Get the client system's local time
    const now = new Date(); // Uses client system time
    const unixTime = now.getTime();
    const JD_UNIX_EPOCH = 2440587.5;
    return JD_UNIX_EPOCH + unixTime / 86400000;
}

// Function to get the current time
async function getTime() {
    // Get the current UTC time
    const utc_time = await getUTCTime();

    // Return the UTC time, unless fetching it failed, in which case return the client's local time
    return utc_time || getLocalTime();
}

//function parseEphemerides(data) {
    //const lines = data.split("\n");
    //const ephemerides = [];
    //let currentEntry = null;

    //// For each line in the .txt file
    //for (const line of lines) {

        //if (line.trim() === "") continue;

        //if (line.includes("=")) {
            //const [key, value] = line.split("=").map(s => s.trim());

            //if (key.startsWith("24")) {
                //// Start a new entry
                //if (currentEntry) ephemerides.push(currentEntry);

                //currentEntry = { JD: parseFloat(key), x: 0, y: 0 };
            //} else if (key === "X") {

                //const regex = /X\s*=\s*(-?\d+\.\d+E[+-]?\d+)\s*Y\s*=\s*(-?\d+\.\d+E[+-]?\d+)\s*Z\s*=\s*(-?\d+\.\d+E[+-]?\d+)/;
                //const match = line.match(regex);

                //if (match) {
                    //currentEntry.x = parseFloat(match[1]);
                    //currentEntry.y = parseFloat(match[2]);
                //} else {
                    //console.error("Invalid coordinate string format");
                //}
            //}
        //}
    //}

    //if (currentEntry) ephemerides.push(currentEntry);
    //return ephemerides;
//}

function parseOrbitalElements(data) {
    const lines = data.split("\n");
    const orbital_elements = [];
    let currentEntry = null;

    // Regular expressions for extracting data
    const jdRegex = /^(\d+\.\d+)\s+=\s+.*$/; // Match JD at the start of a line
    const ecQrInRegex = /EC\s*=\s*([\d.E+-]+)\s*QR\s*=\s*([\d.E+-]+)\s*IN\s*=\s*([\d.E+-]+)/;
    const omWtpRegex = /OM\s*=\s*([\d.E+-]+)\s*W\s*=\s*([\d.E+-]+)\s*Tp\s*=\s*([\d.E+-]+)/;
    const nMaTaRegex = /N\s*=\s*([\d.E+-]+)\s*MA\s*=\s*([\d.E+-]+)\s*TA\s*=\s*([\d.E+-]+)/;
    const aAdPrRegex = /A\s*=\s*([\d.E+-]+)\s*AD\s*=\s*([\d.E+-]+)\s*PR\s*=\s*([\d.E+-]+)/;

    // For each line in the .txt file
    for (const line of lines) {

        if (line.trim() === "") continue;

        // Check for JD and start a new entry
        const jdMatch = line.trim().match(jdRegex);

        if (jdMatch) {
            if (currentEntry) orbital_elements.push(currentEntry);
            currentEntry = { JD: parseFloat(jdMatch[1]) }; // Initialize new entry with JD
            continue;
        }

        // Match the lines with orbital elements
        let match;
        if ((match = line.match(ecQrInRegex))) {
            currentEntry.ec = parseFloat(match[1]);
            currentEntry.qr = parseFloat(match[2]);
            currentEntry.in = parseFloat(match[3]);
        } else if ((match = line.match(omWtpRegex))) {
            currentEntry.om = parseFloat(match[1]);
            currentEntry.w = parseFloat(match[2]);
            currentEntry.tp = parseFloat(match[3]);
        } else if ((match = line.match(nMaTaRegex))) {
            currentEntry.n = parseFloat(match[1]);
            currentEntry.ma = parseFloat(match[2]);
            currentEntry.ta = parseFloat(match[3]);
        } else if ((match = line.match(aAdPrRegex))) {
            currentEntry.a = parseFloat(match[1]);
            currentEntry.ad = parseFloat(match[2]);
            currentEntry.pr = parseFloat(match[3]);
        }
    }

    if (currentEntry) orbital_elements.push(currentEntry);
    return orbital_elements;
}

//async function fetchEphemerides(filePath) {
    //const response = await fetch(filePath);
    //const text = await response.text();
    //return parseEphemerides(text);
//}

//function getEphemerisForDate(time, ephemerides) {
    //let closestEntry = null;
    //let smallestDifference = Infinity;

    //for (const entry of ephemerides) {
        //const difference = Math.abs(entry.JD - time);
        //if (difference < smallestDifference) {
            //smallestDifference = difference;
            //closestEntry = entry;
        //}
    //}

    //return closestEntry;
//}

async function fetchOrbitalElements(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return parseOrbitalElements(text);
}

function getOrbitalElementsForDate(time, orbital_elements) {
    let closestEntry = null;
    let smallestDifference = Infinity;

    for (const entry of orbital_elements) {
        const difference = Math.abs(entry.JD - time);
        if (difference < smallestDifference) {
            smallestDifference = difference;
            closestEntry = entry;
        }
    }

    return closestEntry;
}

function renderPlanet(orbital_elements, svg, scale, computed_width) {
    //const svg = document.getElementById("solar_system");
    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    //const scale = 20; // Example scale to fit AU to pixels

    const sun = document.createElementNS("http://www.w3.org/2000/svg", "use");
    sun.setAttribute("href", "#sun")

    sun.setAttribute("x", centerX);
    sun.setAttribute("y", centerY);

    const e = orbital_elements.ec
    const a = orbital_elements.a

    const w = orbital_elements.w * Math.PI / 180
    const i = orbital_elements.in * Math.PI / 180
    const omega = orbital_elements.om * Math.PI / 180

    const ta = orbital_elements.ta * Math.PI / 180

    const orbit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let path = "";

    for (let ν = 0; ν < 2 * Math.PI * (1 + 1 / 360); ν += Math.PI / 180) { // Loop through 0 to 361 degrees
        const nu = ν// * Math.PI / 180; // Convert true anomaly to radians

        // Compute radius at this true anomaly
        const r = Math.pow((a * (1 - e * e)) / (1 + e * Math.cos(nu)), 1/5);

        // Compute projected X, Y in the ecliptic plane
        const X = r * (Math.cos(omega) * Math.cos(nu + w) - Math.sin(omega) * Math.sin(nu + w) * Math.cos(i));
        const Y = r * (Math.sin(omega) * Math.cos(nu + w) + Math.cos(omega) * Math.sin(nu + w) * Math.cos(i));

        // Convert to SVG coordinates
        const screenX = centerX + X * scale;
        const screenY = centerY - Y * scale; // Flip Y-axis for SVG

        if (ν === 0) {
            path += `M ${screenX} ${screenY} `;
        } else {
            path += `L ${screenX} ${screenY} `;
        }
    }

    orbit.setAttribute("d", path);
    orbit.setAttribute("stroke", "#d2b069");
    orbit.setAttribute("stroke-width", 0.0015 * computed_width)
    orbit.setAttribute("fill", "none");

    svg.appendChild(orbit);

    const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle")

    marker.setAttribute("r", 0.004 * computed_width)
    marker.setAttribute("fill", "#d2b069")
    marker.setAttribute("stroke", "#26252c")
    marker.setAttribute("stroke-width", 0.0025 * computed_width)

    //marker.setAttribute("href", "#earth")

    // Compute radius at this true anomaly
    const r = Math.pow((a * (1 - e * e)) / (1 + e * Math.cos(ta)), 1/5);

    // Compute projected X, Y in the ecliptic plane
    const X = r * (Math.cos(omega) * Math.cos(ta + w) - Math.sin(omega) * Math.sin(ta + w) * Math.cos(i));
    const Y = r * (Math.sin(omega) * Math.cos(ta + w) + Math.cos(omega) * Math.sin(ta + w) * Math.cos(i));

    const screenX = centerX + X * scale
    const screenY = centerY - Y * scale

    svg.appendChild(marker)

    const bbox = marker.getBBox();

    const marker_width = bbox.width;
    const marker_height = bbox.height;

    marker.setAttribute("cx", screenX)// marker_width / 2)
    marker.setAttribute("cy", screenY)// marker_height / 2)

}

document.addEventListener("DOMContentLoaded", async () => {

    const time = await getTime();

    const svg = document.getElementById('solar_system')

    if (time) {

        console.log("Current time:", time);

        const response = await fetch('assets/orbital_elements/orbital_elements_files.json');
        const data = await response.json();

        const current_orbital_elements_list = [];

        for (const planet of data.files) {

            // Proceed to find the ephemeris and render the planet
            //const ephemerides = await fetchEphemerides(`assets/ephemerides/${planet.file}`);
            //const ephemeris = getEphemerisForDate(time, ephemerides);

            const orbital_elements = await fetchOrbitalElements(`assets/orbital_elements/${planet.file}`)
            const current_orbital_elements = getOrbitalElementsForDate(time, orbital_elements)

            if (current_orbital_elements) {
                current_orbital_elements_list.push(current_orbital_elements);
            } else {
                console.error(`No ephemeris found for ${planet.name} for the current date.`);
            }
        }

        const a_max = current_orbital_elements_list.reduce((max, obj) => Math.max(max, obj.a), -Infinity)

        const width = svg.clientWidth;
        const height = svg.clientHeight;

        const img = new Image();
        img.src = getComputedStyle(document.getElementById('background')).backgroundImage.slice(5, -2); // Extract URL

        const computedWidth = window.innerHeight * (img.width / img.height)

        const space = computedWidth * (1 - 0.3 * 2) //Math.min(width, height) * (1 - 0.05 * 2);

        const scale = space / (2 * Math.pow(a_max, 1/5));

        current_orbital_elements_list.forEach(obj => {
            renderPlanet(obj, svg, scale, computedWidth);
        })

    } else {
        console.error("Failed to compute time.");
    }
});