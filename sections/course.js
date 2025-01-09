// Example course data
var displayed = false;
// Example course data

let prohibitcontent = false;
let removedSubjects = JSON.parse(localStorage.getItem('removedSubjects')) || [];
// Function to create and inject CSS
function injectCSS() {
    if(displayed){
        return;
    } 
    document.getElementById('course').innerHTML = "";
    const style = document.createElement('style');
    style.textContent = `
        /* General container for the course section */
#course {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* Container for the semester selection */
#semester-selection-container {
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;
}

/* Semester selection area */
#semester-selection {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

/* Checkbox styling */
.semester-checkbox {
    margin-right: 10px;
}

/* Container for the subject list */
.subject-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    box-sizing: border-box;
}

/* General subject styling */
.subject {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    width: calc(33% - 20px); /* Adjust width as needed */
    box-sizing: border-box;
    transition: background-color 0.3s;
    margin-left: 10px;
}

/* Hover effect for subjects */
.subject:hover {
    background-color: #e0e0e0;
}
/* Semester-based color themes */
.semester-sem1 {
    background-color: #FFDDDD; /* Light red */
}

.semester-sem2 {
    background-color: #FFE0B5; /* Light orange */
}
 
.semester-sem3 {
    background-color: #FFFFB5; /* Light yellow */
}

.semester-sem4 {
    background-color: #D4EDDA; /* Light green */
}

.semester-sem5 {
    background-color:rgb(202, 220, 255); /* Light blue */
} .semester-sem6 {
    background-color:rgb(221, 192, 255); /* Light indigo */
}
/* Popup styling */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
/* Button styling */
        .styled-button {
    margin: 10px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-button:hover {
    transform: translateY(-2px);
}

.styled-button:active {
    transform: translateY(0);
}
.styled-button {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.styled-button:hover {
    background: #0056b3;
}   
/* Add Button Styling */
.add-subject-button {
    background: linear-gradient(135deg, #28a745, #218838);
}

.add-subject-button:hover {
    background: linear-gradient(135deg, #218838, #28a745);
}

/* Remove Button Styling */
.remove-subject-button {
    background: linear-gradient(135deg, #dc3545, #c82333);
}

.remove-subject-button:hover {
    background: linear-gradient(135deg, #c82333, #dc3545);
}
            .remove-icon {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 24px;
            height: 24px;
            background: #dc3545;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s, transform 0.3s;
        }

        .remove-icon:hover {
            background: #c82333;
            transform: scale(1.1);
        }

        .remove-icon:active {
            background: #bd2130;
            transform: scale(1);
        }
        .subject {
            position: relative;
        }
            .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.removed-subject-list {
    margin: 20px 0;
}

.removed-subject-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}


    .popup2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup2-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px; /* Set a fixed width for a small square popup */
    height: 300px; /* Set a fixed height for a small square popup */
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden; /* Ensure content doesn't overflow */
}

.popup2-close {
     position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
} /* Title for the popup */
.popup2-content h2 {
    margin: 0;
    font-size: 18px;
}

/* Scrollable container */
.scrollable-container {
    max-height: calc(100% - 60px); /* Adjust based on height and other elements */
    overflow-y: auto; /* Add vertical scrollbar if content overflows */
}

/* Removed subject list styling */
.removed-subject-list {
    margin: 20px 0;
    max-height: 100%; /* Ensure the list takes up the available space */
    overflow-y: auto; /* Add scrollbar if needed */
}

/* Removed subject item styling */
.removed-subject-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
    `;
    document.head.appendChild(style);
}
let removeMode = false; // Track whether remove mode is active
// Function to initialize the semester selection UI
function initializeSemesterSelection() {
    if(displayed){
        return;
    }
    displayed = true;
    
    const courseContainer = document.getElementById('course');
    
    // Create container for semester selection
    const selectionContainer = document.createElement('div');
    selectionContainer.id = 'semester-selection-container';

    const semesterSelection = document.createElement('div');
    semesterSelection.id = 'semester-selection';

    // Create checkboxes for each semester
    courseData.semesters.forEach(semester => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = semester.id;
        checkbox.classList.add('semester-checkbox');
        checkbox.checked = isSemesterSelected(semester.id);
        checkbox.addEventListener('change', () => {
            updateSubjectList();
            saveSelectedSemesters();
        });

        const label = document.createElement('label');
        label.htmlFor = semester.id;
        label.textContent = semester.name;

        semesterSelection.appendChild(checkbox);
        semesterSelection.appendChild(label);
    });

    // Add buttons for adding and removing subjects
    const addButton = document.createElement('button');
    addButton.id = 'addbutton';
    addButton.textContent = 'Add Subject';
    addButton.classList.add('styled-button', 'add-subject-button');
    addButton.addEventListener('click', openAddSubjectPopup); // Open popup on click

    const removeButton = document.createElement('button');
    removeButton.id = 'rmvbutton';
    removeButton.textContent = 'Remove Subject';
    removeButton.classList.add('styled-button', 'remove-subject-button');
    removeButton.addEventListener('click', () => {
        removeMode = !removeMode; // Toggle remove mode
        updateSubjectList(); // Update the subject list to show/hide remove icons
    });

    selectionContainer.appendChild(semesterSelection);
    selectionContainer.appendChild(addButton);
    selectionContainer.appendChild(removeButton);
    courseContainer.appendChild(selectionContainer);

    // Create a container for subjects
    const subjectList = document.createElement('div');
    subjectList.classList.add('subject-list');
    courseContainer.appendChild(subjectList);

    updateSubjectList(); // Initial update of the subject list
}

