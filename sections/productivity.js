// Function to hide the spinner and show the iframe after loading
function hideSpinner(iframe) {
    const spinner = iframe.previousElementSibling;
    spinner.style.display = 'none';  // Hide spinner
    iframe.style.display = 'block';  // Show iframe
}

function showSpinner(iframe) {
    const spinner = iframe.previousElementSibling;
    spinner.style.display = 'block';  // Show spinner
    iframe.style.display = 'none';    // Hide iframe
}

function populateProductivity(data,fxc = false) {
    let quizContent = { 
        id: "quiz",
        title: "Quiz",
        description: "Test your skills with this quiz",
        icon: "https://cdn-icons-png.flaticon.com/512/10292/10292284.png",
        src: 'data:text/html;charset=utf-8,' + encodeURIComponent(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Quiz</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background: linear-gradient(to bottom right, #2c3e50, #34495e);
                        color: #ecf0f1; /* Light color for text */
                    }
                    h1 {
                        text-align: center;
                        color: #ecf0f1;
                    }
                    .question {
                        margin: 20px 0;
                        font-size: 1.5em;
                        font-weight: bold;
                    }
                    .options {
                        margin: 10px 0;
                    }
                    .option-btn {
                        width: calc(100% - 10px); /* Set width to fill the container minus margins */
                        margin: 5px 0;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        background-color: #3498db;
                        color: white;
                        font-size: 1em;
                        cursor: pointer;
                        transition: background-color 0.3s, transform 0.2s;
                        box-sizing: border-box; /* Ensure padding is included in width */
                    }
                    .option-btn:hover {
                        background-color: #2980b9;
                        transform: scale(1.05);
                    }
                    .option-btn.correct {
                        background-color: #2ecc71; /* Green for correct answers */
                    }
                    .option-btn.wrong {
                        background-color: #e74c3c; /* Red for wrong answers */
                    }
                    #score {
                        font-size: 1.2em;
                        text-align: center;
                    }
                    #play-btn {
                        padding: 10px 20px;
                        background-color: #2ecc71;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 1.2em;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        margin-bottom: 20px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    #play-btn:hover {
                        background-color: #27ae60;
                    }
                    #replay-btn {
                        padding: 10px 20px;
                        background-color: #3498db;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 1.2em;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        display: none;
                        margin: 20px auto;
                        text-align: center;
                    }
                    #replay-btn:hover {
                        background-color: #2980b9;
                    }
                    #meter {
    position: relative; /* Positioning context */
    height: 20px;
    width: 100%; /* Ensures the meter spans across the full width */
    border-radius: 10px;
    overflow: hidden;
    font-size: 1.2em;
    text-align: center;
    background-color: #1a1a1a; /* Dark gray background (not pure black) */
    margin: 10px 0;
    padding: 10px;
    color: white; /* For better contrast */
    box-sizing: border-box; /* Ensures padding doesn't affect width */
}

