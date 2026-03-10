document.addEventListener('DOMContentLoaded', function () {
    loadSkills();
});

function loadSkills() {
    fetch('data/skills.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(skillsData => {
            displaySkills(skillsData);
        })
        .catch(error => {
            console.error('Error loading skills:', error);
            document.getElementById('skillsContainer').innerHTML = '<div class="error-message">Failed to load skills. Please try again later.</div>';
        });
}

function displaySkills(skillsArray) {
    const skillsContainer = document.getElementById('skillsContainer');

    // Clear the loading message
    skillsContainer.innerHTML = '';

    if (!skillsArray || skillsArray.length === 0) {
        skillsContainer.innerHTML = '<div class="error-message">No skills data available.</div>';
        return;
    }

    // Generate HTML for each skill category
    skillsArray.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        categoryDiv.innerHTML = `
            <h3>${category.category}</h3>
            <ul class="skill-list">
                ${category.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;

        skillsContainer.appendChild(categoryDiv);
    });
}