function checkSignInStatus() {
    const rollNumber = localStorage.getItem('rollNumber');
    const lastSignInTime = localStorage.getItem('lastSignInTime');
    const now = new Date().getTime();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (rollNumber && lastSignInTime) {
        const timeDifference = now - parseInt(lastSignInTime, 10);

        if (timeDifference < tenMinutes) {
            // User is within the valid sign-in period
            isSignedIn = true;
        } else {
            // User is beyond the valid sign-in period
            isSignedIn = false;
            localStorage.removeItem('rollNumber'); // Optionally clear roll number
            localStorage.removeItem('lastSignInTime');
        }
    } else {
        // User is not signed in
        isSignedIn = false;
    }

    updateHomeButton(); // Update Home button based on sign-in status
}

function toggleMenu() {
    var nav = document.getElementById('hamburger-menu');
    var overlay = document.getElementById('overlay');
    var main = document.querySelector('main');

    // Toggle the menu visibility
    nav.classList.toggle('closed');
    
    // Toggle the overlay visibility
    if (nav.classList.contains('closed')) {
        overlay.classList.remove('open');
        overlay.classList.add('closed');
    } else {
        overlay.classList.remove('closed');
        overlay.classList.add('open');
    }
    
    // Optionally add a dim effect to the main content
    main.classList.toggle('dimmed');
}


function showTab(tabName) {
    var i, content, menuItems;
    content = document.getElementsByClassName("content");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    menuItems = document.querySelectorAll("nav ul li");
    for (i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}
let isSignedIn = false; // Replace with actual authentication check

// Function to handle Home button click
function handleHomeClick() {
    if (isSignedIn) {
        showHome();
    } else {
        showSignInPopup();
    }
}

// Function to show the sign-in popup
function showSignInPopup() {
    document.getElementById('sign-in-popup').classList.remove('closed');
    document.getElementById('sign-in-popup').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}

// Function to close the sign-in popup
function closeSignInPopup() {
    document.getElementById('sign-in-popup').classList.remove('open');
    document.getElementById('sign-in-popup').classList.add('closed');
    document.getElementById('overlay').classList.remove('open');
}

// Function to update Home button based on sign-in status
function updateHomeButton() {
    const homeButton = document.querySelector('.home-button');
    if (isSignedIn) {
        const menuButton = document.getElementById('menu');
        menuButton.style.display = 'block';
        homeButton.textContent = 'Home';
    } else {
        homeButton.textContent = 'Sign In';
    }
}

// Call updateHomeButton() whenever the sign-in state changes
updateHomeButton();


function showHome() {
    var i, content, menuItems;
    content = document.getElementsByClassName("content");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    menuItems = document.querySelectorAll("nav ul li");
    for (i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("active");
    }
    document.getElementById('home').style.display = "block";
}
// Function to handle form submission
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    // Logic to handle sign-in (e.g., validate credentials)
    isSignedIn = true; // Assuming sign-in is successful
    const rollNumber = document.getElementById('roll-number').value; // Example: Get roll number from form
    localStorage.setItem('rollNumber', rollNumber);
    localStorage.setItem('lastSignInTime', new Date().getTime().toString());
    closeSignInPopup(); // Close the popup
    updateHomeButton(); // Update the home button text
});

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var slideIndex = 1;
showSlides(slideIndex);

document.addEventListener('DOMContentLoaded', function() {
    checkSignInStatus();

    // Set interval to update the timestamp every 2 minutes if the user is signed in
    setInterval(function() {
        if (isSignedIn) {
            localStorage.setItem('lastSignInTime', new Date().getTime().toString());
        }
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
    const menuButton = document.getElementById('menu');
    const menu = document.getElementById('hamburger-menu');
        // Check if user is signed in
    if (isSignedIn) {
        menuButton.style.display = 'block'; // Show the menu button if signed in
    } else {
        menuButton.style.display = 'none'; // Hide the menu button if not signed in
    }  document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            if (!menu.classList.contains('closed')) {
                toggleMenu();
            }
        }
    });
});