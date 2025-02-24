document.getElementById("nav-svg").addEventListener("load", function() {
    let svgDoc = this.contentDocument;
    
    let buttons = svgDoc.querySelector("#g8").children;
    let background = document.getElementById("background");

    let isLandingPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    let labels = svgDoc.querySelector("#g7").children;

    Array.from(labels).forEach(label => {
        label.setAttribute("pointer-events", "none");
    });

    Array.from(buttons).forEach((button, index) => {

        let label = labels[index].querySelector("tspan");
        console.log(label)

        button.style.cursor = "pointer";

        //if (localStorage.getItem(button.id) === "clicked") {
            //button.style.fill = "#d2b069ff";
        //}

        button.style.transition = "fill 0.25s ease-in-out";
        label.style.transition = "fill 0.25s ease-in-out";

        button.addEventListener("mouseenter", () => {
            button.style.fill = "#d2b069";
            label.style.fill = "#26252c";
        })

        button.addEventListener("mouseleave", () => {
            button.style.fill = "#26252c";
            label.style.fill = "#d2b069";
        })

        button.addEventListener("click", (event) => {
            console.log('Clicked!');

            //button.style.fill = "#d2b069ff";
            //localStorage.setItem(button.id, "clicked")

            let targetPage = button.getAttribute("inkscape:label").toLowerCase() + ".html";
            //if (isLandingPage) {
                //// If we're on index.html, animate the background before navigating
                //background.classList.add("inactive");

                //event.preventDefault(); // Prevent immediate navigation

                //setTimeout(() => {
                    //window.location.href = targetPage;
                //}, 500); // Matches the CSS transition duration
            //} else {
                //window.location.href = targetPage;
            //}

            window.location.href = targetPage;
        
            //button.setProperty("fill", "#d2b069ff")

        });

        //button.style.cursor = "pointer";
        //button.setAttribute("pointer-events", "all");
        console.log(button.getAttribute("pointer-events"))
    });

    //let labels = svgDoc.querySelector("#g7").children;

    //Array.from(labels).forEach(label => {
        //label.setAttribute("pointer-events", "none");
    //});
    // Example: Making an existing SVG shape clickable
    //let button = svgDoc.getElementById("button-area");
    //button.style.cursor = "pointer";
    //button.addEventListener("click", function() {
        //window.location.href = "page1.html";
    //});
});