function isSemesterSelected(semesterId) {
    const selectedSemesters = getSelectedSemesters();
    return selectedSemesters.includes(semesterId);
}

function getSelectedSemesters() {
    const storedSemesters = localStorage.getItem('selectedSemesters');
    return storedSemesters ? JSON.parse(storedSemesters) : ['sem6']; // Default to Semester 5
}

// Function to save selected semesters to local storage
function saveSelectedSemesters() {
    const selectedSemesters = Array.from(document.querySelectorAll('.semester-checkbox'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    localStorage.setItem('selectedSemesters', JSON.stringify(selectedSemesters));
}
// Function to save removed subjects to local storage
function saveRemovedSubjects() {
    localStorage.setItem('removedSubjects', JSON.stringify(removedSubjects));
}
// Function to display subjects based on selected semesters
function updateSubjectList() {
    const subjectList = document.querySelector('.subject-list');
    if (!subjectList) return;

    // Clear existing subjects
    subjectList.innerHTML = '';

    // Get selected semesters
    const selectedSemesters = Array.from(document.querySelectorAll('.semester-checkbox'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    if (selectedSemesters.length === 0) {
        selectedSemesters.push('sem6'); // Default to Semester 5 if none selected
    }

    // Populate subjects
    selectedSemesters.forEach(semesterId => {
        const semester = courseData.semesters.find(sem => sem.id === semesterId);

        if (semester) {
            semester.subjects.forEach(subjectName => {
                if (removedSubjects.includes(subjectName.name)) return;
                const subjectDiv = document.createElement('div');
                subjectDiv.textContent = subjectName.name;
                subjectDiv.classList.add('subject');
                subjectDiv.classList.add(`semester-${semesterId}`); // Add semester-based class
                if (removeMode) {
                    const removeButton = document.createElement('div');
                    removeButton.classList.add('remove-icon');
                    removeButton.addEventListener('click', () => {
                        removedSubjects.push(subjectName.name);
                        saveRemovedSubjects();
                        subjectDiv.remove();
                        removeMode = !removeMode; // Toggle remove mode
                        updateSubjectList(); // Update the subject list to show/hide remove icons
                        prohibitcontent = true;
                    });
                    subjectDiv.appendChild(removeButton);
                }
                subjectDiv.addEventListener('click', () => {
                    if(!prohibitcontent){
                        showSubjectPopup(subjectName);
                    } else{
                        prohibitcontent = false;
                    }
                });

                subjectList.appendChild(subjectDiv);
            });
        }
    });
}function openAddSubjectPopup() {
    // Create a popup container
    const popup = document.createElement('div');
    popup.id = 'add-subject-popup2';
    popup.classList.add('popup2');

    // Create a popup content container
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup2-content');

    // Create a close button for the popup
    const closeButton = document.createElement('span');
    closeButton.classList.add('popup2-close');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
        popup.remove(); // Remove the popup from the DOM
    });

    // Add close button to popup content
    popupContent.appendChild(closeButton);

    // Create a title for the popup
    const title = document.createElement('h2');
    title.textContent = 'Add Subjects';
    popupContent.appendChild(title);

    // Create a scrollable container for the subject list
    const subjectListContainer = document.createElement('div');
    subjectListContainer.classList.add('scrollable-container');
    
    // Create a list of removed subjects
    const removedSubjectList = document.createElement('div');
    removedSubjectList.classList.add('removed-subject-list');
    removedSubjects.forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.classList.add('removed-subject-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `restore-${subject}`;
        checkbox.value = subject;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = subject;

        subjectItem.appendChild(checkbox);
        subjectItem.appendChild(label);
        removedSubjectList.appendChild(subjectItem);
    });

    subjectListContainer.appendChild(removedSubjectList);
    popupContent.appendChild(subjectListContainer);

    // Create an Add button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.classList.add('styled-button');
    addButton.addEventListener('click', () => {
        addSelectedSubjects();
        popup.remove(); // Close the popup after adding subjects
    });

    popupContent.appendChild(addButton);

    // Append the popup content to the popup container
    popup.appendChild(popupContent);

    // Append the popup to the body
    document.body.appendChild(popup);
}

function addSelectedSubjects() {
    const checkboxes = document.querySelectorAll('#add-subject-popup2 .removed-subject-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const subjectName = checkbox.value;
            // Remove the subject from the removedSubjects array
            removedSubjects = removedSubjects.filter(subject => subject !== subjectName);
            saveRemovedSubjects(); // Update local storage
        }
    });
    updateSubjectList(); // Update the subject list to show newly added subjects
}

