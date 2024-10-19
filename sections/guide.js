let player;

// This function will be called by the YouTube Iframe API when it's ready
function onYouTubeIframeAPIReady() {
    // This is where you can initialize the player after the API is ready
}

// Modify the populateGuide function
function populateGuide(videoId) {
    // Create guide container
    const guideContainer = document.getElementById('guide');
    guideContainer.style.display = 'flex'; // Display the guide
    guideContainer.style.flexDirection = 'column';
    guideContainer.style.alignItems = 'center';
    guideContainer.style.marginTop = '20px';
    guideContainer.style.paddingTop = '20px'; // Add padding at the top for space

    // Create iframe for the video
    const video = document.createElement('iframe');
    video.id = 'youtube-player'; // Set an ID for the iframe
    video.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`; // Enable the API
    video.allowFullscreen = true;
    video.style.width = '560px';
    video.style.height = '315px';
    video.style.marginBottom = '20px';
    video.style.border = 'none';

    // Clear existing content and append the new iframe
    guideContainer.innerHTML = '';
    guideContainer.appendChild(video);

    // Initialize the player
    player = new YT.Player('youtube-player', {
        events: {
            'onReady': onPlayerReady
        }
    });

    // Create a list for durations
    const durationList = document.createElement('ul');
    durationList.style.listStyleType = 'none';
    durationList.style.padding = '0';
    durationList.style.width = '100%'; // Make it full width
    durationList.style.maxWidth = '600px'; // Set a max width for better appearance
    durationList.style.borderTop = '1px solid #ccc'; // Add a top border for separation

    // Sample titles and durations (in seconds)
    const videoSections = [
        { title: 'Opening the website', duration: 0 },
        { title: 'Home page', duration: 30 },
        { title: 'Course Content', duration: 54 },
        { title: 'Exams-specific content, PYQs, Datesheets and Results', duration: 107 },
        { title: 'News, Announcements and Assignments', duration: 165 },
        { title: 'ABC Ids, NPTEL choices, Academic Calendars', duration: 211 },
        { title: 'Quiz, Compiler, Chatbot', duration: 228 },
        { title: 'Phone numbers and Mails of Faculty', duration: 286 },
        { title: 'Calendar including festival, academic dates, etc.', duration: 293 },
        { title: 'Bunch of online sites, student-specific', duration: 309 },
        { title: 'Link to Installers', duration: 335 },
        { title: 'Games made using HTML, like Snake, Bouncing Ball, 2048, Plane Defense', duration: 343 },
        { title: 'SGPA, CGPA, CLASS-NEED Calculator and other content', duration: 354 },
        { title: 'Chatbot StudyBuddy', duration: 418 }
    ];

    // Populate duration list
    videoSections.forEach(section => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex'; // Use flex for horizontal layout
        listItem.style.justifyContent = 'space-between'; // Space between title and duration
        listItem.style.padding = '10px'; // Add padding for better spacing
        listItem.style.borderBottom = '1px solid #eee'; // Light border between items

        const title = document.createElement('span');
        title.textContent = section.title;
        title.style.flexGrow = '1'; // Allow the title to take up space
        title.style.color = '#333'; // Dark text for title

        const duration = document.createElement('span');
        const minutes = Math.floor(section.duration / 60); // Convert seconds to minutes
        const seconds = section.duration % 60; // Remaining seconds
        duration.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format to aa:bb
        duration.style.cursor = 'pointer'; // Make the duration clickable
        duration.style.color = '#007bff'; // Color for duration
        duration.style.textDecoration = 'underline'; // Underline for duration

        // Add hover effect for duration
        duration.onmouseover = () => {
            duration.style.color = '#0056b3';
        };
        duration.onmouseout = () => {
            duration.style.color = '#007bff';
        };

        // Seek to specific time when duration is clicked
        duration.onclick = () => seekTo(section.duration);

        // Append title and duration to the list item
        listItem.appendChild(title);
        listItem.appendChild(duration);

        // Append the list item to the duration list
        durationList.appendChild(listItem);
    });

    // Append the duration list
    guideContainer.appendChild(durationList);
}

// Function to seek to a specific time in the video
function seekTo(seconds) {
    if (player) {
        player.seekTo(seconds, true); // Seek to the specific time
        player.playVideo(); // Play the video after seeking
    }
}

// Optional: This function runs when the player is ready
function onPlayerReady(event) {
    // You can perform additional setup here if needed
}
