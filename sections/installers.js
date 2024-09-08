// Function to create installer items and add them to the div
function populateInstallers(installers) {
    const installersContainer = document.getElementById('installers');
    // Apply styles using JavaScript
    installersContainer.style.display = 'none';
    installersContainer.style.flexWrap = 'wrap';
    installersContainer.style.gap = '20px';
    installersContainer.style.padding = '20px';
    installersContainer.style.maxWidth = '100%';
    installersContainer.style.boxSizing = 'border-box';
    installersContainer.style.backgroundColor = '#f9f9f9';
    installersContainer.style.borderRadius = '8px';
    installersContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    installersContainer.style.justifyContent = 'center';
    installersContainer.style.alignItems  = 'center';

    // Clear existing content
    installersContainer.innerHTML = '';

    // Create and append new installer items
    installers.forEach(installer => {
        const installerItem = document.createElement('div');
        installerItem.style.display = 'flex';
        installerItem.style.flexDirection = 'column';
        installerItem.style.alignItems = 'center';
        installerItem.style.width = '150px';
        installerItem.style.textAlign = 'center';
        installerItem.style.background = '#ffffff';
        installerItem.style.borderRadius = '8px';
        installerItem.style.overflow = 'hidden';
        installerItem.style.border = '1px solid #ddd';
        installerItem.style.cursor = 'pointer';
        installerItem.style.transition = 'transform 0.3s, box-shadow 0.3s';
        installerItem.style.boxSizing = 'border-box';
        installerItem.style.justifyContent = 'center';
        
        installerItem.onmouseover = () => {
            installerItem.style.transform = 'scale(1.05)';
            installerItem.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        };
        installerItem.onmouseout = () => {
            installerItem.style.transform = 'scale(1)';
            installerItem.style.boxShadow = 'none';
        };

        installerItem.onclick = () => {
            window.open(installer.url, '_blank');
        };

        const img = document.createElement('img');
        img.src = installer.icon;
        img.alt = installer.name;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        img.style.boxSizing = 'border-box';
        img.style.marginBottom = '10px';

        const name = document.createElement('p');
        name.textContent = installer.name;
        name.style.margin = '0';
        name.style.fontSize = '14px';
        name.style.fontWeight = 'bold';

        installerItem.appendChild(img);
        installerItem.appendChild(name);

        installersContainer.appendChild(installerItem);
    });
}
