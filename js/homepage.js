fetch('data/homepage.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').innerText = data.name;
        document.getElementById('position').innerText = data.position;
        document.getElementById('photo').src = data.photo;
    })
    .catch(error => console.error('Error loading homepage data:', error));
