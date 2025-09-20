fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
        const container = document.getElementById('projects');
        const template = document.getElementById('project-template');

        projects.forEach(proj => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('.project-image').src = proj.image;
            clone.querySelector('.project-image').alt = proj.image_alt;
            clone.querySelector('.project-title').textContent = proj.title;
            clone.querySelector('.project-description').textContent = proj.description;
            clone.querySelector('.project-link').href = proj.link;

            container.appendChild(clone);
        });
    });