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
                    const heightPercentage = 1/ratio * 100;
                    imgEl.style.maxHeight = `${heightPercentage}%`;
                    imgEl.style.maxWidth = "auto";
                } else {
                    const widthPercentage = ratio * 100;
                    imgEl.style.maxWidth = `${widthPercentage}%`;
                    imgEl.style.maxHeight = "auto";
                }
            };

            clone.querySelector('.project-title').textContent = proj.title;
            clone.querySelector('.project-description').textContent = proj.description;
            clone.querySelector('.project-link').href = proj.link;

            container.appendChild(clone);
        });
    });