// Function to create online site items and add them to the div
function populateOnlineSites(onlineSites) {
    const onlineSitesContainer = document.getElementById('sites');

    // Apply styles using JavaScript
    onlineSitesContainer.style.display = 'none';
    onlineSitesContainer.style.flexWrap = 'wrap';
    onlineSitesContainer.style.gap = '20px';
    onlineSitesContainer.style.padding = '20px';
    onlineSitesContainer.style.maxWidth = '100%';
    onlineSitesContainer.style.boxSizing = 'border-box';
    onlineSitesContainer.style.backgroundColor = '#f9f9f9';
    onlineSitesContainer.style.borderRadius = '8px';
    onlineSitesContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    // Clear existing content
    onlineSitesContainer.innerHTML = '';

    // Create and append new online site items
    onlineSites.forEach(site => {
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

        onlineSitesContainer.appendChild(siteItem);
    });
}
