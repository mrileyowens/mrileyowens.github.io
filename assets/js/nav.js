const defaultSections = {
    "research": "interests"
};

// Add navigation functionality to the banner
document.getElementById("banner").addEventListener("load", function() {

    // Get the contents of the SVG
    let svg = this.contentDocument;
    
    // Get the buttons
    let buttons = svg.querySelector("#g8").children;

    // Get the labels of the buttons
    let labels = svg.querySelector("#g7").children;

    // Disable pointer events on each label to prevent them from interfering with clicking the buttons
    Array.from(labels).forEach(label => {
        label.setAttribute("pointer-events", "none");
    });

    // For each button
    Array.from(buttons).forEach((button, index) => {

        // Get the label corresponding to the button
        let label = labels[index].querySelector("tspan");

        // Check if the button corresponds to the current page
        let isActive = window.location.pathname === `/${button.getAttribute("inkscape:label").toLowerCase()}.html`;

        // Make the cursor change to a pointer when hovering over the button
        button.style.cursor = "pointer";

        // If the current page corresponds to the button, 'fill' the button by flipping the color of the button and label
        if (isActive) {
            button.style.fill = "#d2b069";
            label.style.fill = "#26252c";
        }

        // Add a smooth color transition for the button and label for the hover effect below. The timeout wrap makes sure 
        // that buttons appear already filled when arriving at their corresponding page, rather than also fading in
        setTimeout(() => {
            button.style.transition = "fill 0.25s ease-in-out";
            label.style.transition = "fill 0.25s ease-in-out";
        }, 0);

        // Make hovering over the button flip the colors of the button and label
        button.addEventListener("mouseenter", () => {
            button.style.fill = "#d2b069";
            label.style.fill = "#26252c";
        });

        // Make ending the hover over the button return the colors of the button and label to their default,
        // if the button does not correspond to the current page
        button.addEventListener("mouseleave", () => {
            if (!isActive) {
                button.style.fill = "#26252c";
                label.style.fill = "#d2b069";
            }
        });

        // Make a click on the button redirect to the target page
        button.addEventListener("click", () => {

            // Get the target page based on the button's label
            let targetPage = `${button.getAttribute("inkscape:label").toLowerCase()}`;

            // Get the default section of the page, if applicable
            let targetSection = defaultSections[targetPage] ? `#${defaultSections[targetPage]}` : "";

            // Set the HREF to the target page
            window.location.href = `${targetPage}.html${targetSection}`;
        });
    });
});

window.addEventListener('DOMContentLoaded', () => {

});

window.addEventListener('hashchange', () => {

    console.log('Hash changed.')

    document.querySelectorAll('section')?.forEach( section => 
        section.classList.remove('active')
    );

    const hash = window.location.hash
    
    if (hash) {
        /*console.log(document.querySelectorAll(`section`))*/
        console.log(document.querySelector(`section${hash}`))
        document.querySelector(`section${hash}`).classList.add('active')
    }
});

//document.addEventListener("DOMContentLoaded", function () {
    //console.log(window.location.pathname)
    //let currentPage = window.location.pathname.split("/").pop().replace(".html", "")
    //if (currentPage in defaultSections) {
        //targetAnchor = document.querySelector(`a[href="#${defaultSections[currentPage]}"]`);
        //targetAnchor.classList.add('active')
    //}
//});

//document.addEventListener("DOMContentLoaded", function () {
    //// Force a reflow/repaint so :target applies instantly
    //document.body.style.display = "none";
    //requestAnimationFrame(() => {
        //document.body.style.display = "";
    //});
//});