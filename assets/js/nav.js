document.getElementById("nav-svg").addEventListener("load", function() {
    let svgDoc = this.contentDocument;
    
    let buttons = svgDoc.querySelector("#g8").children;

    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = button.getAttribute("inkscape:label").toLowerCase() + ".html";
        });
    });
    
    // Example: Making an existing SVG shape clickable
    //let button = svgDoc.getElementById("button-area");
    //button.style.cursor = "pointer";
    //button.addEventListener("click", function() {
        //window.location.href = "page1.html";
    //});
});