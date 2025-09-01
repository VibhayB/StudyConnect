function generateCalendar() {
    const container = document.getElementById('calendar');
    container.innerHTML = "";

    // Create navigation controls
    // Create navigation controls
const nav = document.createElement('div');
nav.id = 'calendar-nav';
nav.style.display = 'flex';
nav.style.justifyContent = 'space-between';
nav.style.alignItems = 'center';
nav.style.marginBottom = '16px';
nav.style.width = '100%';
nav.style.maxWidth = 'min(900px, 90vw)';
nav.style.margin = '0 auto 16px auto'; // Ensure bottom margin is preserved
nav.style.padding = '12px';
nav.style.background = 'linear-gradient(135deg, #3b82f6, #1e3a8a)';
nav.style.borderRadius = '10px';
nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
nav.style.position = 'relative'; // Ensure it's not being positioned absolute
nav.style.zIndex = '10'; // Ensure it's above other elements

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.style.padding = '8px 16px';
    prevButton.style.border = 'none';
    prevButton.style.background = 'linear-gradient(45deg, #f97316, #ef4444)';
    prevButton.style.color = 'white';
    prevButton.style.cursor = 'pointer';
    prevButton.style.borderRadius = '6px';
    prevButton.style.fontWeight = '600';
    prevButton.style.fontSize = '0.9rem';
    prevButton.style.transition = 'transform 0.2s, box-shadow 0.2s';
    prevButton.addEventListener('mouseover', () => {
        prevButton.style.transform = 'translateY(-2px)';
        prevButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    prevButton.addEventListener('mouseout', () => {
        prevButton.style.transform = 'translateY(0)';
        prevButton.style.boxShadow = 'none';
    });
    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.style.padding = '8px 16px';
    nextButton.style.border = 'none';
    nextButton.style.background = 'linear-gradient(45deg, #f97316, #ef4444)';
    nextButton.style.color = 'white';
    nextButton.style.cursor = 'pointer';
    nextButton.style.borderRadius = '6px';
    nextButton.style.fontWeight = '600';
    nextButton.style.fontSize = '0.9rem';
    nextButton.style.transition = 'transform 0.2s, box-shadow 0.2s';
    nextButton.addEventListener('mouseover', () => {
        nextButton.style.transform = 'translateY(-2px)';
        nextButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    nextButton.addEventListener('mouseout', () => {
        nextButton.style.transform = 'translateY(0)';
        nextButton.style.boxShadow = 'none';
    });
    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    const monthYearDisplay = document.createElement('div');
    monthYearDisplay.id = 'month-year';
    monthYearDisplay.style.textAlign = 'center';
    monthYearDisplay.style.fontWeight = '700';
    monthYearDisplay.style.color = 'white';
    monthYearDisplay.style.fontSize = '1.2rem';
    monthYearDisplay.style.flex = '1';
    monthYearDisplay.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';

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
        padding: 20px 10px; /* Reduce horizontal padding on mobile */
        background: linear-gradient(to bottom right, #e0f2fe, #bfdbfe);
        min-height: 100vh;
        box-sizing: border-box;
    }

    #calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        width: 100%;
        max-width: min(900px, 90vw);
        margin: 0 auto;
        background: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

        .day-header {
            font-weight: 600;
            text-align: center;
            color: #1f2937;
            font-size: 0.9rem;
            margin-bottom: 6px;
            text-transform: uppercase;
        }

        .day {
            display: flex;
            flex-direction: column;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 8px;
            box-sizing: border-box;
            min-height: 100px;
            cursor: pointer;
            background: #f9fafb;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .day:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .event {
            background: linear-gradient(90deg, #60a5fa, #93c5fd);
            border-radius: 4px;
            padding: 4px;
            margin-top: 4px;
            font-size: 0.8rem;
            color: #1e3a8a;
            font-weight: 500;
            transition: background 0.2s ease;
        }

        .event:hover {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
            color: white;
        }

        .current-day {
            border: 2px solid #f59e0b;
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 600px) {
        #calendar-container {
            padding: 10px 5px; /* Further reduce padding on small screens */
        }
            #calendar-nav {
            margin: 10px auto 16px auto !important;
            padding: 10px !important;
            max-width: 95vw !important;
            box-sizing: border-box;
        }
            #calendar {
            gap: 6px;
            padding: 12px;
            max-width: 95vw; /* Ensure it doesn't overflow */
        }

        .day {
            min-height: 80px;
            padding: 6px;
        }

        .day-header {
            font-size: 0.8rem;
        }

            .event {
            font-size: 0.7rem;
            padding: 3px;
        }

           #month-year {
            font-size: 1rem !important;
        }

            button {
            padding: 6px 12px !important;
            font-size: 0.8rem !important;
        }
        }

        @media (max-width: 400px) {
        #calendar-container {
            padding: 5px;
        }
        
        #calendar-nav {
            padding: 8px !important;
            margin: 5px auto 12px auto !important;
        }
        
        #calendar {
            gap: 4px;
            padding: 8px;
            max-width: 98vw;
        }

        .day {
            min-height: 60px;
            padding: 4px;
        }

        .day-header {
            font-size: 0.7rem;
        }

        .event {
            font-size: 0.6rem;
            padding: 2px;
        }
        
        #month-year {
            font-size: 0.9rem !important;
        }
        
        button {
            padding: 4px 8px !important;
            font-size: 0.7rem !important;
        }
    }
    `;
    document.head.appendChild(style);

    // Create day headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendar = document.createElement('div');
    calendar.id = 'calendar';
    calendar.style.display = 'grid';
    calendar.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendar.style.gap = '8px';

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
        emptyDay.style.background = '#e5e7eb';
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
        dateHeader.style.color = '#111827';
        dateHeader.style.fontWeight = '600';
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
                showAlert(eventDetails, "https://cdn-icons-png.flaticon.com/512/1869/1869397.png");
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
