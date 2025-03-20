function updatePadding() {
    document.querySelectorAll('section.active').forEach(section => {
        if (section.scrollHeight > section.clientHeight) {
            section.style.paddingRight = '1rem';  // Adjust based on scrollbar width
            section.style.marginTop = '1rem';
        } else {
            section.style.paddingRight = '0rem';
            section.style.marginTop = '0rem';
        }
    });
}

// Run on load and when window resizes (to catch dynamic changes)
window.addEventListener('load', updatePadding);
window.addEventListener('resize', updatePadding);