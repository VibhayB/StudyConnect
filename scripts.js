// script.js
let isSignedIn = false;
let currentDate = new Date();
var maindata = null;
let readability = true;
let fadeTimeout;
var otheritems = [];
var feedbackurl;
var reporturl;
var imageMap;
var courseData;
var showbanner = "show"; //set to 'dont show' to disable and 'show' to enable
const classLists = {"course":"Course","feed":"Feed","exams":"Exams","games":"Games","calendar":"Academic Calendar","forms":"Important Docs","contacts":"Important Contacts","installers":"Installers","sites":"Online Sites","others":"Others","productivity":"Productivity"};
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Trying to register the service worker...');
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  
  

// Tab names mapping
const tabNames = {
    "courseData": "course",
    "posts": "feed",
    "forms": "forms",
    "examData": "exams",
    "apps": "others",
    "examSchedule": "calendar",
    "onlineSites": "sites",
    "contacts": "contacts",
    "installers": "installers"
};

// Keywords mapping
const keywords = {
    "courseData": ["course", "study material", "course content"],
    "posts": ["posts", "feed"],
    "forms": ["forms", "sheets"],
    "examData": ["examData"],
    "apps": ["apps", "others"],
    "examSchedule": ["examSchedule", "timers", "calendar", "date", "dates"],
    "onlineSites": ["onlineSites", "sites", "websites"],
    "contacts": ["contacts", "call", "email"],
    "installers": ["installers", "install", "download"],
    "games" : ["Games"]
};


function showLoadingScreen() {
    document.getElementById("screen").style.display = 'none';
    document.getElementById("banner").style.display = 'none';
    document.getElementById("sign-in-message").style.display = 'none';
    
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.zIndex = '1004';
    loadingScreen.style.color = 'white';
    loadingScreen.style.flexDirection = 'column';

    const loader = document.createElement('div');
    loader.style.border = '16px solid #f3f3f3';
    loader.style.borderTop = '16px solid #3498db';
    loader.style.borderRadius = '50%';
    loader.style.width = '120px';
    loader.style.height = '120px';
    loader.style.animation = 'spin 2s linear infinite';

    const loadingText = document.createElement('p');
    loadingText.textContent = 'Loading, please wait...';
    loadingText.style.marginTop = '20px';
    loadingText.style.color = 'black';  // Set the text color to black

    loadingScreen.appendChild(loader);
    loadingScreen.appendChild(loadingText);
    document.body.appendChild(loadingScreen);

    // Keyframes for the spinning animation
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, styleSheet.cssRules.length);
}

// Function to hide the loading screen
function hideLoadingScreen() {
    document.getElementById("screen").style.display = '';
    document.getElementById("banner").style.display = '';
    if(!isSignedIn){
        document.getElementById("sign-in-message").style.display = '';
    } else{
        document.getElementById("sign-in-message").style.display = 'none';
    }
    
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 1s';

        // Wait for the transition to finish before removing the element
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 1000);
    }
}


function updateStatusBar() {
    const statusBar = document.getElementById('status-bar');

    if (navigator.onLine) {
        // User is online
        statusBar.textContent = 'You are back online';
        statusBar.className = 'online';
        statusBar.style.display = 'block'; // Make sure it's visible
        statusBar.style.opacity = '1'; // Ensure full opacity
        
        // Fade out after 2-3 seconds
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
            statusBar.style.opacity = '0'; // Start fading out
            setTimeout(() => {
                statusBar.style.display = 'none'; // Hide completely after fade
            }, 500); // Match this duration with the CSS transition time
        }, 2000); // Adjust the delay before fading out (2 seconds)
    } else {
        // User is offline
        statusBar.textContent = 'You are offline';
        statusBar.className = 'offline';
        statusBar.style.display = 'block'; // Ensure it's visible
        statusBar.style.opacity = '1'; // Ensure full opacity
    }
}

// Listen for online/offline events
window.addEventListener('online', updateStatusBar);
window.addEventListener('offline', updateStatusBar);

