function toggleText(button) {
  var textContainer = button.closest('.observation'); // Find the common ancestor
  var textElement = textContainer.querySelector('.info'); // Find the hidden text within the container
  if (textElement.classList.contains('hidden')) {
    textElement.classList.remove('hidden'); // Show the text
  } else {
    textElement.classList.add('hidden'); // Hide the text
  }
}