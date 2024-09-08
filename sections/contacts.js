function populateContacts(contacts) {
    // Dynamically include Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(link);
    }

    const contactsContainer = document.getElementById('contacts');

    // Set styles for the container
    contactsContainer.style.display = 'none';
    contactsContainer.style.flexWrap = 'wrap';
    contactsContainer.style.gap = '20px';
    contactsContainer.style.padding = '20px';
    contactsContainer.style.maxWidth = '100%';
    contactsContainer.style.boxSizing = 'border-box';
    contactsContainer.style.backgroundColor = '#f9f9f9';
    contactsContainer.style.borderRadius = '8px';
    contactsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    contactsContainer.style.justifyContent = 'center'; // Center items horizontally
    contactsContainer.style.alignItems = 'center'; // Center items vertically

    // Clear existing content
    contactsContainer.innerHTML = '';

    // Create and append new contact items
    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.style.display = 'flex';
        contactItem.style.flexDirection = 'column';
        contactItem.style.alignItems = 'center';
        contactItem.style.width = '200px';
        contactItem.style.padding = '10px';
        contactItem.style.background = '#ffffff';
        contactItem.style.borderRadius = '8px';
        contactItem.style.border = '1px solid #ddd';
        contactItem.style.boxSizing = 'border-box';
        contactItem.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

        // Name
        const name = document.createElement('h4');
        name.textContent = contact.name;
        name.style.fontSize = '16px';
        name.style.fontWeight = 'bold';
        name.style.margin = '0 0 10px 0';
        name.style.color = '#333';

        // Staff Room
        const staffRoom = document.createElement('p');
        staffRoom.textContent = `Room: ${contact.room}`;
        staffRoom.style.fontSize = '14px';
        staffRoom.style.color = '#333';
        staffRoom.style.marginTop = '10px';
        staffRoom.style.marginBottom = '10px';

        // Create a container for buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';  // Space between buttons
        buttonContainer.style.justifyContent = 'center'; // Center buttons horizontally
        // Call button with icon
        const callButton = document.createElement('button');
        callButton.innerHTML = '<i class="fas fa-phone-alt"></i>';
        callButton.style.padding = '10px';
        callButton.style.width = '40px';
        callButton.style.height = '40px';
        callButton.style.border = 'none';
        callButton.style.borderRadius = '50%';
        callButton.style.backgroundColor = '#4CAF50';
        callButton.style.color = '#fff';
        callButton.style.cursor = 'pointer';
        callButton.style.display = 'flex';
        callButton.style.alignItems = 'center';
        callButton.style.justifyContent = 'center';
        callButton.style.fontSize = '16px';
        callButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

        callButton.onclick = () => {
            window.location.href = `tel:${contact.phone}`;
        };

        // Email button with icon
        const emailButton = document.createElement('button');
        emailButton.innerHTML = '<i class="fas fa-envelope"></i>';
        emailButton.style.padding = '10px';
        emailButton.style.width = '40px';
        emailButton.style.height = '40px';
        emailButton.style.border = 'none';
        emailButton.style.borderRadius = '50%';
        emailButton.style.backgroundColor = '#008CBA';
        emailButton.style.color = '#fff';
        emailButton.style.cursor = 'pointer';
        emailButton.style.display = 'flex';
        emailButton.style.alignItems = 'center';
        emailButton.style.justifyContent = 'center';
        emailButton.style.fontSize = '16px';
        emailButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

        emailButton.onclick = () => {
            window.location.href = `mailto:${contact.email}`;
        };

        buttonContainer.appendChild(callButton);
        buttonContainer.appendChild(emailButton);

        contactItem.appendChild(name);  // Append the name element
        contactItem.appendChild(staffRoom);
        contactItem.appendChild(buttonContainer); // Append the button container

        contactsContainer.appendChild(contactItem);
    });
}
