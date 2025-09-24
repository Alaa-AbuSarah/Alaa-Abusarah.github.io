// projects.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to load projects from JSON
    function loadProjects() {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(projectsData => {
                displayProjects(projectsData);
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                document.getElementById('projectsGrid').innerHTML = '<div class="error-message">Failed to load projects. Please try again later.</div>';
            });
    }

    // Function to display projects
    function displayProjects(projects) {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projects || projects.length === 0) {
            projectsGrid.innerHTML = '<div class="error-message">No projects available.</div>';
            return;
        }
        // Clear loading message
        projectsGrid.innerHTML = '';
        // Generate HTML for each project
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card`;

            // Create image element if imageUrl exists, otherwise use fallback text
            let imageHtml = '';
            if (project.image) {
                imageHtml = `<img src="${project.image}" alt="${project.title}" />`;
            } else {
                // Generate project image text based on title (fallback)
                let imageText = project.title.split(' – ')[0] || project.title;
                if (imageText.length > 12) {
                    imageText = imageText.substring(0, 12) + '...';
                }
                imageHtml = `<div class="fallback">${imageText.toUpperCase()}</div>`;
            }

            projectCard.innerHTML = `
                <div class="project-image">
                    ${imageHtml}
                </div>
                <div class="project-content">
                    <div class="tag-container">
                        <span class="tag">${project.category}</span>
                        <span class="price-tag">${project.price}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p>${project.compatibility}</p>
                    <p>${project.releaseDate}</p>
                    <div class="project-stats">
                        <div class="stat"><span class="stat-icon">⭐</span> ${project.favorites} Favorites</div>
                        <div class="stat"><span class="stat-icon">🔄</span> ${project.version}</div>
                    </div>
                    <br>
                    <a href="${project.url}" target="_blank" class="project-link hover-sound">
                        ${project.atc}
                    </a>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
        // Re-apply animations to the newly created project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Add staggered animation when cards come into view
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100 * Array.from(projectCards).indexOf(card));
                        cardObserver.unobserve(card);
                    }
                });
            }, { threshold: 0.1 });
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cardObserver.observe(card);
            // Level up animation on hover
            card.addEventListener('mouseenter', () => {
                card.classList.add('level-up');
                setTimeout(() => {
                    card.classList.remove('level-up');
                }, 500);
            });
        });
    }
    // Load projects when page loads
    loadProjects();
});