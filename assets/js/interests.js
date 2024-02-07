const anyoneText = document.getElementById('anyone-text');
const scientistsText = document.getElementById('scientists-text');

const anyoneButton = document.getElementById('anyone-button');
const scientistsButton = document.getElementById('scientists-button');

// Add click event listeners to the buttons
anyoneButton.addEventListener('click', function() {
    anyoneText.classList.remove('hidden');
    anyoneText.classList.add('visible');
    scientistsText.classList.remove('visible');
    scientistsText.classList.add('hidden');
});

scientistsButton.addEventListener('click', function() {
    anyoneText.classList.remove('visible');
    anyoneText.classList.add('hidden');
    scientistsText.classList.remove('hidden');
    scientistsText.classList.add('visible');
});