function showSubjectPopup(subjectName) {
    if(removeMode){
        return;
    } document.getElementById("rmvbutton").style.display = "none";
    document.getElementById("addbutton").style.display = "none";
    document.getElementById("semester-selection").style.display = "none";
    // Check if subjectName has a URL
    if (subjectName.hasOwnProperty('url') && subjectName.url) {
        window.open(subjectName.url, '_blank');
        return;
    }

    // Find the subject in courseData
    const subject = courseData.semesters
        .flatMap(sem => sem.subjects)
        .find(sub => sub.name === subjectName.name);

    if (subject && subject.details) {
        // Hide the subject list
        const subjectList = document.querySelector('.subject-list');
        subjectList.style.display = 'none';

        // Get the main course container
        const courseContainer = document.getElementById('course');

        // Create the breadcrumb navigation
        const breadcrumbNav = document.createElement('div');
        breadcrumbNav.id = 'breadcrumb-nav';
        breadcrumbNav.style.marginLeft = '20px';
        breadcrumbNav.innerHTML = `
            <a href="#" id="course-link">Course</a> > 
            <a href="#" id="subject-link">${subjectName.name}</a>
        `;

        // Add event listeners to breadcrumb links
        breadcrumbNav.querySelector('#course-link').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#subject-content')?.remove();
            document.querySelector('#breadcrumb-nav')?.remove();
            subjectList.style.display = 'flex';
            document.getElementById("rmvbutton").style.display = "";
            document.getElementById("addbutton").style.display = "";
            document.getElementById("semester-selection").style.display = "";
        });

        breadcrumbNav.querySelector('#subject-link').addEventListener('click', (e) => {
            e.preventDefault();
            showSubjectContent(subject);
        });

        // Create the initial subject content
        const subjectContent = document.createElement('div');
        subjectContent.id = 'subject-content';
        subjectContent.style.marginLeft = '20px';
        subjectContent.innerHTML = `<h2>${subjectName.name}</h2>`;

        // Create a container for the details
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');

        // Iterate over each detail and create clickable items
        Object.keys(subject.details).forEach(detailName => {
            const detailDiv = document.createElement('div');
            detailDiv.classList.add('detail-item');

            // Determine the correct icon based on the detail name
            let iconUrl = '';
            if (detailName.includes('Syllabus')) {
                iconUrl = "https://static.vecteezy.com/system/resources/previews/014/636/881/non_2x/syllabus-clipboard-icon-flat-style-vector.jpg";
            } else if (detailName.includes('Book')) {
                iconUrl = "https://t4.ftcdn.net/jpg/05/07/19/83/360_F_507198344_PPZmZ0ShfTohJBPUv7Dh0ATswkJrPjtr.jpg";
            } else if (detailName.includes('Online') || detailName.includes('NPTEL Dashboard') || detailName.includes('Website') || detailName.toLowerCase().includes('question')) {
                iconUrl = "https://i.pinimg.com/564x/4b/b0/37/4bb037397915f5efa68fdd79b604b822.jpg";
            } else if (detailName === 'Tutorials') {
                iconUrl = "https://ift.world/wp-content/uploads/2017/01/wsi-imageoptim-q-bank-300x300.png";
            } else if (detailName === 'Labs') {
                iconUrl = "https://cdn-icons-png.flaticon.com/512/2393/2393574.png";
            } else if (detailName.includes('Study Material') && !detailName.includes('Online') || detailName.includes('Content')) {
                iconUrl = "https://cdn-icons-png.flaticon.com/512/1089/1089109.png";
            } else if (detailName.includes('Project') || detailName.includes('Literature Survey Folder')) {
                iconUrl = "https://static-00.iconduck.com/assets.00/folder-icon-256x204-0171zqe6.png";
            } else if (detailName === 'Class Notebook') {
                iconUrl = "https://static.vecteezy.com/system/resources/previews/027/179/341/original/microsoft-one-note-icon-logo-symbol-free-png.png";
            } else if (detailName === 'Evaluation Sheet') {
                iconUrl = "https://cdn-icons-png.flaticon.com/512/5361/5361284.png";
            } else if (detailName.toLowerCase().includes('ppt')) {
                iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsdPmt20JSFqweGX13Ib7KM5xbeWFqXCfuog&s";
            } else if (detailName.includes('About Course') || detailName.includes("Outcome") || detailName.toLowerCase().includes("description")) {
                iconUrl = "https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_1280.png";
            } else if (detailName === 'Videos') {
                iconUrl = "https://cdn-icons-png.freepik.com/256/1324/1324244.png?semt=ais_hybrid";
            } else if (detailName === 'Courses' || detailName.toLowerCase().includes('topic') || detailName.toLowerCase().includes('plan') ) {
                iconUrl = "https://cdn-icons-png.flaticon.com/256/1903/1903172.png";
            } else if (detailName.toLowerCase().includes('assignment')) {
                iconUrl = "https://cdn-icons-png.flaticon.com/512/5842/5842026.png";
            } else {
                iconUrl = "https://i.pinimg.com/originals/c0/f6/c9/c0f6c97d6669e7bfb41727e884aeb801.png"; // Default icon
            }

            // Add the icon and the detail name
            detailDiv.innerHTML = `
                <img src="${iconUrl}" alt="${detailName}" class="detail-icon" />
                <p>${detailName}</p>
            `;
            detailDiv.addEventListener('click', () => showDetailContent(detailName, subject.details[detailName]));

            detailsContainer.appendChild(detailDiv);
        });

        // Add breadcrumb and content to the course container
        subjectContent.appendChild(detailsContainer);
        courseContainer.appendChild(breadcrumbNav);
        courseContainer.appendChild(subjectContent);
    }
}

