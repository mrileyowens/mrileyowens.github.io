const interestsSection = document.getElementById('interests');
const publicationsSection = document.getElementById('publications');
const presentationsSection = document.getElementById('presentations');
const observationsSection = document.getElementById('observations');

const interestsButton = document.getElementById('interests-button');
const publicationsButton = document.getElementById('publications-button');
const presentationsButton = document.getElementById('presentations-button');
const observationsButton = document.getElementById('observations-button');

// Add click event listeners to the buttons
interestsButton.addEventListener('click', function() {

    interestsSection.classList.remove('hidden');
    publicationsSection.classList.remove('hidden');
    presentationsSection.classList.remove('hidden');
    observationsSection.classList.remove('hidden');

    interestsSection.classList.remove('visible');
    publicationsSection.classList.remove('visible');
    presentationsSection.classList.remove('visible');
    observationsSection.classList.remove('visible');

    interestsSection.classList.add('visible')
    publicationsSection.classList.add('hidden')
    presentationsSection.classList.add('hidden')
    observationsSection.classList.add('hidden')

    interestsButton.classList.add('selected')
    publicationsButton.classList.remove('selected')
    presentationsButton.classList.remove('selected')
    observationsButton.classList.remove('selected')
});

publicationsButton.addEventListener('click', function() {

    interestsSection.classList.remove('hidden');
    publicationsSection.classList.remove('hidden');
    presentationsSection.classList.remove('hidden');
    observationsSection.classList.remove('hidden');

    interestsSection.classList.remove('visible');
    publicationsSection.classList.remove('visible');
    presentationsSection.classList.remove('visible');
    observationsSection.classList.remove('visible');

    interestsSection.classList.add('hidden')
    publicationsSection.classList.add('visible')
    presentationsSection.classList.add('hidden')
    observationsSection.classList.add('hidden')

    interestsButton.classList.remove('selected')
    publicationsButton.classList.add('selected')
    presentationsButton.classList.remove('selected')
    observationsButton.classList.remove('selected')
});

presentationsButton.addEventListener('click', function() {

    interestsSection.classList.remove('hidden');
    publicationsSection.classList.remove('hidden');
    presentationsSection.classList.remove('hidden');
    observationsSection.classList.remove('hidden');

    interestsSection.classList.remove('visible');
    publicationsSection.classList.remove('visible');
    presentationsSection.classList.remove('visible');
    observationsSection.classList.remove('visible');

    interestsSection.classList.add('hidden')
    publicationsSection.classList.add('hidden')
    presentationsSection.classList.add('visible')
    observationsSection.classList.add('hidden')

    interestsButton.classList.remove('selected')
    publicationsButton.classList.remove('selected')
    presentationsButton.classList.add('selected')
    observationsButton.classList.remove('selected')
});

observationsButton.addEventListener('click', function() {

    interestsSection.classList.remove('hidden');
    publicationsSection.classList.remove('hidden');
    presentationsSection.classList.remove('hidden');
    observationsSection.classList.remove('hidden');

    interestsSection.classList.remove('visible');
    publicationsSection.classList.remove('visible');
    presentationsSection.classList.remove('visible');
    observationsSection.classList.remove('visible');

    interestsSection.classList.add('hidden')
    publicationsSection.classList.add('hidden')
    presentationsSection.classList.add('hidden')
    observationsSection.classList.add('visible')

    interestsButton.classList.remove('selected')
    publicationsButton.classList.remove('selected')
    presentationsButton.classList.remove('selected')
    observationsButton.classList.add('selected')
});