const games = [
    { name: "Bouncing Ball", url: "", thumbnail: "https://w7.pngwing.com/pngs/731/1016/png-transparent-crazy-bouncing-ball-game-app-store-bouncy-balls-others-game-sphere-jump-thumbnail.png", openInNewWindow: false, htmlContent: "htmlfiles/ball balancer.html" },
    { name: "Pomodoro", url: "", thumbnail: "https://st4.depositphotos.com/37073554/38209/v/450/depositphotos_382092468-stock-illustration-kitchen-timer-form-red-tomato.jpg", openInNewWindow: false, htmlContent: "htmlfiles/pomodoro.html" },
    { name: "Snake", url: "", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJHVz4Ytq3Uxj1AATP9I0jLizBzZHZX-1tg&s", openInNewWindow: false, htmlContent: "htmlfiles/snake.html" },
    { name: "2048", url: "", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2048_logo.svg/800px-2048_logo.svg.png", openInNewWindow: false, htmlContent: "htmlfiles/2048.html" },
    { name: "MineSweeper", url: "", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZTutjb5iTEx5ePulQ7Z0dXLyZZKvEVO2jTQ&s", openInNewWindow: false, htmlContent: "htmlfiles/minesweeper.html" },
    { name: "Plane Defense", url: "https://vibhayb.github.io/Plane-Defense/", thumbnail: "https://th.bing.com/th/id/OIG2.TU754WuobyvyHpwCC.qb?w=270&h=270&c=6&r=0&o=5&dpr=1.4&pid=ImgGn", openInNewWindow: true, htmlContent: null },
    { name: "OverNight Assignment", url: "https://drive.google.com/file/d/1_0dEQ-lSbm4D9qsdz87wyTxYMqnCR76n/view?usp=sharing", thumbnail: "https://firebasestorage.googleapis.com/v0/b/aiml-studyconnect.appspot.com/o/images%2FPicture1.png?alt=media&token=0bf2766a-54d1-4fcd-835b-a71cd2468c79", openInNewWindow: true, htmlContent: null }
]; 

// Function to create app items and add them to the div
function populateGames() {
    // Apply styles using JavaScript
    const appsContainer = document.getElementById('games');

    // Set styles for the container
    appsContainer.style.display = 'flex';
    appsContainer.style.flexWrap = 'wrap';
    appsContainer.style.justifyContent = 'center'; // Center items horizontally
    appsContainer.style.alignItems = 'center';     // Center items vertically
    appsContainer.style.gap = '20px';
    appsContainer.style.padding = '20px';
    appsContainer.style.maxWidth = '100%';
    appsContainer.style.boxSizing = 'border-box';
    appsContainer.style.backgroundColor = '#f9f9f9';
    appsContainer.style.borderRadius = '8px';
    appsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    
    // Clear existing content
    appsContainer.innerHTML = '';

    // Create and append new app items
    games.forEach(game => {
        const appItem = document.createElement('div');
        appItem.style.display = 'flex';
        appItem.style.flexDirection = 'column'; // Stack image and name vertically
        appItem.style.alignItems = 'center';    // Center contents horizontally
        appItem.style.justifyContent = 'center'; // Center contents vertically
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
            if (game.htmlContent) {
                fetch(game.htmlContent)
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
            } else if (game.openInNewWindow) {
                window.open(game.url, '_blank');
            }
        };

        const img = document.createElement('img');
        img.src = game.thumbnail;
        img.alt = game.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.boxSizing = 'border-box';

        const name = document.createElement('p');
        name.textContent = game.name;
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