function showSubjectContent(subject) {
    // Check if subject exists
    if (!subject || !subject.details) return;

    // Hide the subject list
    const subjectList = document.querySelector('.subject-list');
    if (subjectList) subjectList.style.display = 'none';

    // Get the main course container
    const courseContainer = document.getElementById('course');

    // Remove previous content
    document.querySelector('#subject-content')?.remove();
    document.querySelector('#breadcrumb-nav')?.remove();

    // Create the breadcrumb navigation
    const breadcrumbNav = document.createElement('div');
    breadcrumbNav.id = 'breadcrumb-nav';
    breadcrumbNav.style.marginLeft = '20px';
    breadcrumbNav.innerHTML = `
        <a href="#" id="course-link">Course</a> > 
        <a href="#" id="subject-link">${subject.name}</a>
    `;
    // Add event listeners to breadcrumb links
    breadcrumbNav.querySelector('#course-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#subject-content')?.remove();
        document.querySelector('#breadcrumb-nav')?.remove();
        subjectList.style.display = 'flex';
        document.getElementById("rmvbutton").style.display = "";
        document.getElementById("addbutton").style.display = "";
        document.getElementById("semester-selection").style.display = "";
    });

    breadcrumbNav.querySelector('#subject-link').addEventListener('click', (e) => {
        e.preventDefault();
        showSubjectContent(subject);
    });

    // Create the subject content
    const subjectContent = document.createElement('div');
    subjectContent.id = 'subject-content';    
    subjectContent.style.marginLeft = '20px';
    subjectContent.innerHTML = `<h2>${subject.name}</h2>`;

    // Create a container for the details
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    // Populate the details
    Object.keys(subject.details).forEach(detailName => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail-item');

        // Determine the icon URL
        let iconUrl = '';
        if (detailName.includes('Syllabus')) {
            iconUrl = "https://static.vecteezy.com/system/resources/previews/014/636/881/non_2x/syllabus-clipboard-icon-flat-style-vector.jpg";
        } else if (detailName.includes('Books')) {
            iconUrl = "https://t4.ftcdn.net/jpg/05/07/19/83/360_F_507198344_PPZmZ0ShfTohJBPUv7Dh0ATswkJrPjtr.jpg";
        } else if (detailName.includes('Online') || detailName.includes('NPTEL Dashboard') || detailName.includes('Website')) {
            iconUrl = "https://i.pinimg.com/564x/4b/b0/37/4bb037397915f5efa68fdd79b604b822.jpg";
        } else if (detailName === 'Tutorials') {
            iconUrl = "https://ift.world/wp-content/uploads/2017/01/wsi-imageoptim-q-bank-300x300.png";
        } else if (detailName === 'Labs') {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/2393/2393574.png";
        } else if (detailName.includes('Study Material') && !detailName.includes('Online')) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/1089/1089109.png";
        } else if (detailName.includes('Project') || detailName.includes('Literature Survey Folder')) {
            iconUrl = "https://static-00.iconduck.com/assets.00/folder-icon-256x204-0171zqe6.png";
        } else if (detailName === 'Class Notebook') {
            iconUrl = "https://static.vecteezy.com/system/resources/previews/027/179/341/original/microsoft-one-note-icon-logo-symbol-free-png.png";
        } else if (detailName === 'Evaluation Sheet') {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/5361/5361284.png";
        } else if (detailName.includes('ppt')) {
            iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsdPmt20JSFqweGX13Ib7KM5xbeWFqXCfuog&s";
        } else if (detailName.includes('About Course')) {
            iconUrl = "https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_1280.png";
        } else if (detailName === 'Videos') {
            iconUrl = "https://cdn-icons-png.freepik.com/256/1324/1324244.png?semt=ais_hybrid";
        } else {
            iconUrl = "https://i.pinimg.com/originals/c0/f6/c9/c0f6c97d6669e7bfb41727e884aeb801.png"; // Default icon
        }

        // Add the icon and detail name
        detailDiv.innerHTML = `
            <img src="${iconUrl}" alt="${detailName}" class="detail-icon" />
            <p>${detailName}</p>
        `;
        detailDiv.addEventListener('click', () => showDetailContent(detailName, subject.details[detailName]));

        detailsContainer.appendChild(detailDiv);
    });

    // Add breadcrumb and content to the course container
    subjectContent.appendChild(detailsContainer);
    courseContainer.appendChild(breadcrumbNav);
    courseContainer.appendChild(subjectContent);
}// Function to display the content of a specific detail
function showDetailContent(detailName, detailValues) {
    const subjectContent = document.querySelector('#subject-content');
    subjectContent.style.marginLeft = '20px';
    const breadcrumbNav = document.querySelector('#breadcrumb-nav');
    breadcrumbNav.style.marginLeft = '20px';

    if (typeof detailValues === 'object' && detailValues !== null) {
        // Check if it's a simple object with a single URL
        const keys = Object.keys(detailValues);
        if (keys.length === 1 && typeof detailValues[keys[0]] === 'string' && detailValues[keys[0]].includes('http')) {
            // Directly open the URL
            window.open(detailValues[keys[0]], '_blank');
            return; // Exit function after opening the URL
        }
    }

    // Update breadcrumb navigation
    breadcrumbNav.innerHTML = `
        <a href="#" id="course-link">Course</a> > 
        <a href="#" id="subject-link">${breadcrumbNav.querySelector('#subject-link')?.textContent || ''}</a> > 
        ${detailName}
    `;

    // Add event listeners to the breadcrumb links
    breadcrumbNav.querySelector('#course-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#subject-content').remove();
        document.querySelector('#breadcrumb-nav').remove();
        document.querySelector('.subject-list').style.display = 'flex';
        document.getElementById("rmvbutton").style.display = "";
        document.getElementById("addbutton").style.display = "";
        document.getElementById("semester-selection").style.display = "";
    });

    breadcrumbNav.querySelector('#subject-link').addEventListener('click', (e) => {
        e.preventDefault();
        const subjectName = breadcrumbNav.querySelector('#subject-link').textContent;
        showSubjectContent(courseData.semesters
            .flatMap(sem => sem.subjects)
            .find(sub => sub.name === subjectName));
    });

    // Clear existing subject content
    subjectContent.innerHTML = `<h2>${detailName}</h2>`;

    // Create container for details
    const detailContent = document.createElement('div');
    detailContent.classList.add('detail-content');
    detailContent.style.marginLeft = '20px';

    // Create a container for the items
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('container');
    detailContent.appendChild(itemsContainer);
    
    // Add note if the section is "Videos"
    if (detailName === "Videos") {
        const note = document.createElement('div');
        note.classList.add('video-note');
        note.innerHTML = `
            <p><strong>Note:</strong> The study videos here may miss or cover an extra topic, so it is advised to have a look over the syllabus and notes as well.</p>
        `;
        detailContent.appendChild(note);
    } else if (detailName === "Syllabus") {
        const note = document.createElement('div');
        note.classList.add('video-note');
        note.innerHTML = `
            <p><strong>Note:</strong> The syllabus here may miss or cover an extra topic, so it is advised to have a look over the notes as well.</p>
        `;
        detailContent.appendChild(note);
    }

    if (typeof detailValues === 'string') {
        // If detailValues is a string, display it directly    
        detailValues = detailValues.replace(/\/bold (.*?) bold\//g, "<strong>$1</strong>");
        // Replace '\\n' with actual new line characters
        detailValues = detailValues.replace(/\\n/g, '<br>');

        // Replace URLs with clickable links
        detailValues = detailValues.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        detailContent.innerHTML += `<p>${detailValues}</p>`;
    } else if (typeof detailValues === 'object' && detailValues !== null) {
        // Apply styles directly
        const style = document.createElement('style');
        style.textContent = `
            .detail-content {
                display: flex;
                flex-direction: column;
                margin: 20px;
            }
            .container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center; /* Center items horizontally */
                width: 100%;
                max-width: 1200px; /* Max width for the container */
            }
            .item-container {
                flex: 1 1 calc(25% - 20px); /* Responsive width */
                max-width: calc(25% - 20px); /* Prevent overflow */
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 15px;
                background-color: #fafafa;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s, box-shadow 0.3s;
                box-sizing: border-box; /* Include padding and border in element's total width */
            }
            .item-container h3 {
                margin-top: 0;
                font-size: 1.2em;
                color: #333;
            }
            .item-container a {
                display: inline-block;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
                border: 2px solid #007bff;
                border-radius: 5px;
                padding: 8px 12px;
                transition: background-color 0.3s, color 0.3s, border-color 0.3s;
                font-size: 1em;
            }
            .item-container a:hover {
                background-color: #007bff;
                color: white;
                border-color: #0056b3;
            }
            .item-container:hover {
                background-color: #e9ecef;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }
            @media (max-width: 768px) {
                .item-container {
                    flex: 1 1 calc(50% - 20px); /* Two items per row on medium screens */
                    max-width: calc(50% - 20px);
                }
            }
            @media (max-width: 480px) {
                .item-container {
                    flex: 1 1 calc(100% - 20px); /* Full width on small screens */
                    max-width: calc(100% - 20px);
                }
            }
            .video-container {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start; /* Aligns content to the left */
    padding-left: 20px; /* Adds space to the left side */
    padding-right: 20px; /* Adds space to the right side */
}

.video-item {
    width: 4500px; /* Makes the video smaller */
    height: 225px;
    display: flex;
    align-items: flex-start; /* Aligns video and text on the same vertical line */
    margin-bottom: 20px; /* Adds space between video items */
}

.video-item iframe {
    width: 400px;  /* Larger width */
    height: 225px; /* Adjust the height for aspect ratio */
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


.video-info {
    margin-left: 20px; /* Adds space between the video and the text */
    text-align: left; /* Aligns text to the left */
}

.video-info .video-title {
    font-size: 1.6em;
    font-weight: bold;
    color: #333;
}

.video-info .video-description {
    margin-top: 10px;
    font-size: 1.2em;
    color: #555;
}

        `;
        document.head.appendChild(style);

        // If detailValues is an object, iterate over its properties
        for (const key in detailValues) {
            if (detailValues.hasOwnProperty(key)) {
                const value = detailValues[key];
                if(typeof value === 'string' && value.includes('youtube.com/embed/')) {
                    const [title, description] = key.split('/desc');
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `
                    <div class="video-item">
                        <iframe src="${value}" allowfullscreen></iframe>
                        <div class="video-info">
                            <div class="video-title">
                                <a href="${value.replace('/embed/videoseries', '/playlist')}" target="_blank" rel="noopener noreferrer" style="color: #1e90ff; text-decoration: none;">
                                    ${title.trim()}
                                </a>
                            </div>
                            ${description ? `<div class="video-description">${description.trim()}</div>` : ''}
                        </div>
                    </div>
                    `;
                    detailContent.appendChild(videoContainer);
                } else if(typeof value === 'string') {
                    // Display as a link for non-YouTube content
                    const itemContainer = document.createElement('div');
                    itemContainer.classList.add('item-container');
                    itemContainer.innerHTML = `
                        <h3>${key}</h3>
                        <a href="${value}" target="_blank">Open Link</a>
                    `;
                    itemsContainer.appendChild(itemContainer);
                } else if (typeof value === 'object' && value.file) {
                    // Display files from the "file" property
                    if (value.file.includes('youtube.com/embed/')) {
                        const [title, description] = key.split('/desc');
                        const videoContainer = document.createElement('div');
                        videoContainer.classList.add('video-container');
                        videoContainer.innerHTML = `
                            <iframe src="${value.file}" allowfullscreen></iframe>
                            <div class="video-info">
                                <div class="video-title">
                                    <a href="${value.replace('/embed/videoseries', '/playlist')}" target="_blank" rel="noopener noreferrer" style="color: #1e90ff; text-decoration: none;">
                                        ${title.trim()}
                                    </a>
                                </div>
                                ${description ? `<div class="video-description">${description.trim()}</div>` : ''}
                            </div>

                        `;
                        detailContent.appendChild(videoContainer);
                    } else {
                        const itemContainer = document.createElement('div');
                        itemContainer.classList.add('item-container');
                        itemContainer.innerHTML = `
                            <h3>${key}</h3>
                            <a href=${value.file} target="_blank" rel="noopener noreferrer">
            ${title.trim()}
        </a>
                        `;
                        itemsContainer.appendChild(itemContainer);
                    }
                }
            }
        }
    } else {
        // In case of unexpected detailValues type
        detailContent.innerHTML += `<p>Unexpected content type: ${typeof detailValues}</p>`;
    }

    subjectContent.appendChild(detailContent);
}
