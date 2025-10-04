fetch('data/education.json')
    .then(res => res.json())
    .then(education => {
        const container = document.getElementById('education');
        const template = document.getElementById('education-template');

        education.forEach(educ => {
            const clone = template.content.cloneNode(true);

            const imgEl = clone.querySelector('.education-image');
            imgEl.src = educ.image;
            imgEl.alt = educ.image_alt;
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

            clone.querySelector('.education-title').textContent = educ.title;
            clone.querySelector('.education-institution').textContent = educ.institution;
            clone.querySelector('.education-dates').textContent = educ.dates;
            clone.querySelector('.education-description').textContent = educ.description;
            clone.querySelector('.education-link').href = educ.link;

            container.appendChild(clone);
        });
    });