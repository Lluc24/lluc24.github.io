fetch('data/experience.json')
    .then(res => res.json())
    .then(experience => {
        const container = document.getElementById('experience');
        const template = document.getElementById('experience-template');

        experience.forEach(exp => {
            const clone = template.content.cloneNode(true);

            const imgEl = clone.querySelector('.experience-image');
            imgEl.src = exp.image;
            imgEl.alt = exp.image_alt;
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

            clone.querySelector('.experience-title').textContent = exp.title;
            clone.querySelector('.experience-institution').textContent = exp.institution;
            clone.querySelector('.experience-dates').textContent = exp.dates;
            clone.querySelector('.experience-description').textContent = exp.description;
            clone.querySelector('.experience-link').href = exp.link;

            container.appendChild(clone);
        });
    });