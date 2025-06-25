document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Project filtering and searching logic
    const controls = document.getElementById('project-controls');
    if (controls) {
        const filterBtns = controls.querySelectorAll('.filter-btn');
        const searchInput = controls.querySelector('#search-input');
        const projectGrid = document.getElementById('project-grid');
        const projects = projectGrid.querySelectorAll('.project-card');

        let currentFilter = 'all';
        let currentSearch = '';

        const filterAndSearch = () => {
            projects.forEach(project => {
                const tags = project.dataset.tags || '';
                const title = project.querySelector('h3').textContent.toLowerCase();
                const description = project.querySelector('p').textContent.toLowerCase();

                const filterMatch = currentFilter === 'all' || tags.includes(currentFilter);
                const searchMatch = title.includes(currentSearch) || description.includes(currentSearch);

                if (filterMatch && searchMatch) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                filterAndSearch();
            });
        });

        searchInput.addEventListener('input', () => {
            currentSearch = searchInput.value.toLowerCase();
            filterAndSearch();
        });
    }
}); 