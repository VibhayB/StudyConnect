function populateForms(forms) {
    const formsContainer = document.getElementById('forms');

    // Apply styles using JavaScript
    formsContainer.style.display = 'flex';
    formsContainer.style.flexDirection = 'row'; // Arrange items in a row
    formsContainer.style.justifyContent = 'center'; // Center items horizontally
    formsContainer.style.alignItems = 'center'; // Center items vertically
    formsContainer.style.flexWrap = 'wrap'; // Allow wrapping of items
    formsContainer.style.gap = '20px'; // Space between items
    formsContainer.style.padding = '20px';
    formsContainer.style.maxWidth = '100%';
    formsContainer.style.boxSizing = 'border-box';
    formsContainer.style.backgroundColor = '#f9f9f9';
    formsContainer.style.borderRadius = '8px';
    formsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    // Clear existing content
    formsContainer.innerHTML = '';

    // Create and append new form items
    forms.forEach(form => {
        const formItem = document.createElement('div');
        formItem.style.display = 'flex';
        formItem.style.flexDirection = 'column';
        formItem.style.alignItems = 'center';
        formItem.style.justifyContent = 'center';
        formItem.style.position = 'relative';
        formItem.style.width = '200px';
        formItem.style.height = '100px';
        formItem.style.background = '#ffffff';
        formItem.style.borderRadius = '8px';
        formItem.style.overflow = 'hidden';
        formItem.style.border = '1px solid #ddd';
        formItem.style.cursor = 'pointer';
        formItem.style.transition = 'transform 0.3s, box-shadow 0.3s';
        formItem.style.boxSizing = 'border-box';
        formItem.style.textAlign = 'center';
        formItem.style.padding = '10px';

        formItem.onmouseover = () => {
            formItem.style.transform = 'scale(1.05)';
            formItem.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        };
        formItem.onmouseout = () => {
            formItem.style.transform = 'scale(1)';
            formItem.style.boxShadow = 'none';
        };

        const link = document.createElement('a');
        link.href = form.url;
        link.target = '_blank';
        link.style.textDecoration = 'none';
        link.style.color = '#333';
        link.style.display = 'flex';
        link.style.alignItems = 'center'; // Center text vertically
        link.style.justifyContent = 'center'; // Center text horizontally
        link.style.height = '100%';
        link.style.width = '100%';

        const name = document.createElement('p');
        name.textContent = form.name;
        name.style.margin = '0';
        name.style.fontSize = '14px';
        name.style.fontWeight = 'bold';
        name.style.textAlign = 'center'; // Center text within the paragraph

        link.appendChild(name);
        formItem.appendChild(link);

        formsContainer.appendChild(formItem);
    });
}
