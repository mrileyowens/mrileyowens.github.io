function toggleText(button) {

  var textContainer = button.closest('.observation'); // Find the common ancestor
  var textElement = textContainer.querySelector('.info'); // Find the hidden text within the container
  var chevron = textContainer.querySelector('.fa');

  textElement.classList.toggle('hidden');
  chevron.classList.toggle('fa-rotate-180')

  //if (textElement.classList.contains('hidden')) {
    //textElement.classList.remove('hidden'); // Show the text
    //chevron.classList.add('selected');
  //} else {
    //textElement.classList.add('hidden'); // Hide the text
    //chevron.classList.remove('selected');
  //}
}