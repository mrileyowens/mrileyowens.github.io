// Get all album elements
const albums = document.querySelectorAll('.album');

// Loop through each album and attach an event listener
albums.forEach(album => {
    const modal = album.querySelector('.modal');

    album.addEventListener('click', () => {
        modal.showModal();
    });
});