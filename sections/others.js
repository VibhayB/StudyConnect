// Function to create app items and add them to the div
function populateApps() {
const examScheduleJSON = JSON.stringify(examSchedule);
// Use JSON directly in the HTML string
const timerContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timers</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    #timers-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin: 0 auto;
    }
    .timer {
      font-size: 20px;
      font-weight: bold;
      padding: 15px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 250px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 150px;
    }
    .exam-title {
      font-size: 22px;
      margin-bottom: 10px;
      color: #444;
    }
    .countdown {
      font-size: 18px;
      font-weight: normal;
      margin-top: 10px;
    }
    .ongoing {
      color: #FF0000;
      font-weight: bold;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <h1>List of Events</h1>
  <div id="timers-container"></div>
  <script>
    // Define exam schedule using JSON
    const examSchedule = ${examScheduleJSON};

    function createCountdownElement(exam) {
      const container = document.createElement('div');
      container.className = 'timer';
      const title = document.createElement('div');
      title.className = 'exam-title';
      title.innerText = exam.name;
      container.appendChild(title);
      const status = document.createElement('div');
      status.className = 'countdown';
      container.appendChild(status);
      return { container, status };
    }

    function updateCountdown(exam, countdownElement) {
      const now = new Date();
      const startDate = new Date(exam.start);
      const endDate = new Date(exam.end);
      if (now < startDate) {
        const timeLeft = startDate - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        let countdownText = '';
        if (days > 0) countdownText += \`\${days}d \`;
        if (hours > 0 || days > 0) countdownText += \`\${hours}h \`;
        if (minutes > 0 || hours > 0 || days > 0) countdownText += \`\${minutes}m \`;
        countdownText += \`\${seconds}s\`;
        countdownElement.innerText = \`Starts in \${countdownText.trim()}\`;
        countdownElement.style.color = getCountdownColor(days, hours, minutes, seconds);
      } else if (now >= startDate && now <= endDate) {
        countdownElement.innerText = 'Ongoing';
        countdownElement.className = 'countdown ongoing';
      } else {
        countdownElement.parentElement.classList.add('hidden');
      }
    }

    function getCountdownColor(days, hours, minutes, seconds) {
      if (days >= 365) return '#8A2BE2';
      if (days >= 30) return '#4B0082';
      if (days >= 7) return '#0000FF';
      if (days >= 1) return '#008000';
      if (hours >= 1) return '#CCCC00';
      if (minutes >= 1) return '#FFA500';
      return '#FF0000';
    }

    function initializeTimers() {
      const container = document.getElementById('timers-container');
      const countdownElements = [];
      examSchedule.forEach(exam => {
        const { container: timerContainer, status } = createCountdownElement(exam);
        container.appendChild(timerContainer);
        countdownElements.push({ exam, status });
      });
      countdownElements.forEach(({ exam, status }) => updateCountdown(exam, status));
      setInterval(() => {
        countdownElements.forEach(({ exam, status }) => updateCountdown(exam, status));
      }, 1000);
    }

        window.onload = initializeTimers;
      </script>
    </body>
    </html>
    `;
  for(let app of applist){
    if(app.name === "Timers"){
      app.htmlContent = timerContent;
    }
  }
  
  // Apply styles using JavaScript
const appsContainer = document.getElementById('others');

// Set styles for the container
appsContainer.style.display = 'none';
appsContainer.style.flexWrap = 'wrap';
appsContainer.style.gap = '20px';
appsContainer.style.padding = '20px';
appsContainer.style.maxWidth = '100%';
appsContainer.style.boxSizing = 'border-box';
appsContainer.style.backgroundColor = '#f9f9f9';
appsContainer.style.borderRadius = '8px';
appsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
appsContainer.style.justifyContent = 'center';
appsContainer.style.alignItems  = 'center';
    // Clear existing content
    appsContainer.innerHTML = '';

    // Create and append new app items
    applist.forEach(app => {
        const appItem = document.createElement('div');
        appItem.style.display = 'flex';
        appItem.style.alignItems = 'center';
        appItem.style.justifyContent = 'center';
        appItem.style.position = 'relative';
        appItem.style.width = '150px';
        appItem.style.height = '150px';
        appItem.style.background = '#ffffff';
        appItem.style.borderRadius = '8px';
        appItem.style.overflow = 'hidden';
        appItem.style.border = '1px solid #ddd';
        appItem.style.cursor = 'pointer';
        appItem.style.transition = 'transform 0.3s, box-shadow 0.3s';
        appItem.style.boxSizing = 'border-box';
        
        appItem.onmouseover = () => {
            appItem.style.transform = 'scale(1.05)';
            appItem.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        };
        appItem.onmouseout = () => {
            appItem.style.transform = 'scale(1)';
            appItem.style.boxShadow = 'none';
        };

        appItem.onclick = () => {
            if(app.name == "Timers"){
                            // Create a Blob object with the HTML content
                const blob = new Blob([timerContent], { type: 'text/html' });

                // Generate a URL for the Blob
                const url = URL.createObjectURL(blob);

                // Open the Blob URL in a new window
                window.open(url, '_blank');
            }
            else if (app.htmlContent) {
                fetch(app.htmlContent)
                .then(response => response.text())
                .then(htmlContent => {
                    // Create a Blob object with the HTML content
                    const blob = new Blob([htmlContent], { type: 'text/html' });

                    // Generate a URL for the Blob
                    const url = URL.createObjectURL(blob);

                    // Open the Blob URL in a new window
                    window.open(url, '_blank');

                    // Optionally, revoke the Blob URL after some time to free up resources
                    setTimeout(() => URL.revokeObjectURL(url), 10000);
                })
                .catch(error => {
                    console.error('Error opening HTML file:', error);
                });
            } else if (app.openInNewWindow) {
                window.open(app.url, '_blank');
            }
        };

        const img = document.createElement('img');
        img.src = app.thumbnail;
        img.alt = app.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.boxSizing = 'border-box';

        const name = document.createElement('p');
        name.textContent = app.name;
        name.style.position = 'absolute';
        name.style.bottom = '0';
        name.style.left = '0';
        name.style.right = '0';
        name.style.background = 'rgba(0, 0, 0, 0.7)';
        name.style.color = '#fff';
        name.style.padding = '6px 8px';
        name.style.textAlign = 'center';
        name.style.margin = '0';
        name.style.fontSize = '14px';
        name.style.fontWeight = 'bold';
        name.style.boxSizing = 'border-box';

        appItem.appendChild(img);
        appItem.appendChild(name);

        appsContainer.appendChild(appItem);
    });
}
