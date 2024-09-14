// Function to create and populate the feed
function showFilterModal(posts) {
    // Create modal background
    const modalBackground = document.createElement('div');
    modalBackground.style.position = 'fixed';
    modalBackground.style.top = '0';
    modalBackground.style.left = '0';
    modalBackground.style.width = '100%';
    modalBackground.style.height = '100%';
    modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalBackground.style.display = 'flex';
    modalBackground.style.justifyContent = 'center';
    modalBackground.style.alignItems = 'center';
    modalBackground.style.zIndex = '1000';

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.style.width = '90%';
    modalContainer.style.maxWidth = '400px';
    modalContainer.style.backgroundColor = '#fff';
    modalContainer.style.padding = '20px';
    modalContainer.style.borderRadius = '8px';
    modalContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    modalContainer.style.position = 'relative';
    modalContainer.style.boxSizing = 'border-box';

    // Create close button
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;'; // Close icon
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#aaa';
    closeButton.style.transition = 'color 0.3s';

    // Change color on hover
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.color = '#000';
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.color = '#aaa';
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalBackground);
    });

    // Create search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for tags...';
    searchBar.style.width = 'calc(100% - 20px)';
    searchBar.style.padding = '10px';
    searchBar.style.marginBottom = '15px';
    searchBar.style.border = '1px solid #ddd';
    searchBar.style.borderRadius = '5px';
    searchBar.style.boxSizing = 'border-box';
    modalContainer.appendChild(searchBar);

    // Create tag list container
    const tagListContainer = document.createElement('div');
    tagListContainer.style.maxHeight = '200px';
    tagListContainer.style.overflowY = 'auto';
    tagListContainer.style.marginBottom = '15px';
    modalContainer.appendChild(tagListContainer);

    // Get all unique tags from posts
    const uniqueTags = [...new Set(posts.flatMap(post => post.tags))];

    // Create tag list
    const tagCheckboxes = {};
    uniqueTags.forEach(tag => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginBottom = '10px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        label.appendChild(checkbox);

        label.appendChild(document.createTextNode(` ${tag}`));

        tagListContainer.appendChild(label);
        tagCheckboxes[tag] = checkbox;
    });

    // Filter tags as user types in search bar
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        uniqueTags.forEach(tag => {
            const label = tagCheckboxes[tag].parentElement;
            if (tag.toLowerCase().includes(searchTerm)) {
                label.style.display = 'block';
            } else {
                label.style.display = 'none';
            }
        });
    });

    // Create apply button
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply Filter';
    applyButton.style.padding = '10px 15px';
    applyButton.style.border = 'none';
    applyButton.style.borderRadius = '5px';
    applyButton.style.backgroundColor = '#1a73e8';
    applyButton.style.color = '#fff';
    applyButton.style.cursor = 'pointer';
    applyButton.style.fontSize = '16px';
    applyButton.style.width = '100%'; // Make button full width
    modalContainer.appendChild(applyButton);

    // Close modal and apply filter
    applyButton.addEventListener('click', () => {
        const selectedTags = Object.keys(tagCheckboxes)
            .filter(tag => tagCheckboxes[tag].checked);

        // Apply the filter to the feed
        filterPostsByTags(selectedTags);

        // Close the modal
        document.body.removeChild(modalBackground);
    });

    // Add close button and modal container to background and display modal
    modalContainer.appendChild(closeButton);
    modalBackground.appendChild(modalContainer);
    document.body.appendChild(modalBackground);
}


// Function to filter posts based on selected tags
function filterPostsByTags(selectedTags) {
    const feedContainer = document.getElementById('feed');
    const postElements = feedContainer.querySelectorAll('div[data-tags]');

    postElements.forEach(postElement => {
        const postTags = postElement.dataset.tags.split(',');
        const hasAllTags = selectedTags.every(tag => postTags.includes(tag));

        if (selectedTags.length === 0 || hasAllTags) {
            postElement.style.display = 'block'; // Show post
        } else {
            postElement.style.display = 'none'; // Hide post
        }
    });
}

