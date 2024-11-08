function populateOnlineSites(onlineSites) {
    // Sort online sites initially by name in alphabetical order
    onlineSites.sort((a, b) => a.name.localeCompare(b.name));
    const onlineSitesContainer = document.getElementById('sites');
    onlineSitesContainer.innerHTML = '';

    // Styling for container
    Object.assign(onlineSitesContainer.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    });

    // Search bar setup
    const searchBar = document.createElement('input');
    Object.assign(searchBar.style, {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        border: '2px solid #ccc',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '16px',
    });
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for a site...';
    searchBar.id = 'searchBar';

    // Add and Remove Site buttons
    const buttonContainer = document.createElement('div');
    Object.assign(buttonContainer.style, {
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        justifyContent: 'center',
        width: '100%',
    });

    const addButton = document.createElement('button');
    const removeButton = document.createElement('button');
    [addButton, removeButton].forEach(btn => {
        Object.assign(btn.style, {
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            transition: 'transform 0.2s ease-in-out',
        });
        btn.onmouseover = () => (btn.style.transform = 'scale(1.1)');
        btn.onmouseout = () => (btn.style.transform = 'scale(1)');
    });

    addButton.textContent = 'Add Site';
    addButton.style.backgroundColor = '#4CAF50';
    addButton.onclick = () => showAddSitePopup();

    removeButton.textContent = 'Remove Site';
    removeButton.style.backgroundColor = '#f44336';
    removeButton.onclick = () => toggleRemoveMode();

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(removeButton);

    // Content area for sites
    const onlineSitesContent = document.createElement('div');
    onlineSitesContent.id = 'onlineSitesContent';
    Object.assign(onlineSitesContent.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    });

    onlineSitesContainer.appendChild(searchBar);
    onlineSitesContainer.appendChild(buttonContainer);
    onlineSitesContainer.appendChild(onlineSitesContent);

    let isRemoveMode = false;
    let hiddenSites = [];

    const renderSites = (filteredSites) => {
        filteredSites.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical order
        onlineSitesContent.innerHTML = '';
        filteredSites.forEach(site => {
            const siteItem = document.createElement('div');
            Object.assign(siteItem.style, {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '150px',
                textAlign: 'center',
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ddd',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxSizing: 'border-box',
                justifyContent: 'center',
                position: 'relative',
            });

            siteItem.onmouseover = () => {
                siteItem.style.transform = 'scale(1.05)';
                siteItem.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            };
            siteItem.onmouseout = () => {
                siteItem.style.transform = 'scale(1)';
                siteItem.style.boxShadow = 'none';
            };

            if (isRemoveMode) {
                const removeIcon = document.createElement('span');
                removeIcon.textContent = '✕';
                Object.assign(removeIcon.style, {
                    position: 'absolute',
                    color: '#e74c3c',
                    top: '5px',
                    right: '5px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                });
                removeIcon.onclick = (e) => {
                    e.stopPropagation();
                    hiddenSites.push(site);
                    onlineSites = onlineSites.filter(s => s !== site);
                    localStorage.setItem('sitestate', JSON.stringify(onlineSites));
                    toggleRemoveMode();
                    renderSites(onlineSites);
                };
                siteItem.appendChild(removeIcon);
            } else {
                siteItem.onclick = () => window.open(site.url, '_blank');
            }

            const img = document.createElement('img');
            img.src = site.icon;
            img.alt = site.name;
            Object.assign(img.style, {
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '10px',
            });

            const name = document.createElement('p');
            name.textContent = site.name;
            Object.assign(name.style, {
                margin: '0',
                fontSize: '14px',
                fontWeight: 'bold',
            });

            siteItem.appendChild(img);
            siteItem.appendChild(name);
            onlineSitesContent.appendChild(siteItem);
        });
    };

    renderSites(onlineSites);

    searchBar.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredSites = onlineSites.filter(site => site.name.toLowerCase().includes(searchQuery));
        renderSites(filteredSites);
    });

    function toggleRemoveMode() {
        isRemoveMode = !isRemoveMode;
        renderSites(onlineSites);
    }

    function showAddSitePopup() {
        const popup = document.createElement('div');
        Object.assign(popup.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            width: '300px',
            textAlign: 'center',
        });

        const title = document.createElement('h3');
        title.textContent = 'Add Site';
        title.style.marginBottom = '15px';
        popup.appendChild(title);

        const siteList = document.createElement('div');
        siteList.style.maxHeight = '300px';
        siteList.style.overflowY = 'auto';
        hiddenSites.forEach(site => {
            const siteCheckbox = document.createElement('input');
            siteCheckbox.type = 'checkbox';
            siteCheckbox.value = site.name;

            const siteLabel = document.createElement('label');
            siteLabel.textContent = site.name;
            siteLabel.style.marginLeft = '8px';
            siteLabel.style.cursor = 'pointer';
            siteLabel.onclick = () => (siteCheckbox.checked = !siteCheckbox.checked);

            const siteContainer = document.createElement('div');
            siteContainer.style.display = 'flex';
            siteContainer.style.alignItems = 'center';
            siteContainer.style.marginBottom = '10px';
            siteContainer.appendChild(siteCheckbox);
            siteContainer.appendChild(siteLabel);
            siteList.appendChild(siteContainer);
        });
        popup.appendChild(siteList);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.justifyContent = 'center';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.style.backgroundColor = '#4CAF50';
        addButton.style.color = '#fff';
        addButton.style.border = 'none';
        addButton.style.padding = '8px 12px';
        addButton.style.borderRadius = '4px';
        addButton.style.cursor = 'pointer';

        addButton.onclick = () => {
            const selectedSites = Array.from(siteList.querySelectorAll('input:checked')).map(input => input.value);
            hiddenSites = hiddenSites.filter(site => {
                if (selectedSites.includes(site.name)) {
                    onlineSites.push(site);
                    return false;
                }
                return true;
            });
            onlineSites.sort((a, b) => a.name.localeCompare(b.name)); // Re-sort after addition
            localStorage.setItem('sitestate', JSON.stringify(onlineSites));
            renderSites(onlineSites);
            document.body.removeChild(popup);
        };

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.backgroundColor = '#e74c3c';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.padding = '8px 12px';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => document.body.removeChild(popup);

        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(closeButton);
        popup.appendChild(buttonContainer);
        document.body.appendChild(popup);
    }
}
