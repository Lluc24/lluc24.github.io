fetch('data/homepage.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').innerText = data.name;
        document.getElementById('position').innerText = data.position;
        document.getElementById('photo').src = data.photo;
        document.getElementById('about-me').innerText = data.about_me;
    })
    .catch(error => console.error('Error loading homepage data:', error));