#time-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(0, 255, 0); /* Starting color (green) */
    z-index: 1; /* Ensure it's on top */
}

                </style>
            </head>
            <body>
                <h1 id="heading">Welcome to the Quiz!</h1>
                <button id="play-btn">Play Quiz</button>
                <div id="score" style="display: none;">Score: 0</div>
                <div id="meter" style="display: none;">
                    <div id="time-left"></div>
                </div>
                <div id="quiz-container" style="display: none;"></div>
                <button id="replay-btn" onclick="replayQuiz()">Replay Quiz</button>
                <script>
                    let currentQuestionIndex = 0;
                    let questions = [];
                    let score = 0;
                    let timePerQuestion = 25; // 25 seconds for each question
                    let timeLeft;
                    let interval;
                    let triedsxchv = ${localStorage.getItem("musexet")} || 60; // Get from localStorage or default to 60
                    const currentDate = new Date().setHours(0, 0, 0, 0); // Get today's date (midnight) in milliseconds

                    if (!isNaN(triedsxchv)) {
                        triedsxchv = Number(triedsxchv);
                        if (triedsxchv === 30) {
                            console.log("triedsxchv is 30");
                        } else {
                            // Handle other number values
                            console.log("triedsxchv is a number:", triedsxchv);
                        }
                    } else if (triedsxchv == currentDate) {
                        // Reset to 0 if the stored date matches today
                        triedsxchv = 0;
                    } else if (triedsxchv < currentDate) {
                        // If it's a previous date, reset to 60 and update localStorage with today's date
                        triedsxchv = 60;
                        localStorage.setItem("musexet", currentDate);
                    }

    
                    function fetchQuestions() {
                        triedsxchv -= 10;
                        fetch('https://quizapi.io/api/v1/questions?apiKey=${fxc}&limit=10')
                            .then(response => response.json())
                            .then(data => {
                                questions = data.map(question => ({
                                    question: question.question,
                                    options: Object.values(question.answers).filter(answer => answer !== null),
                                    correctAnswerIndex: Object.values(question.correct_answers).indexOf("true")
                                })).filter(q => q.options.length >= 2); // Ensure at least 2 options exist
                                
                                displayQuestion();
                            })
                            .catch(error => console.error('Error fetching questions:', error));
                    }
    
                    function displayQuestion() {
                        const quizContainer = document.getElementById('quiz-container');
                        const scoreDisplay = document.getElementById('score');
                        const meterDisplay = document.getElementById('meter');
                        const timeLeftDisplay = document.getElementById('time-left');
    
                        scoreDisplay.innerHTML = 'Score: ' + score;
    
                        if (currentQuestionIndex < questions.length) {
                            const question = questions[currentQuestionIndex];
                            quizContainer.innerHTML = \`
                                <div class="question">\${question.question}</div>
                                <div class="options">
                                    \${question.options.map((option, index) => \`
                                        <button class="option-btn" onclick="checkAnswer(\${index})">\${option}</button>
                                    \`).join('')}
                                </div>
                            \`;
                            timeLeft = timePerQuestion;
                            timeLeftDisplay.style.width = '100%';
                            meterDisplay.style.display = 'block';
                            scoreDisplay.style.display = 'block';
                            quizContainer.style.display = 'block';
                            startColorTransition();
                        } else {
                            endQuiz();
                        }
                    }
                    // This function calculates the color based on the percentage value
function calculateColor(percentage) {
    let color;
    // Ensure percentage is clamped between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    if (percentage >= 66) {
        // From green (0, 255, 0) to yellow (255, 255, 0)
        const fraction = (100 - percentage) / 34; // Normalized value (0 to 1)
        const yellowValue = Math.round(255 * fraction); // yellow increases to 255red 255green
        color = \`rgb(\${yellowValue}, 255, 0)\`; // Transition to Yellow
    } else if (percentage >= 33) {
        // From yellow (255, 255, 0) to orange (255, 165, 0)
        const fraction = (66 - percentage) / 33; // Normalized value (0 to 1)
        const greenValue = 165 + Math.round(90 * (1 - fraction)); // Green decreases to 165
        color = \`rgb(255, \${greenValue}, 0)\`; // Transition to Orange
    } else {
        // From orange (255, 165, 0) to red (255, 0, 0)
        const fraction = (33 - percentage) / 33; // Normalized value (0 to 1)
        const greenValue = Math.round(165 * (1 - fraction)); // Green decreases to 0
        color = \`rgb(255, \${greenValue}, 0)\`; // Transition to Red
    }
    console.log(percentage,color);
    return color;
}


                    function startColorTransition() {
                    let qno = currentQuestionIndex + 1;
                    document.getElementById('heading').innerHTML = 'Question ' + qno + ' of 10';
    const timeLeftDisplay = document.getElementById('time-left');
    timeLeft = timePerQuestion; // Reset time left for each question
    timeLeftDisplay.style.width = '100%'; // Set initial width to 100%
    timeLeftDisplay.style.backgroundColor = calculateColor(100); // Start color as green

    clearInterval(interval); // Clear any existing interval
    const endTime = Date.now() + (timePerQuestion * 1000);
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft = 0.001*(endTime - Date.now());
            const percentage = (timeLeft / timePerQuestion) * 100;

            // Set the width based on the percentage
            timeLeftDisplay.style.width = \`\${percentage}%\`;

            // Smooth color transition
            const color = calculateColor(percentage);
            timeLeftDisplay.style.backgroundColor = color;

        } else {
            clearInterval(interval); // Stop the timer when it reaches 0
            timeLeftDisplay.style.width = '0%'; // Ensure width reflects completion
        }
    }, 50); // Update every 50ms
}
    
                    function checkAnswer(selectedIndex) {
                        const question = questions[currentQuestionIndex];
                        const buttons = document.querySelectorAll('.options button');
    
                        // Check if the answer is correct and style buttons accordingly
                        buttons.forEach((button, index) => {
                            if (index === question.correctAnswerIndex) {
                                button.classList.add('correct');
                            } else if (index === selectedIndex) {
                                button.classList.add('wrong');
                            }
                        });
    
                        // Scoring logic based on time left
                        let timeScore = 0;
                        const percentageLeft = (timeLeft / timePerQuestion);
                        if (percentageLeft > 0.75) {
                            timeScore = 5; // 100-75%
                        } else if (percentageLeft > 0.5) {
                            timeScore = 4; // 75-50%
                        } else if (percentageLeft > 0.25) {
                            timeScore = 3; // 50-25%
                        } else if (percentageLeft > 0) {
                            timeScore = 2; // 25-0%
                        } else {
                            timeScore = 1; // Answering after time passage
                        }
    
                        if (selectedIndex === question.correctAnswerIndex) {
                            score += timeScore; // Add calculated score based on time left
                        }
    
                        currentQuestionIndex++;
                        setTimeout(displayQuestion, 1000); // Wait 1 second before showing the next question
                    }
    
                    function endQuiz() {
                        document.getElementById('meter').style.display = 'none'; // Hide progress display
                        clearInterval(interval); // Clear interval to stop the timer
                        const currentDate = new Date().setHours(0, 0, 0, 0);
                        if(triedsxchv <= 0){
                            document.getElementById('heading').innerHTML = 'Comeback Tomorrow for more quiz'; 
                            localStorage.setItem("musexet",currentDate);
                        } else{
                            const quizContainer = document.getElementById('quiz-container');
                            quizContainer.innerHTML = '<h2>Quiz Completed!</h2>';
                            document.getElementById('heading').style.display = 'none'; 
                            document.getElementById('replay-btn').style.display = 'block'; // Show replay button
                            localStorage.setItem("musexet",triedsxchv);
                        }
                    }
    
                    function replayQuiz() {
                        if(triedsxchv <= 0){
                            return;
                        }
                        currentQuestionIndex = 0;
                        score = 0;
                        document.getElementById('replay-btn').style.display = 'none'; // Hide replay button
                        document.getElementById('quiz-container').style.display = 'none'; // Hide quiz container
                        document.getElementById('score').style.display = 'none'; // Hide score display
                        document.getElementById('meter').style.display = 'none'; // Hide progress display
                        fetchQuestions(); // Fetch questions again
                        
                        document.getElementById('heading').style.display = 'flex'; 
                    }
    
                    document.getElementById('play-btn').onclick = function() {
                        document.getElementById('play-btn').style.display = 'none';
                        fetchQuestions(); // Start fetching questions when play button is clicked
                    };
                </script>
            </body>
            </html>
        `)
    };
    
    data.push(quizContent);
    const productivityContainer = document.getElementById('productivity');

    productivityContainer.innerHTML = '';

    const tabsContainer = document.createElement('div');
    Object.assign(tabsContainer.style, {
        display: 'flex',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '20px'
    });

    const contentContainer = document.createElement('div');
    Object.assign(contentContainer.style, {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    });

    function updateContent(item, clickedButton) {
        contentContainer.innerHTML = '';

        const contentTitle = document.createElement('h2');
        contentTitle.textContent = item.title;
        contentContainer.appendChild(contentTitle);

        const contentDescription = document.createElement('p');
        contentDescription.textContent = item.description;
        contentContainer.appendChild(contentDescription);

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        Object.assign(spinner.style, {
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '20px auto',
            display: 'block'
        });

        contentContainer.appendChild(spinner);

        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = 'calc(70vh - 100px)';
        iframe.style.display = 'none';

        iframe.src = item.src;
        contentContainer.appendChild(iframe);

        showSpinner(iframe);
        iframe.onload = () => hideSpinner(iframe);

        const allTabButtons = tabsContainer.querySelectorAll('button');
        allTabButtons.forEach(btn => {
            btn.style.backgroundColor = '#fff';
        });

        clickedButton.style.backgroundColor = '#ddd';
    }

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

        tabButton.addEventListener('click', () => {
            updateContent(item, tabButton);
        });

        tabsContainer.appendChild(tabButton);
    });

    productivityContainer.appendChild(tabsContainer);
    productivityContainer.appendChild(contentContainer);

    updateContent(data[0], tabsContainer.querySelector('button'));
}

// CSS for the spinner animation
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
