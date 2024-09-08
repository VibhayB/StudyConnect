function createTabs(abcData) {
    var tabsData = [
        {
            name: "Previous Papers",
            contentFunction: () => createCards(abcData[0].data)
        },
        {
            name: "Datesheets",
            contentFunction: () => createCards(abcData[1].data)
        },
        {
            name: "Results",
            contentFunction: () => createCards(abcData[2].data)
        },
        { name: "Question Banks", contentFunction: () => "No question banks yet" }
    ];
    tabsData.unshift({name: "Primary", contentFunction: () => "No Exams there<br><br>Note: The study videos here may miss or cover an extra topic, so it is advised to have a look over the syllabus and notes as well." });
    // Helper function to create card HTML
    function createCards(cards) {
    return cards.map(card => `
        <a href="${card.link}" target="_blank" style="
            display: block; 
            text-decoration: none; 
            color: inherit; 
            border: 1px solid #ddd; 
            border-radius: 4px; 
            padding: 10px; 
            margin: 5px; 
            background-color: #f9f9f9; 
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
            transition: background-color 0.3s, box-shadow 0.3s;">
            <div class="card" style="
                border: none; 
                border-radius: 4px; 
                padding: 10px; 
                background-color: inherit; 
                cursor: pointer;">
                ${card.text}
            </div>
        </a>
    `).join('');
    }
    const examsContainer = document.getElementById('exams');
    examsContainer.innerHTML = "";

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.id = 'tabs';
    tabsContainer.style.display = 'flex';
    tabsContainer.style.borderBottom = '2px solid #ddd';
    tabsContainer.style.backgroundColor = '#f9f9f9';
    tabsContainer.style.borderRadius = '8px 8px 0 0';
    tabsContainer.style.overflow = 'hidden';
    tabsContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.id = 'tab-contents';
    contentContainer.style.padding = '20px';

    tabsData.forEach((tab, index) => {
        // Create tab element
        const tabElement = document.createElement('div');
        tabElement.className = 'tab';
        tabElement.textContent = tab.name;
        tabElement.dataset.contentId = `content-${index}`;
        tabElement.style.cursor = 'pointer';
        tabElement.style.padding = '10px 20px';
        tabElement.style.marginRight = '5px';
        tabElement.style.borderBottom = '2px solid transparent';
        tabElement.style.transition = 'border-bottom 0.3s, background-color 0.3s';
        tabElement.style.borderRadius = '4px';
        tabElement.style.backgroundColor = '#e0e0e0';

        // Add hover effect
        tabElement.onmouseover = () => {
            tabElement.style.backgroundColor = '#d0d0d0';
            tabElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        };
        tabElement.onmouseout = () => {
            tabElement.style.backgroundColor = '#e0e0e0';
            tabElement.style.boxShadow = 'none';
        };

        // Create content element
        const contentElement = document.createElement('div');
        contentElement.id = `content-${index}`;
        contentElement.className = 'tab-content';
        contentElement.style.display = 'none'; // Hide all content initially

        // Append content to content container
        contentContainer.appendChild(contentElement);

        // Append tab to tabs container
        tabsContainer.appendChild(tabElement);
    });

    // Append both containers to exams container
    examsContainer.appendChild(tabsContainer);
    examsContainer.appendChild(contentContainer);

    // Function to update content based on the tab clicked
    function updateContent(contentId, contentFunction) {
        const contentElement = document.getElementById(contentId);
        contentElement.innerHTML = contentFunction();
        contentElement.style.display = 'block'; // Show content
    }

    // Set the first tab as active
    const firstTab = tabsContainer.querySelector('.tab');
    const firstContent = contentContainer.querySelector('.tab-content');
    firstTab.style.borderBottom = '2px solid #007bff'; // Highlight the first tab
    firstTab.style.backgroundColor = '#fff'; // Background color of the active tab
    firstTab.style.color = '#007bff'; // Text color of the active tab
    updateContent(firstContent.id, tabsData[0].contentFunction); // Initialize first content

    // Add event listeners
    tabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab')) {
            const contentId = event.target.dataset.contentId;
            const index = Array.from(tabsContainer.children).indexOf(event.target);
            const contentFunction = tabsData[index].contentFunction;

            // Deactivate all tabs and hide all content
            tabsContainer.querySelectorAll('.tab').forEach(tab => {
                tab.style.borderBottom = '2px solid transparent';
                tab.style.backgroundColor = '#e0e0e0';
                tab.style.color = '#333';
            });
            contentContainer.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });

            // Activate clicked tab and show corresponding content
            event.target.style.borderBottom = '2px solid #007bff';
            event.target.style.backgroundColor = '#fff'; // Background color of the active tab
            event.target.style.color = '#007bff'; // Text color of the active tab
            updateContent(contentId, contentFunction); // Update content
        }
    });

    examsContainer.style.display = "none";
}
