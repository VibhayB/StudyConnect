const ideas = [
    { id: "quiz", title: "Quiz App", description: "", icon: "https://cdn-icons-png.flaticon.com/512/8776/8776841.png" },
    { id: "coding", title: "Practise Web Dev", description: "", icon: "https://cdn-icons-png.flaticon.com/512/9414/9414296.png" },
    { id: "compiler", title: "Compiler", description: "", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStP9rmj95HtX9oa72ynMlWIuxLvCZewAhqj3YldofMsQ3l2-XaTK2jrGbNNLK9XmcCuFk&usqp=CAU" }
]; 

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
        minHeight: '500px' // Set a minimum height for the content container
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

        // Embed iframe or content based on the selected tab
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '400px';

        if (item.id === 'quiz') {
            iframe.src = 'https://www.indiabix.com/computer-science/questions-and-answers/';
        } else if (item.id === 'coding') {
            iframe.src = 'https://www.codepractice.dev/';
        } else if (item.id === 'compiler') {
            iframe.src = 'https://onecompiler.com/embed/';
        }
        contentContainer.appendChild(iframe);

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