function userRead() {
    if (readability) {
        readability = false; // Set variable to false
        console.log("Loading started");
        // Set timeout to revert variable back to true after the specified duration
        setTimeout(() => {
            readability = true;
            console.log("Free to load again");
        }, 2000);
    }
}

var currenttab = localStorage.getItem("tabcurrentx");
var currentheader = localStorage.getItem("tabcurrenty");
var examSchedule;
var applist;
//python -m http.server 8000

// Call the function after a 1-second delay

async function fetchAndDisplayData() {
    try {
      // Replace 'your-collection-name' with the actual collection name
      const lastlogStr = localStorage.getItem("lastlog");
      const lastlog = lastlogStr ? new Date(parseInt(lastlogStr, 10)) : null;
      
    // Check if lastlog exists
    const currentTime = new Date();
    let abctime = localStorage.getItem("tries") || "2024-09-28T00:00:00";
    if(Date.now() - abctime > 5000){
        const data = await window.loadCollectionData('categoriesData'); 
        maindata = data;
    } else{
        maindata = null;
    } localStorage.setItem("tries", Date.now());
      console.log('Website Loaded');
      // You can process or display the data as needed here
      const storedData = JSON.parse(localStorage.getItem("maindataxh"));
      if((!maindata || !maindata.some(item => item.id === 'courseData'))){
        if(storedData){
            maindata = storedData;
        } else{
            console.log("Unauthorized");
            localStorage.removeItem("efusereId");
            signInWithGoogleDirectly(true);               
            localStorage.setItem("tabcurrentx","home");
            localStorage.setItem("tabcurrenty","AIML StudyConnect");        
            showAlert("You don't have access","https://cdn-icons-png.flaticon.com/512/675/675564.png");
            readability = false;
            return;
        }
      } 
      if(!isSignedIn){
        localStorage.setItem("maindataxh", JSON.stringify(maindata));
        if(!lastlog){
            showAlert("Signed in successfully, as "+localStorage.getItem("efusereId"),"https://www.freeiconspng.com/thumbs/success-icon/success-icon-2.png");
            showbanner = "show later";
        } else if(Date.now() - lastlog > 60000){
            showbanner = "show already";
            if(currenttab){
                currenttab = "home";
            }
        }
        console.log("Displaying");
        isSignedIn = true;
        for(let data of maindata){
            if(data.id == "examData"){
                createTabs(data.data);
            } else if(data.id == "contacts"){
                populateContacts(data.data);
            } else if(data.id == "installers"){
                populateInstallers(data.data);
            } else if(data.id == "onlineSites"){
                populateOnlineSites(data.data);
            } else if(data.id == "forms"){
                populateForms(data.data);
            } else if(data.id == "examSchedule"){
                examSchedule = data.data;
                generateCalendar();
            } else if(data.id == "apps"){
                applist = data.data;
            } else if(data.id == "posts"){
                populateFeed(data.data,lastlog);
            } else if(data.id == "courseData"){
                courseData = data.data;
            } else if(data.id == "Others"){
                otheritems.push(data.infoSection);
                feedbackurl = data.URLs.feedback;
                reporturl = data.URLs.report;
                localStorage.setItem("xebiacontent",JSON.stringify(data["Xebia Content"]));
                localStorage.setItem('clanlinks',JSON.stringify(data["ClanLinks"]));
                let courseInfo = data["courseInfo"];
                localStorage.setItem("courseInfo", JSON.stringify(courseInfo));
                localStorage.setItem("semesters",JSON.stringify(data.semesters));
                imageMap = data.Images;
            } /*elseif(data.id == "productivity"){
                
                populateProductivity(data.data);
            }*/
        } populateProductivity();
        populateApps();
        populateGames();
        injectCSS();
        initializeSemesterSelection();
        showHome();
        updateHomeButton();
        
        if(currenttab){
            document.querySelector("#header").innerHTML = currentheader;
            showTab(event, currenttab);
        }  readability = false;
      } 
    } catch (error) {
      console.error('Error loading', error);
      showAlert("Unable to sync data, please try again","https://cdn-icons-png.flaticon.com/512/675/675564.png");
    } finally{
        hideLoadingScreen();
    }
};
  
  
  // Immediately invo
