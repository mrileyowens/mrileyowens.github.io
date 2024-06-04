const overviewSection = document.getElementById('overview');
const teachingSection = document.getElementById('teaching');
const writingSection = document.getElementById('writing');

const overviewButton = document.getElementById('overview-button');
const teachingButton = document.getElementById('teaching-button');
const writingButton = document.getElementById('writing-button');

// Add click event listeners to the buttons
overviewButton.addEventListener('click', function() {

    overviewSection.classList.remove('hidden');
    teachingSection.classList.remove('hidden');
    writingSection.classList.remove('hidden');

    overviewSection.classList.remove('visible');
    teachingSection.classList.remove('visible');
    writingSection.classList.remove('visible');

    overviewSection.classList.add('visible')
    teachingSection.classList.add('hidden')
    writingSection.classList.add('hidden')

    overviewButton.classList.add('selected')
    teachingButton.classList.remove('selected')
    writingButton.classList.remove('selected')
});

teachingButton.addEventListener('click', function() {

    overviewSection.classList.remove('hidden');
    teachingSection.classList.remove('hidden');
    writingSection.classList.remove('hidden');

    overviewSection.classList.remove('visible');
    teachingSection.classList.remove('visible');
    writingSection.classList.remove('visible');

    overviewSection.classList.add('hidden')
    teachingSection.classList.add('visible')
    writingSection.classList.add('hidden')

    overviewButton.classList.remove('selected')
    teachingButton.classList.add('selected')
    writingButton.classList.remove('selected')
});

writingButton.addEventListener('click', function() {

    overviewSection.classList.remove('hidden');
    teachingSection.classList.remove('hidden');
    writingSection.classList.remove('hidden');

    overviewSection.classList.remove('visible');
    teachingSection.classList.remove('visible');
    writingSection.classList.remove('visible');

    overviewSection.classList.add('hidden')
    teachingSection.classList.add('hidden')
    writingSection.classList.add('visible')

    overviewButton.classList.remove('selected')
    teachingButton.classList.remove('selected')
    writingButton.classList.add('selected')
});