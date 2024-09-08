function generateCalendar() {
    const container = document.getElementById('calendar');
    container.innerHTML = "";

    // Create navigation controls
    const nav = document.createElement('div');
    nav.id = 'calendar-nav';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'space-between';
    nav.style.alignItems = 'center';
    nav.style.marginBottom = '20px';
    nav.style.maxWidth = '800px'; // Ensures navigation doesn't stretch too wide
    nav.style.margin = '0 auto'; // Centers navigation within its parent

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.style.padding = '10px 20px';
    prevButton.style.border = 'none';
    prevButton.style.backgroundColor = '#007bff';
    prevButton.style.color = 'white';
    prevButton.style.cursor = 'pointer';
    prevButton.style.borderRadius = '4px';
    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.style.padding = '10px 20px';
    nextButton.style.border = 'none';
    nextButton.style.backgroundColor = '#007bff';
    nextButton.style.color = 'white';
    nextButton.style.cursor = 'pointer';
    nextButton.style.borderRadius = '4px';
    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    const monthYearDisplay = document.createElement('div');
    monthYearDisplay.id = 'month-year';
    monthYearDisplay.style.textAlign = 'center';
    monthYearDisplay.style.fontWeight = 'bold';
    monthYearDisplay.style.flex = '1'; // Allows it to grow and center itself

    nav.appendChild(prevButton);
    nav.appendChild(monthYearDisplay);
    nav.appendChild(nextButton);

    container.appendChild(nav);

    // Create styles
    const style = document.createElement('style');
    style.textContent = `
        #calendar-container {
            display: flex;
            justify-content: center;
            padding: 20px;
        }

        #calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            max-width: 800px;
            margin: 0 auto; /* Center the calendar grid */
        }

        .day-header {
            font-weight: bold;
            text-align: center;
            margin-bottom: 5px;
        }

        .day {
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            box-sizing: border-box;
            min-height: 100px; /* Adjust height as needed */
            cursor: pointer; /* Ensure the cursor changes to indicate clickability */
        }

        .event {
            background-color: #f0f8ff;
            border-radius: 4px;
            padding: 5px;
            margin-top: 5px;
            font-size: 12px;
            color: #333;
        }

        .current-day {
            border: 2px solid orange;
            background-color: #fff4e0;
        }

        button {
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);

    // Create day headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendar = document.createElement('div');
    calendar.id = 'calendar';
    calendar.style.display = 'grid';
    calendar.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendar.style.gap = '10px';

    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Generate empty slots for days before the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day';
        calendar.appendChild(emptyDay);
    }

    // Generate the grid of days
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'day';

        const dateHeader = document.createElement('div');
        dateHeader.className = 'day-header';
        dateHeader.textContent = i;
        day.appendChild(dateHeader);

        // Highlight the current day
        if (today.getDate() === i && 
            today.getMonth() === currentDate.getMonth() && 
            today.getFullYear() === currentDate.getFullYear()) {
            day.classList.add('current-day');
        }

        // Add events for the day
        let eventDetails = "";
        let hasEvent = false;

        examSchedule.forEach(event => {
            const eventDate = new Date(event.start);
            if (eventDate.getDate() === i && eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()) {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.textContent = event.name;
                day.appendChild(eventDiv);

                // Store event details for later use
                eventDetails += `Name: ${event.name}<br>Start: ${new Date(event.start).toLocaleString()}<br>End: ${new Date(event.end).toLocaleString()}<br>Category: ${event.category}<br><br>`;
                hasEvent = true;
            }
        });

        if (hasEvent) {
            // Add click event to show alert with event details
            day.addEventListener('click', () => {
                showAlert(eventDetails,"https://cdn-icons-png.flaticon.com/512/1869/1869397.png");
            });
        }

        calendar.appendChild(day);
    }

    container.appendChild(calendar);

    // Update month and year display
    updateMonthYearDisplay();
}

function updateMonthYearDisplay() {
    const monthYearDisplay = document.getElementById('month-year');
    const options = { year: 'numeric', month: 'long' };
    monthYearDisplay.textContent = new Intl.DateTimeFormat('en-US', options).format(currentDate);
}
