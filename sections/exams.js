function createTabs(abcData) {
    
    var tabsData = [
        {
            name: "Primary",
            contentFunction: () => createSpecialSection(abcData[4].data)
        },
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
        { 
            name: "Question Banks", 
            contentFunction: () => "No question banks yet" 
        }
    ];
    function createSpecialSection(specialData) {
    if (!specialData) return "No Exams there<br><br>Note: The study videos here may miss or cover an extra topic, so it is advised to have a look over the syllabus and notes as well.";
    
    let content = 'Note: The study videos here may miss or cover an extra topic, so it is advised to have a look over the syllabus and notes as well.<br><br>';
    
    // Add Timer Section
    if (specialData.timer && specialData.timer.length > 0) {
        content += `
            <div id="timers-container">
                ${specialData.timer.map(timer => `
                    <div id="timer-${timer.name}" class="timer">
                        <div class="exam-title">${timer.name}</div>
                        <div id="countdown-${timer.name}" class="countdown"></div>
                    </div>
                `).join('')}
            </div>
            <style>
                #timers-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    margin: 0 auto;
                }
                .timer {
                    font-size: 20px;
                    font-weight: bold;
                    padding: 15px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    width: 250px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 150px;
                }
                .exam-title {
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: #444;
                }
                .countdown {
                    font-size: 18px;
                    font-weight: normal;
                    margin-top: 10px;
                }
                .ongoing {
                    color: #00FF00;
                    font-weight: bold;
                }
                .not-started {
                    color: #CCCCCC;
                    font-weight: bold;
                }
                .time-up {
                    color: #FF0000;
                    font-weight: bold;
                }
            </style>
        `;
    }
    
    // Add Main Images Section
    if (specialData.mainimages && specialData.mainimages.length > 0) {
        content += '<div class="main-images">';
        specialData.mainimages.forEach(imageGroup => {
            Object.entries(imageGroup).forEach(([imageName, imageUrl]) => {
                content += `
                    <br>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="font-size: 38px; font-weight: bold;">${imageName}</h1>
                        <img src="${imageUrl}" alt="${imageName}" style="max-width: 100%; height: auto;"/>
                    </div>`;
            });
        });
        content += '</div>';
    }
    
 // Add Subjects and Study Material
 if (specialData.subjects && specialData.subjects.length > 0) {
    specialData.subjects.forEach(subjectGroup => {
        Object.entries(subjectGroup).forEach(([subjectName, subjectData]) => {
            content += `
                <br>
                <h1 style="font-size: 38px; font-weight: bold; margin-top: 20px;">${subjectName}</h1>
                <h2 style="font-size: 22px; font-weight: bold;">Syllabus:</h2>
                <p>${subjectData.syllabus || 'No syllabus available'}</p>
                <h2 style="font-size: 22px; font-weight: bold;">Study Material:</h2>
                <iframe src="https://drive.google.com/embeddedfolderview?id=${subjectData.studyMaterial}#grid" 
                    width="640" 
                    height="480" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
                <h2 style="font-size: 22px; font-weight: bold;">Videos:</h2>`;
                

            if (subjectData.videos && Object.keys(subjectData.videos).length > 0) {
                content += '<div class="videos">';
                Object.entries(subjectData.videos).forEach(([videoName, videoUrl]) => {
                    content += `
                        <div style="margin-bottom: 20px; text-align: center;">
                        <p style="font-size: 18px;">${videoName}</p>
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;">
                            <iframe 
                                src="${videoUrl}" 
                                title="${videoName}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            ></iframe>
                        </div>
                        </div>
                        `;
                });
                content += '</div>';
            } else {
                content += '<p>No videos available</p>';
            }
        });
    });
}

return content;
}

    
    // Helper function to create card HTML
    function createCards(cards) {
        if (!cards) return "No data available";

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
    tabsContainer.style.flexWrap = 'wrap'; // Allow tabs to wrap on smaller screens
    tabsContainer.style.borderBottom = '2px solid #ddd';
    tabsContainer.style.backgroundColor = '#f9f9f9';
    tabsContainer.style.borderRadius = '8px 8px 0 0';
    tabsContainer.style.overflow = 'hidden';
    tabsContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.id = 'tab-contents';
    contentContainer.style.padding = '20px';
    contentContainer.style.overflowY = 'auto'; // Allow vertical scrolling if needed

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
        tabElement.style.flex = '1'; // Allow tabs to stretch and fit available space

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
            // Update Countdown Timers
            // Update Countdown Timers
const timersContainer = document.getElementById('timers-container');

if (timersContainer) {
    abcData[4].data.timer.forEach(timer => {
        const countdownElement = document.getElementById(`countdown-${timer.name}`);
        if (countdownElement) {
            const startTime = new Date(timer.start).getTime();
            const endTime = new Date(timer.end).getTime();
            
            function updateCountdown() {
                const now = new Date().getTime();
                
                if (now < startTime) {
                    // Timer is in countdown phase
                    const distance = startTime - now;
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    let countdownText = '';
                    if (days > 0) countdownText += `${days}d `;
                    if (hours > 0 || days > 0) countdownText += `${hours}h `;
                    if (minutes > 0 || hours > 0 || days > 0) countdownText += `${minutes}m `;
                    countdownText += `${seconds}s`;

                    countdownElement.textContent = `Starts in ${countdownText.trim()}`;
                    countdownElement.style.color = getCountdownColor(days, hours, minutes, seconds);
                    countdownElement.className = 'countdown not-started';
                } else if (now >= startTime && now <= endTime) {
                    // Timer is ongoing
                    countdownElement.textContent = 'Ongoing';
                    countdownElement.className = 'countdown ongoing';
                } else {
                    // Timer has ended
                    countdownElement.textContent = '';
                    countdownElement.className = 'countdown hidden';
                }
            }
            updateCountdown();
            setInterval(updateCountdown, 1000); // Update every second
        } else {
            console.log(`Countdown element not found for ${timer.name}`); // Debug
        }
    });
} else {
    console.log('Timers container not found'); // Debug
} 
    }
// Utility function to get countdown color based on time left
function getCountdownColor(days, hours, minutes, seconds) {
    if (days >= 365) return '#8A2BE2'; // Purple for long countdowns
    if (days >= 30) return '#4B0082'; // Indigo for long countdowns
    if (days >= 7) return '#0000FF'; // Blue for weekly countdowns
    if (days >= 1) return '#008000'; // Green for daily countdowns
    if (hours >= 1) return '#CCCC00'; // Yellow for hourly countdowns
    if (minutes >= 1) return '#FFA500'; // Orange for minute countdowns
    return '#FF0000'; // Red for last seconds
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

    examsContainer.style.display = "block";

    // Add responsive styles
    const style = document.createElement('style');
    style.textContent = `
        @media only screen and (max-width: 600px) {
            .tab {
                padding: 10px;
                flex: 100%; /* Each tab takes full width on small screens */
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
}
