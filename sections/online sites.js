// Function to create online site items and add them to the div
function populateOnlineSites(onlineSites) {
    const onlineSitesContainer = document.getElementById('sites');

    // Clear existing content
    onlineSitesContainer.innerHTML = '';

    // Apply styles using JavaScript
    onlineSitesContainer.style.flexWrap = 'wrap';
    onlineSitesContainer.style.gap = '20px';
    onlineSitesContainer.style.padding = '20px';
    onlineSitesContainer.style.maxWidth = '100%';
    onlineSitesContainer.style.boxSizing = 'border-box';
    onlineSitesContainer.style.backgroundColor = '#f9f9f9';
    onlineSitesContainer.style.borderRadius = '8px';
    onlineSitesContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    onlineSitesContainer.style.justifyContent = 'center';
    onlineSitesContainer.style.alignItems = 'center';

    // Create a search bar element
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for a site...';
    searchBar.style.width = '100%';
    searchBar.style.padding = '10px';
    searchBar.style.marginBottom = '20px';
    searchBar.style.border = '1px solid #ccc';
    searchBar.style.borderRadius = '4px';
    searchBar.style.boxSizing = 'border-box';

    searchBar.id = 'searchBar';

    // Create a new division for content
    const onlineSitesContent = document.createElement('div');
    onlineSitesContent.id = 'onlineSitesContent';
    onlineSitesContent.style.display = 'flex';
    onlineSitesContent.style.flexWrap = 'wrap';
    onlineSitesContent.style.gap = '20px';
    onlineSitesContent.style.justifyContent = 'center';
    onlineSitesContent.style.alignItems = 'center';

    // Append the search bar and the new division to the container
    onlineSitesContainer.appendChild(searchBar);
    onlineSitesContainer.appendChild(onlineSitesContent);

    // Function to render sites based on search
    const renderSites = (filteredSites) => {
        onlineSitesContent.innerHTML = ''; // Clear content division for new rendering

        // Create and append new online site items
        filteredSites.forEach(site => {
            const siteItem = document.createElement('div');
            siteItem.style.display = 'flex';
            siteItem.style.flexDirection = 'column';
            siteItem.style.alignItems = 'center';
            siteItem.style.width = '150px';
            siteItem.style.textAlign = 'center';
            siteItem.style.background = '#ffffff';
            siteItem.style.borderRadius = '8px';
            siteItem.style.overflow = 'hidden';
            siteItem.style.border = '1px solid #ddd';
            siteItem.style.cursor = 'pointer';
            siteItem.style.transition = 'transform 0.3s, box-shadow 0.3s';
            siteItem.style.boxSizing = 'border-box';
            siteItem.style.justifyContent = 'center';

            siteItem.onmouseover = () => {
                siteItem.style.transform = 'scale(1.05)';
                siteItem.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            };
            siteItem.onmouseout = () => {
                siteItem.style.transform = 'scale(1)';
                siteItem.style.boxShadow = 'none';
            };

            siteItem.onclick = () => {
                window.open(site.url, '_blank');
            };

            const img = document.createElement('img');
            img.src = site.icon;
            img.alt = site.name;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            img.style.boxSizing = 'border-box';
            img.style.marginBottom = '10px';

            const name = document.createElement('p');
            name.textContent = site.name;
            name.style.margin = '0';
            name.style.fontSize = '14px';
            name.style.fontWeight = 'bold';

            siteItem.appendChild(img);
            siteItem.appendChild(name);

            onlineSitesContent.appendChild(siteItem);
        });
    };

    // Initial render of all sites
    renderSites(onlineSites);

    // Event listener for search functionality
    searchBar.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredSites = onlineSites.filter(site => 
            site.name.toLowerCase().includes(searchQuery)
        );
        renderSites(filteredSites);
    });
}
