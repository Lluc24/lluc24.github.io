// Fetch navbar.html and insert it into the page
fetch('partial/navbar.html')
    .then(response => response.text()) // get the HTML content
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));
