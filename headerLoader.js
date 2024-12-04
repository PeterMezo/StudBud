document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Dispatch custom event after header is loaded
            document.dispatchEvent(new Event('headerLoaded'));
        })
        .catch(error => console.error('Error loading header:', error));
});