const signInMessage = document.createElement('div');
signInMessage.id = 'sign-in-message';
signInMessage.className = 'sign-in-message';
signInMessage.textContent = 'Sign in to access content';

// Apply styles to the sign-in message
signInMessage.style.position = 'fixed';
signInMessage.style.bottom = '0';
signInMessage.style.left = '0'; 
signInMessage.style.width = '100%'; // Make it span the full width
signInMessage.style.height = '3%'; // Make it span the full width
signInMessage.style.backgroundColor = 'black';
signInMessage.style.color = 'white';
signInMessage.style.borderTop = '1px solid #f5c6cb'; // Add a border at the top
signInMessage.style.borderRadius = '8px 8px 0 0'; // Rounded corners at the top
signInMessage.style.padding = '15px'; // Adjust padding for a footer look
signInMessage.style.boxShadow = '0 -2px 4px rgba(0, 0, 0, 0.1)'; // Shadow for the footer
signInMessage.style.zIndex = '999';
signInMessage.style.textAlign = 'center';
signInMessage.style.fontFamily = 'Arial, sans-serif';

// Append the sign-in message to the body
document.body.appendChild(signInMessage);

const homeContent = document.getElementById('home');

function showAlert(message,icon="load.png") {
    closeAlert();
    document.getElementById("alertimg").src=icon;
    // Update the message in the alert
    document.querySelector('.alert-message').innerHTML = message;

    // Display the custom alert
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'block';
    
    // Trigger the fade-in effect by forcing a reflow and then changing the opacity
    requestAnimationFrame(() => {
        alertBox.style.opacity = '1';
        alertBox.style.visibility = 'visible';
    });
  }
  
  function closeAlert() {
    const alertBox = document.getElementById('custom-alert');

    // Trigger the fade-out effect by changing the opacity
    alertBox.style.opacity = '0';
    alertBox.style.visibility = 'hidden';
    if(showbanner == "show later"){
        try{
            document.getElementById('initialbanner').style.display = "flex";
        } catch(error){

        }
        showbanner = "dont show"; 
    }
  }

// Function to toggle the menu visibility
function toggleMenu() {
    const nav = document.getElementById('hamburger-menu');
    const overlay = document.getElementById('overlay');
    const main = document.querySelector('main');
    const menuItems = nav.querySelectorAll('ul li');

    nav.classList.toggle('closed');
    overlay.classList.toggle('open');
    overlay.classList.toggle('closed');
    main.classList.toggle('dimmed');

    if (!nav.classList.contains('closed')) {
        // Apply staggered animation delay for each menu item
        menuItems.forEach((item, index) => {
            item.style.animation = `fadeInSlideRight 0.5s forwards ${index * 0.1}s`;
        });
    } else {
        // Reset the styles when closing the menu
        menuItems.forEach((item) => {
            item.style.animation = '';
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        });
    }
}


// Function to show a specific tab
function showTab(event, tabName, pushToHistory = true) {  
    const logo = document.querySelector("#header");
    const currentState = history.state;
    try{
        if (pushToHistory) {
            if (!currentState || currentState.tab !== tabName) {
                history.pushState({ tab: tabName }, null, `#${tabName}`);
            }
        } 
        if(tabName == "home"){
            showHome();
            localStorage.setItem("tabcurrentx","home");
            localStorage.setItem("tabcurrenty","AIML StudyConnect");
            return "Home showing";
        } localStorage.setItem("tabcurrentx", tabName);
        
        document.getElementById("home").style.display = 'none';
        try{
            event.preventDefault(); // Prevent default link behavior
        } catch(error){
            //if event not defined
        }
        const content = document.getElementsByClassName("content");
        for (let i = 0; i < content.length; i++) {
            content[i].style.display = "none";
        }
        const menuItems = document.querySelectorAll("nav ul li");
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove("active");
        } 
        if(tabName == "games" || tabName == "others" || tabName =="installers" || tabName == "sites" || tabName == "contacts" || tabName == "forms" || tabName == "feed" || tabName == "course"){
            document.getElementById(tabName).style.display = "flex";
        }
        else{
            document.getElementById(tabName).style.display = "block";
        } 
        try{
            if(event.currentTarget.innerHTML == "View Post"){
                logo.innerHTML = "Feed";
                localStorage.setItem("tabcurrenty", "Feed");
            }
            else{
                event.currentTarget.classList.add("active");
                logo.innerHTML = event.currentTarget.innerHTML;
                localStorage.setItem("tabcurrenty", event.currentTarget.innerHTML);
            }
        } catch(error){
            logo.innerHTML = classLists[tabName];
            localStorage.setItem("tabcurrenty", classLists[tabName]);
        } finally{
            return "Showing tab: " + classLists[tabName];
        } 
    } catch(error){
        console.error(error);
        return "Error";
    }
}
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.tab) {
       showTab(null,event.state.tab,false);
    }
 });
