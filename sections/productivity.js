const ideas = [
    { id: "questions", title: "Questions", description: "Explore questions of various types", icon: "https://cdn-icons-png.flaticon.com/512/8776/8776841.png", src: 'https://www.indiabix.com/computer-science/questions-and-answers/' },
    { id: "compiler", title: "Compiler", description: "Use in landscape for better view", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStP9rmj95HtX9oa72ynMlWIuxLvCZewAhqj3YldofMsQ3l2-XaTK2jrGbNNLK9XmcCuFk&usqp=CAU", src: 'https://onecompiler.com/embed/' },
    { id: "chatpdf", title: "ChatPDF", description: "Chat with pdf", icon: "https://www.chatpdf.com/icons/logo-192.png", src: 'https://www.chatpdf.com/' },
    { id: "blackbox ai", title: "BlackBox", description: "Chat with ai", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YPUeZufuboIJ38LNr29R-VNkjmxyfEJirt-sXJdLACqR6sHfK9JfFcJtGYU71SBGdsk&usqp=CAU", src: 'https://www.blackbox.ai/' }
];

// Function to hide the spinner and show the iframe after loading
function hideSpinner(iframe) {
    const spinner = iframe.previousElementSibling;
    spinner.style.display = 'none';  // Hide spinner
    iframe.style.display = 'block';  // Show iframe
}

function showSpinner(iframe) {
    const spinner = iframe.previousElementSibling;
    spinner.style.display = 'block';  // Show spinner
    iframe.style.display = 'none';    // Hide iframe
}

function populateProductivity(data = ideas) {
    const productivityContainer = document.getElementById('productivity');
    
    // Clear the container first to avoid duplication
    productivityContainer.innerHTML = '';

    // Apply styles for the dashboard container
    Object.assign(productivityContainer.style, {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        height: '100vh',
        overflowY: 'auto' // Enable scrolling within the container
    });

    // Create a div for tabs
    const tabsContainer = document.createElement('div');
    Object.assign(tabsContainer.style, {
        display: 'flex',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '20px'
    });

    // Create a content container where dynamic content will be displayed
    const contentContainer = document.createElement('div');
    Object.assign(contentContainer.style, {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        minHeight: '70vh', // Make the content container take up 70% of the viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    });

    // Function to update the content area based on the selected tab
    function updateContent(item, clickedButton) {
        contentContainer.innerHTML = ''; // Clear previous content

        const contentTitle = document.createElement('h2');
        contentTitle.textContent = item.title;
        contentContainer.appendChild(contentTitle);

        const contentDescription = document.createElement('p');
        contentDescription.textContent = item.description;
        contentContainer.appendChild(contentDescription);

        // Create a spinner element
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        Object.assign(spinner.style, {
            border: '4px solid #f3f3f3', // Light grey
            borderTop: '4px solid #3498db', // Blue
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '20px auto', // Center spinner horizontally
            display: 'block' // Initially show the spinner
        });

        contentContainer.appendChild(spinner);

        // Embed iframe or content based on the selected tab
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = 'calc(70vh - 100px)'; 
        iframe.style.display = 'none'; // Hide iframe initially

        iframe.src = item.src;
        contentContainer.appendChild(iframe);

        // Show spinner and wait for iframe to load
        showSpinner(iframe);
        iframe.onload = () => hideSpinner(iframe); // When iframe finishes loading, hide spinner

        // Set all tab buttons back to their original background color
        const allTabButtons = tabsContainer.querySelectorAll('button');
        allTabButtons.forEach(btn => {
            btn.style.backgroundColor = '#fff'; // Reset background color of all buttons
        });

        // Set the clicked button's background color to dark
        clickedButton.style.backgroundColor = '#ddd'; // Highlight the active button
    }

    // Create tabs dynamically from the data
    data.forEach(item => {
        const tabButton = document.createElement('button');
        tabButton.textContent = item.title;
        Object.assign(tabButton.style, {
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '5px',
            transition: 'background-color 0.3s'
        });

        // Handle click to load respective content
        tabButton.addEventListener('click', () => {
            updateContent(item, tabButton); // Pass clicked button to updateContent function
        });

        tabsContainer.appendChild(tabButton);
    });

    // Append tabs and content container to the productivity container
    productivityContainer.appendChild(tabsContainer);
    productivityContainer.appendChild(contentContainer);

    // Load the first tab by default
    updateContent(data[0], tabsContainer.querySelector('button'));
}

// CSS for the spinner animation
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