function populateFeed(posts) {// Function to create the announcement popup
    posts.sort((a, b) => {
        console.log('Comparing:', a.time, b.time);
        
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
    
        console.log('Parsed Dates:', dateA, dateB);
        
        // Ensure both dates are valid before comparing
        if (isNaN(dateA) || isNaN(dateB)) {
            console.error('Invalid date encountered:', a.time, b.time);
            return 0;
        }
    
        return dateB - dateA;
    });
    
    function createAnnouncementPopup() {
        // Filter posts where banner is true
        const bannerPosts = posts.filter(post => post.banner);
    
        // If no banner posts are available, don't show the popup
        if (bannerPosts.length === 0) {
            return;
        }
    
        // Select a random post from the filtered banner posts
        const randomPost = bannerPosts[Math.floor(Math.random() * bannerPosts.length)];
    
        // Create the popup container
        const popup = document.createElement("div");
        popup.id = "initialbanner";
        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        popup.style.display = "none";
        popup.style.justifyContent = "center";
        popup.style.alignItems = "center";
        popup.style.zIndex = "1004";
    
        // Create the image element
        const image = document.createElement("img");
        image.src = randomPost.image;
        image.style.maxWidth = "80%";
        image.style.maxHeight = "80%";
        image.style.borderRadius = "10px";
        popup.appendChild(image);
    
        // Create the cross button to close the popup
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.style.position = "absolute";
        closeButton.style.top = "20px";
        closeButton.style.right = "20px";
        closeButton.style.fontSize = "24px";
        closeButton.style.color = "white";
        closeButton.style.backgroundColor = "transparent";
        closeButton.style.border = "none";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = function() {
            document.body.removeChild(popup);
        };
        popup.appendChild(closeButton);
    
        // Create the "View Post" button
        const viewPostButton = document.createElement("button");
        viewPostButton.textContent = "View Post";
        viewPostButton.style.position = "absolute";
        viewPostButton.style.bottom = "20px";
        viewPostButton.style.left = "50%";
        viewPostButton.style.transform = "translateX(-50%)";
        viewPostButton.style.padding = "10px 20px";
        viewPostButton.style.fontSize = "16px";
        viewPostButton.style.color = "white";
        viewPostButton.style.backgroundColor = "dodgerblue";
        viewPostButton.style.border = "none";
        viewPostButton.style.borderRadius = "5px";
        viewPostButton.style.cursor = "pointer";
        viewPostButton.onclick = function() {
            // Perform the desired action here
            showTab(event,"feed");
            document.body.removeChild(popup);
        };
        popup.appendChild(viewPostButton);
    
        // Add the popup to the body
        document.body.appendChild(popup);
    } 
    // Call the function to create the popup
    createAnnouncementPopup();
    const feedContainer = document.getElementById('feed');
    // Apply styles to the feed container
    feedContainer.style.display = 'none'; // Change to flex to show content
    feedContainer.style.flexDirection = 'column';
    feedContainer.style.alignItems = 'center'; // Center posts horizontally
    feedContainer.style.gap = '20px';
    feedContainer.style.padding = '20px';
    feedContainer.style.maxWidth = '100%';
    feedContainer.style.boxSizing = 'border-box';
    feedContainer.style.backgroundColor = '#f9f9f9';
    feedContainer.style.borderRadius = '8px';
    feedContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    // Clear existing content
    feedContainer.innerHTML = '';

    // Create a container for the filter button
    const filterContainer = document.createElement('div');
    filterContainer.style.marginBottom = '20px';
    filterContainer.style.display = 'flex';
    filterContainer.style.marginBottom = '20px';
    filterContainer.style.width = '100%';
    filterContainer.style.justifyContent = 'center';
    filterContainer.style.gap = '10px';

    // Create and style the search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for posts...';
    searchBar.style.padding = '10px';
    searchBar.style.border = '1px solid #ddd';
    searchBar.style.borderRadius = '5px';
    searchBar.style.flex = '1';
    searchBar.style.boxSizing = 'border-box';

    const searchButton = document.createElement('button');
    searchButton.style.padding = '10px 15px';
    searchButton.style.border = 'none';
    searchButton.style.borderRadius = '5px';
    searchButton.style.backgroundColor = '#1a73e8';
    searchButton.style.color = '#fff';
    searchButton.style.cursor = 'pointer';
    searchButton.style.fontSize = '16px';
    searchButton.style.display = 'flex';
    searchButton.style.alignItems = 'center';
    searchButton.style.justifyContent = 'center';
    searchButton.innerHTML = `<i class="fa fa-search" aria-hidden="true" style="font-size: 16px;"></i>`;
    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.text.toLowerCase().includes(searchTerm) ||
            post.sender.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);
    });

    // Create and style the filter button
    const filterButton = document.createElement('button');
    filterButton.textContent = 'Filter by Tag';
    filterButton.style.padding = '10px 15px';
    filterButton.style.border = 'none';
    filterButton.style.borderRadius = '5px';
    filterButton.style.backgroundColor = '#1a73e8';
    filterButton.style.color = '#fff';
    filterButton.style.cursor = 'pointer';
    filterButton.style.fontSize = '16px';
    filterButton.addEventListener('click', () => {
        showFilterModal(posts);
    });// Append the search bar and filter button to the container
    filterContainer.appendChild(searchBar);
    filterContainer.appendChild(searchButton);
    filterContainer.appendChild(filterButton);

    // Append the filter container to the feed
    feedContainer.appendChild(filterContainer);
    
    // Create a map to track dates
    const postsByDate = posts.reduce((acc, post) => {
        const date = new Date(post.time).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(post);
        return acc;
    }, {});
    // Create and add the note section
    const noteSection = document.createElement('div');
    noteSection.textContent = 'Note: All of these announcements are forwarded from various sources to here like WhatsApp, Mail, ERP i.e. they are not officially or originally made here, neither of these announcements are added here by any officials.';
    noteSection.style.padding = '10px';
    noteSection.style.marginBottom = '20px';
    noteSection.style.backgroundColor = '#fffbe6';
    noteSection.style.color = '#333';
    noteSection.style.border = '1px solid #f0e6a3';
    noteSection.style.borderRadius = '5px';
    noteSection.style.textAlign = 'center';
    noteSection.style.fontSize = '14px';

    feedContainer.appendChild(noteSection);
    // Function to create post element
    // Function to create post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.style.display = 'flex';
    postElement.style.flexDirection = 'column';
    postElement.style.backgroundColor = '#ffffff';
    postElement.style.borderRadius = '8px';
    postElement.style.border = '1px solid #ddd';
    postElement.style.padding = '15px';
    postElement.style.marginBottom = '20px';
    postElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    postElement.style.width = '300px'; // Portrait orientation
    postElement.style.maxWidth = '100%'; // Responsive design
    postElement.style.boxSizing = 'border-box';
    postElement.style.position = 'relative';
    postElement.style.textAlign = 'center'; // Center text and images
    postElement.style.margin = '0 auto'; // Center post element
    // Add tags as data attribute for filtering
    postElement.setAttribute('data-tags', post.tags.join(','));

    // Header with sender name and time
    const header = document.createElement('div');
    header.style.marginBottom = '10px';
    header.style.textAlign = 'left'; // Align sender name to the left

    const senderName = document.createElement('div');
    senderName.innerHTML = `<strong>${post.sender}</strong>`;
    senderName.style.fontSize = '14px';
    senderName.style.color = '#333';

    const postTime = document.createElement('div');
    postTime.textContent = new Date(post.time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    postTime.style.fontSize = '12px';
    postTime.style.color = '#777';

    header.appendChild(senderName);
    header.appendChild(postTime);

    // Post image
    let img;
    if (post.image) {
        img = document.createElement('img');
        img.src = post.image;
        img.alt = post.title;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        img.style.marginBottom = '10px';
    }

    // Post title
    let title;
    if (post.title) {
        title = document.createElement('div');
        title.textContent = post.title;
        title.style.fontSize = '16px';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.color = '#333';
    }

    // Post text
    const textContainer = document.createElement('div');
    textContainer.style.position = 'relative';
    textContainer.style.textAlign = 'left'; // Align text to the left

    const text = document.createElement('div');
    text.style.fontSize = '14px';
    text.style.position = 'relative';

    const MAX_LENGTH = 150; // Max length of text before showing "Read more"
    const originalText = post.text;
    
    function updateTextDisplay() {
        function makeLinksClickable(text) {
    // Step 1: Escape HTML characters to avoid conflicts
    text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Step 2: Replace line breaks with <br> tags
    text = text.replace(/\\n/g, '<br>');

    // Step 3: Replace URLs with a unique placeholder to avoid overlap
    const urlPlaceholder = 'URL_PLACEHOLDER_';
    let urlCount = 0;
    text = text.replace(/(https?:\/\/[^\s]+)/g, (match) => {
        const placeholder = urlPlaceholder + urlCount++;
        return `<a href="${match}" target="_blank" data-placeholder="${placeholder}">${match}</a>`;
    });

    // Step 4: Replace phone numbers with clickable tel links
    text = text.replace(/(\+?\d{1,4}?[\s.-]?\(?\d{1,3}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9})/g, '<a href="tel:$1">$1</a>');

    // Step 5: Restore URLs from placeholders
    text = text.replace(new RegExp(urlPlaceholder + '(\\d+)', 'g'), (match, p1) => {
        const url = text.match(new RegExp(`<a [^>]*data-placeholder="${urlPlaceholder}${p1}"[^>]*>(https?:\/\/[^\s]+)</a>`))[1];
        return `<a href="${url}" target="_blank">${url}</a>`;
    });

    return text;
}

    
        if (originalText.length > MAX_LENGTH) {
            text.innerHTML = makeLinksClickable(originalText.slice(0, MAX_LENGTH)) + '... <a href="#" class="read-more">Read more</a>';
            const readMoreLink = text.querySelector('.read-more');
            readMoreLink.style.color = 'black'; // Change color to black
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                text.innerHTML = makeLinksClickable(originalText) + ' <a href="#" class="read-less">Read less</a>';
                const readLessLink = text.querySelector('.read-less');
                readLessLink.style.color = 'black'; // Set "Read less" link color to black
                readLessLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Revert to truncated text
                    updateTextDisplay();
                });
            });
        } else {
            text.innerHTML = makeLinksClickable(originalText);
        }
    }

    updateTextDisplay();

    textContainer.appendChild(text);
    function updateDeadlineDisplay(deadlineElement, deadlineDate) {
        const now = new Date();
        const timeLeft = deadlineDate - now;
    
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
        let color;
        let displayText;
    
        if (timeLeft < 0) {
            // If deadline has passed
            const passedDays = Math.abs(days);
            displayText = `Due since ${passedDays} days`;
            color = '#f00'; // Red
        } else if (days < 1) {
            // Less than a day left
            color = '#f80'; // Orange
            displayText = `Deadline in ${hours} hours, ${minutes} minutes`;
        } else if (days < 7) {
            // Less than a week left
            color = '#0f0'; // Green
            displayText = `Deadline in ${days} days, ${hours} hours, ${minutes} minutes`;
        } else {
            // More than a week left
            color = '#00f'; // Blue
            displayText = `Deadline in ${days} days, ${hours} hours, ${minutes} minutes`;
        }
    
        deadlineElement.textContent = displayText;
        deadlineElement.style.color = color;
    }
    
    if (post.deadline) {
        const deadlineElement = document.createElement('div');
        const deadlineDate = new Date(post.deadline);
        
        updateDeadlineDisplay(deadlineElement, deadlineDate);
        // Update the display every minute
        setInterval(() => {
            updateDeadlineDisplay(deadlineElement, deadlineDate);
        }, 1000); // Update every 60 seconds
        
        deadlineElement.style.fontSize = '12px';
        deadlineElement.style.marginTop = '10px';
        textContainer.appendChild(deadlineElement); // Move below text
    }

    // Tags
    if (post.tags) {
        const tagsContainer = document.createElement('div');
        tagsContainer.style.marginTop = '10px';

        const viewTagsButton = document.createElement('button');
        viewTagsButton.textContent = 'View Tags';
        viewTagsButton.style.padding = '5px 10px';
        viewTagsButton.style.border = 'none';
        viewTagsButton.style.borderRadius = '5px';
        viewTagsButton.style.backgroundColor = '#1a73e8';
        viewTagsButton.style.color = '#fff';
        viewTagsButton.style.cursor = 'pointer';
        viewTagsButton.style.fontSize = '12px';
        viewTagsButton.addEventListener('click', () => {
            showAlert(`Tags: <br>${post.tags.join(', ')}`,"https://cdn.iconscout.com/icon/free/png-256/free-hang-tags-icon-download-in-svg-png-gif-file-formats--printing-label-pricing-tag-print-space-services-pack-icons-1556248.png");
        });

        tagsContainer.appendChild(viewTagsButton);
        textContainer.appendChild(tagsContainer); // Move below text
    }

    // Append elements to post
    postElement.appendChild(header);
    if (img) postElement.appendChild(img);
    if (title) postElement.appendChild(title); // Add title here
    postElement.appendChild(textContainer);
    
    return postElement;
}

    // Append posts to the feed
    Object.keys(postsByDate).forEach(date => {
        const dateContainer = document.createElement('div');
        dateContainer.style.width = '100%';
        dateContainer.style.textAlign = 'center'; // Center the date
        dateContainer.style.marginBottom = '20px';

        const dateTitle = document.createElement('h3');
        dateTitle.textContent = date;
        dateTitle.style.marginBottom = '15px';
        dateContainer.appendChild(dateTitle);

        postsByDate[date].forEach(post => {
            dateContainer.appendChild(createPostElement(post));
        });

        feedContainer.appendChild(dateContainer);
    });
    function displayPosts(filteredPosts) {
        feedContainer.innerHTML = ''; 
        feedContainer.appendChild(filterContainer);

        const postsByDate = filteredPosts.reduce((acc, post) => {
            const date = new Date(post.time).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            if (!acc[date]) acc[date] = [];
            acc[date].push(post);
            return acc;
        }, {});

        Object.entries(postsByDate).forEach(([date, posts]) => {
            const dateHeading = document.createElement('h2');
            dateHeading.textContent = date;
            dateHeading.style.fontSize = '18px';
            dateHeading.style.color = '#555';
            dateHeading.style.marginBottom = '20px';
            dateHeading.style.textAlign = 'center';

            feedContainer.appendChild(dateHeading);

            const postsContainer = document.createElement('div');
            postsContainer.style.display = 'flex';
            postsContainer.style.flexWrap = 'wrap';
            postsContainer.style.justifyContent = 'center';
            postsContainer.style.gap = '20px';
            
            posts.forEach(post => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            });

            feedContainer.appendChild(postsContainer);
        });

        feedContainer.style.display = 'flex'; 
    }

    displayPosts(posts); 
}
