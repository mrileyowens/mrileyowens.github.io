// Get all album elements
const albums = document.querySelectorAll('.album');

// Loop through each album and attach an event listener
albums.forEach(album => {
    const modal = album.querySelector('.modal');

    album.addEventListener('click', () => {
        modal.showModal();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll("img[data-src]");

    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute("data-src");

                    img.setAttribute("src", src);
                    img.removeAttribute("data-src");

                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    images.forEach(lazyLoad);
});