// Function to handle Home button click
function handleHomeClick() {
    if(!isSignedIn){
        signInWithGoogleDirectly(false);
        return;
    } console.log("Already signed in");
}

// Function to show home content

function showHome() { 
// Function to search for relevant data
function chatbotmechanism(input){
    return handleUserPrompt(input);
}
// Main function to handle user prompt
function handleUserPrompt(userPrompt) {
    // Normalize user prompt
    const normalizedPrompt = userPrompt.toLowerCase();

    // Search for keywords and match tab names
    let foundTab = null;
    for (const [id, keywordsList] of Object.entries(keywords)) {
        for (const keyword of keywordsList) {
            if (normalizedPrompt.includes(keyword)) {
                foundTab = tabNames[id];
                break;
            }
        }
        if (foundTab) break;
    } //additional logic
    for (let i = 0; i < intents.intents.length; i++) {
        const intent = intents.intents[i];
        for (let j = 0; j < intent.patterns.length; j++) {
            const pattern = intent.patterns[j];
            if (userPrompt.toLowerCase().includes(pattern.toLowerCase())) {
            // Randomly select a response
            return intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        }
    }
    // If a tab was found through keywords but no other data was found
    if (foundTab) {
        return showTab(null, foundTab);
    }

    // Default action if no data or tab was found
    return "I couldn't find exactly what you're looking for right now. I’ll be updated with more information soon!";
}
// Function to display search results
function displaySearchResult(input) {
    
        // Construct display text with HTML formatting
        let displayHTML = chatbotmechanism(input);

        // Replace URLs with clickable links (with better handling of long URLs)
        displayHTML = displayHTML.replace(/(https?:\/\/[^\s<>"']{20,})/g, '<a href="$1" target="_blank" title="$1">$1</a>');

        // Replace phone numbers with clickable tel links
        displayHTML = displayHTML.replace("\\n", '<br>');

        // Display the formatted HTML content in the chat
        displayMessage(displayHTML, 'bot');
}

    document.querySelector("#header").innerHTML = 'AIML StudyConnnect';

    const content = document.getElementsByClassName("content");
    signInMessage.style.display = 'none';
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    const menuItems = document.querySelectorAll("nav ul li");
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("active");
    }
    const homeContent = document.getElementById('home');
    homeContent.style.display = "block";

    if(!document.getElementById('feedback-report-buttons')){
    // Create and add the buttons
    const buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'feedback-report-buttons';
        buttonsContainer.style.textAlign = 'center';
        buttonsContainer.style.margin = '30px auto';
        buttonsContainer.style.padding = '20px';
        buttonsContainer.style.maxWidth = '90%';
        buttonsContainer.style.boxSizing = 'border-box';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexWrap = 'wrap';
        buttonsContainer.style.gap = '10px'; // Space between buttons

        // Define button data
        const buttonData = [
            { text: 'Course', tab: 'course' },
            { text: 'Exams', tab: 'exams' },
            { text: 'Feed', tab: 'feed' },
            { text: 'Contacts', tab: 'contacts' },
            { text: 'Productivity', tab: 'productivity' },
            { text: 'Others', tab: 'others' }
        ];

        buttonData.forEach(data => {
            const button = document.createElement('button');
            button.textContent = data.text;
            button.className = 'dynamic-button';
            button.style.minWidth = '100px';
            button.style.minHeight = '40px';
            button.style.display = 'inline-flex';
            button.style.fontFamily = "'Nunito', sans-serif";
            button.style.fontSize = '16px';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.textTransform = 'uppercase';
            button.style.textAlign = 'center';
            button.style.letterSpacing = '1.3px';
            button.style.fontWeight = '700';
            button.style.color = '#f0f0f0'; // Light color for text
            button.style.backgroundColor = '#003366'; // Navy background
            button.style.border = 'none';
            button.style.borderRadius = '8px';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
            button.style.transition = 'background-color 0.3s, transform 0.3s, box-shadow 0.3s';
            button.style.cursor = 'pointer';
            button.style.outline = 'none';
            button.style.padding = '10px 15px';
            button.style.margin = '5px';

            // Hover effect
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = '#002a5b'; // Darker navy
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 6px 12px rgba(0,0,0,0.5)';
            });
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = '#003366';
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
            });

            // Focus effect
            button.addEventListener('focus', () => {
                button.style.outline = '2px solid #004080'; // Focus outline color
                button.style.outlineOffset = '4px';
            });
            button.addEventListener('blur', () => {
                button.style.outline = 'none';
            });

            button.onclick = () => showTab(event, data.tab);
            buttonsContainer.appendChild(button);
        });

    homeContent.appendChild(buttonsContainer);

    // Create and add dynamic content
    const infoSection = document.createElement('div');
    infoSection.className = 'info-section';
    infoSection.innerHTML = `
        <div style="width: 80%; max-width: 800px; margin: 20px auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); box-sizing: border-box;">
            <h2 style="text-align: center; margin-bottom: 15px;">Some info. about this website:</h2>
            <ul style="list-style-type: disc; padding-left: 20px;">
                ${otheritems[0].map(point => `<li style="margin-bottom: 10px;">${point}</li>`).join('')}
            </ul>
        </div>
    `;
    homeContent.appendChild(infoSection);

    const timetableSection = document.createElement('div');
timetableSection.className = 'timetable-section';
timetableSection.style.textAlign = 'center'; // Center align the text and image
timetableSection.style.margin = '30px auto'; // Add spacing around the section and center it
timetableSection.style.padding = '20px'; // Add padding inside the section
timetableSection.style.maxWidth = '90%'; // Limit the width for responsiveness
timetableSection.style.boxSizing = 'border-box'; // Ensure padding is included in width

const heading = document.createElement('h3');
heading.textContent = 'Timetable (AIML5A)';
heading.style.fontSize = '24px'; // Adjust font size for the heading
heading.style.marginBottom = '20px'; // Add space below the heading

const image = document.createElement('img');
image.src = imageMap.TimeTable;
image.alt = 'Timetable';
image.style.width = '100%'; // Make image responsive to container width
image.style.maxWidth = '800px'; // Set a maximum width for the image to prevent it from getting too large
image.style.height = 'auto'; // Maintain aspect ratio

timetableSection.appendChild(heading);
timetableSection.appendChild(image);

homeContent.appendChild(timetableSection);

const footer = document.createElement('footer');
footer.id = 'footer';
footer.className = isSignedIn ? '' : 'hidden';
footer.innerHTML = `
    <div id="feedback-report-buttons">
        <button class="feedback-button">Feedback</button>
        <button class="report-button">Report</button>
    </div>
`;

homeContent.appendChild(footer);
}

    // Add event listeners for feedback and report buttons
    const feedbackButton = document.querySelector('.feedback-button');
    const reportButton = document.querySelector('.report-button');

    if (feedbackButton) {
        feedbackButton.addEventListener('click', function() {
            window.open(feedbackurl, '_blank');
        });
    }
    if (reportButton) {
        reportButton.addEventListener('click', function() {
            window.open(reporturl, '_blank');
        });
    }  
    
    // Check if chatbot has already been added
    if (!document.getElementById('chatbot-container')) {
        // Create and add chatbot container
        const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = `
        <div id="chatbot-toggle" style="cursor: pointer; position: fixed; bottom: 20px; right: 20px; background-color: #007bff; color: white; padding: 10px; border-radius: 50%; z-index: 1000; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;">
            <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" id="chatbot-image" style="width: 30px; height: 30px;">
        </div>
        <div id="chatbot" style="display: none; position: fixed; bottom: 60px; right: 20px; width: 300px; height: 400px; background-color: white; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); z-index: 1000; overflow: hidden;">
            <div id="chatbot-header" style="background-color: #007bff; color: white; padding: 10px; text-align: left; position: relative;">
                <img src="https://cdn-icons-png.flaticon.com/512/8943/8943377.png" style="width: 20px; height: 20px; position: absolute; top: 10px; left: 10px;">
                <span style="margin-left: 40px;">StudyBuddy</span>
                <span id="close-chatbot" style="float: right; cursor: pointer;">&times;</span>
            </div>
            <div id="messages" style="padding: 10px; height: calc(100% - 80px); overflow-y: auto; background-color: #f9f9f9; display: flex; flex-direction: column-reverse;">
            </div>
            <div style="padding: 10px; border-top: 1px solid #ddd; background-color: white; position: absolute; bottom: 0; width: calc(100% - 20px); box-sizing: border-box;">
                <input id="message-input" type="text" placeholder="Type your message..." style="width: calc(100% - 50px); padding: 5px; box-sizing: border-box;" />
                <button id="send-message" style="width: 40px; padding: 5px; background-color: #007bff; color: white; border: none; border-radius: 5px;">Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatImage = document.getElementById('chatbot-image');
    const messageInput = document.getElementById('message-input');
    const sendMessageButton = document.getElementById('send-message');
    const messagesContainer = document.getElementById('messages');

    // Function to toggle chat visibility
    chatImage.onclick = () => {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
    };

    // Function to close chat
    closeChatbot.onclick = () => {
        document.getElementById('chatbot').style.display = 'none';
    };

    // Function to create and display messages
    function displayMessage(text, sender) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message');
        messageBubble.style.display = 'flex';
        messageBubble.style.alignItems = 'flex-end';
        messageBubble.style.marginBottom = '10px';
        messageBubble.style.flexDirection = sender === 'user' ? 'row-reverse' : 'row';

        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.style.maxWidth = '70%';
        messageText.style.padding = '10px';
        messageText.style.borderRadius = '15px';
        messageText.style.backgroundColor = sender === 'user' ? '#007bff' : '#ddd';
        messageText.style.color = sender === 'user' ? 'white' : 'black';
        messageText.style.margin = '5px';

        const icon = document.createElement('img');
        icon.classList.add('message-icon');
        icon.src = sender === 'user'
            ? 'https://cdn-icons-png.flaticon.com/512/552/552721.png'
            : 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png';
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.marginLeft = sender === 'user' ? '10px' : '0';
        icon.style.marginRight = sender === 'user' ? '0' : '10px';
        
        messageText.innerHTML = text;
        messageBubble.appendChild(icon);
        messageBubble.appendChild(messageText);
        messagesContainer.appendChild(messageBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        messagesContainer.style.display = 'flex';
        messagesContainer.style.flexDirection = 'column';
        messagesContainer.style.padding = '10px';
        messagesContainer.style.height = 'calc(100% - 80px)';
        messagesContainer.style.overflowY = 'auto';
        messagesContainer.style.backgroundColor = '#f9f9f9';
    }

    sendMessageButton.onclick = () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            messageInput.value = '';

            // Process user input and search the nested data
            const searchTerm = userMessage.toLowerCase();
            //const results = searchKeys(maindata, searchTerm);

            // Display the search result
            setTimeout(() => {
                displaySearchResult(searchTerm);
            }, 700);
        }
    };


    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessageButton.click();
        }
    });

    // Call this function after the chatbot container is added to the DOM
    addChatbotHoverEffects();
}
}
// Function to add hover effects and shadow to the chatbot toggle button
function addChatbotHoverEffects() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    chatbotToggle.addEventListener('mouseover', () => {
        chatbotToggle.style.backgroundColor = '#0056b3';
        chatbotToggle.style.transform = 'scale(1.1)';
        chatbotToggle.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
    });
    chatbotToggle.addEventListener('mouseout', () => {
        chatbotToggle.style.backgroundColor = '#007bff';
        chatbotToggle.style.transform = 'scale(1)';
        chatbotToggle.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    });
}


function signInWithGoogleDirectly(val = false) {
    if (typeof window.signInWithGoogle === 'function' && readability) {
      window.signInWithGoogle(val).then(async (user) => {

        if (user) {
            showLoadingScreen(); 
            userRead();
            fetchAndDisplayData();
        } else {
          hideLoadingScreen(); 
          isSignedIn = false;
          updateHomeButton();
          console.log('Google sign-in failed. Please try again.');
        }
      });
    } else {
      console.error('signInWithGoogle is not defined or not a function');
      hideLoadingScreen(); 
    } 
  } 
  

// Functions for handling slides
function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("info-card");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

let slideIndex = 1;
showSlides(slideIndex);
function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Set interval to run nextSlide every 5 seconds
setInterval(nextSlide, 5000);

// Initial setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen(); 
    const menuButton = document.getElementById('menu');
    const menu = document.getElementById('hamburger-menu');
    menuButton.style.display = isSignedIn ? 'block' : 'none';
    
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            if (!menu.classList.contains('closed')) {
                toggleMenu();
            }
        }
    });

    // Set up Home button
    document.querySelector('.home-button').addEventListener('click', handleHomeClick);

    
    // Set up Sign In button
    const signInButton = document.querySelector('.sign-in-button');
    if (signInButton) {
        signInButton.addEventListener('click', signInWithGoogleDirectly);
    } 
    const storedUserId = localStorage.getItem("efusereId");
    if (storedUserId && readability) {
        console.log("Initializing");
        fetchAndDisplayData();
        userRead();
    } else{        
        hideLoadingScreen(); 
    }
});
let isDropdownVisible = false;
function updateHomeButton() {
    const homeButton = document.querySelector('.home-button');
    const menuButton = document.getElementById('menu');
    const feedbackReportButtons = document.getElementById('feedback-report-buttons');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const signOutLink = document.getElementById('sign-out');
    if (isSignedIn) {
        homeButton.innerHTML = '<i class="fas fa-user" alt="Profile"></i> <span class="arrow">&#9662;</span>';
        // Display user email in the dropdown
        const userEmail = localStorage.getItem("efusereId"); // Fetch user email from local storage
        const userEmailElement = document.getElementById('user-email');
        if (userEmailElement) {
            userEmailElement.textContent = userEmail; // Set the user email in the dropdown
        }
        menuButton.style.display = 'block';
        if(feedbackReportButtons){
            feedbackReportButtons.classList.remove('hidden');
        }
        // Show dropdown on click
        homeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up
            toggleDropdown();
        });
        
        // Sign out action
        signOutLink.addEventListener('click', () => {
            event.preventDefault(); // Prevent default anchor behavior
            localStorage.removeItem("tabcurrentx");
            localStorage.removeItem("tabcurrenty");
            localStorage.removeItem("efusereId");
            localStorage.removeItem("selectedSemesters");
            localStorage.removeItem("removedSubjects");
            localStorage.removeItem("lastlog");
            signInWithGoogleDirectly(true);
            window.location.reload(true); // For most modern browsers
        });
    } else {
        homeButton.innerHTML = ''; // Remove arrow if exists
        homeButton.textContent = 'Sign In';
        menuButton.style.display = 'none';
        if (feedbackReportButtons) {
            feedbackReportButtons.classList.add('hidden');
        }
    }
} // Toggle dropdown visibility
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    isDropdownVisible = !isDropdownVisible;
    dropdownMenu.style.display = isDropdownVisible ? 'block' : 'none';

    // Add or remove event listener to close dropdown when clicking outside
    if (isDropdownVisible) {
        document.addEventListener('click', closeDropdown);
    } else {
        document.removeEventListener('click', closeDropdown);
    }
}

// Close dropdown when clicking outside of it
function closeDropdown(event) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu.contains(event.target) && !document.querySelector('.home-button-container').contains(event.target)) {
        isDropdownVisible = false;
        dropdownMenu.style.display = 'none';
        document.removeEventListener('click', closeDropdown);
    }
}
