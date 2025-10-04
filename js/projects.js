fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
        const container = document.getElementById('projects');
        const template = document.getElementById('project-template');

        projects.forEach(proj => {
            const clone = template.content.cloneNode(true);

            const imgEl = clone.querySelector('.project-image');
            imgEl.src = proj.image;
            imgEl.alt = proj.image_alt;
            imgEl.onload = function() {
                const ratio = imgEl.naturalWidth / imgEl.naturalHeight;
                if (ratio > 1) {
                    imgEl.style.height = "50%";
                    imgEl.style.width = "auto";
                } else {
                    imgEl.style.width = "50%";
                    imgEl.style.height = "auto";
                }
            };

            clone.querySelector('.project-title').textContent = proj.title;
            clone.querySelector('.project-description').textContent = proj.description;
            clone.querySelector('.project-link').href = proj.link;

            container.appendChild(clone);
        });
    });