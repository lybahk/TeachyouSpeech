const topics = {
    1: [
        "What is your favorite movie and why?",
        "Discuss a hobby you enjoy.",
        "What would you do if you won a million dollars?",
        "Share a funny childhood story.",
        "If you could travel anywhere, where would it be?",
        "What is your favorite book, and what did you learn from it?",
        "Describe a memorable vacation experience.",
        "What is your favorite food, and why do you love it?",
        "If you could have dinner with any historical figure, who would it be?",
        "What is your dream job and why?",
    ],
    2: [
        {
            topic: "Should countries prioritize climate change?",
            countries: ["USA", "China", "India", "Brazil", "Australia"]
        },
        {
            topic: "Is it ethical to intervene in a country's affairs?",
            countries: ["Russia", "Syria", "Venezuela", "Ukraine", "Yemen"]
        },
        {
            topic: "What role should the UN play in global conflicts?",
            countries: ["France", "Germany", "Egypt", "Japan", "South Africa"]
        },
        {
            topic: "How can nations work together to combat terrorism?",
            countries: ["Pakistan", "Nigeria", "Afghanistan", "Somalia", "Colombia"]
        },
        {
            topic: "Should refugees be given asylum in other countries?",
            countries: ["Lebanon", "Turkey", "Jordan", "Italy", "Germany"]
        },
        {
            topic: "Is nuclear disarmament necessary for global peace?",
            countries: ["North Korea", "Iran", "India", "Pakistan", "Israel"]
        },
        {
            topic: "What are the challenges of international trade?",
            countries: ["USA", "Mexico", "Canada", "China", "EU"]
        },
        {
            topic: "Should countries implement stricter immigration laws?",
            countries: ["Australia", "USA", "UK", "Canada", "France"]
        },
        {
            topic: "Is it fair for countries to impose sanctions?",
            countries: ["Russia", "Cuba", "Iran", "North Korea", "Venezuela"]
        },
        {
            topic: "How can countries balance national security with human rights?",
            countries: ["USA", "China", "Saudi Arabia", "Turkey", "Egypt"]
        },
    ],
    3: [
        "Is social media a positive or negative influence?",
        "Should the voting age be lowered to 16?",
        "Is a college education worth the cost?",
        "Should animals be used for scientific research?",
        "Is climate change the biggest threat to humanity?",
        "Should governments regulate the internet?",
        "Is free speech more important than protecting individuals from hate speech?",
        "Should school uniforms be mandatory?",
        "Is healthcare a right or a privilege?",
        "Should the death penalty be abolished?",
    ],
};

// Generate topic based on selected level
document.getElementById('generate-btn').addEventListener('click', () => {
    const selectedLevel = document.getElementById('level').value;
    const topicList = topics[selectedLevel];

    let randomTopic;
    if (selectedLevel == 2) {
        randomTopic = topicList[Math.floor(Math.random() * topicList.length)];
        const country = randomTopic.countries[Math.floor(Math.random() * randomTopic.countries.length)];
        document.getElementById('topic-output').innerText = `${randomTopic.topic} (e.g., ${country})`;
    } else {
        randomTopic = topicList[Math.floor(Math.random() * topicList.length)];
        document.getElementById('topic-output').innerText = randomTopic;
    }
});

// Timer functionality
document.getElementById('start-timer').addEventListener('click', () => {
    const timeInput = document.getElementById('timeInput').value;
    let time = parseInt(timeInput);

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    const timerOutput = document.getElementById('timer-output');
    timerOutput.innerText = time + " seconds remaining";

    const timerInterval = setInterval(() => {
        time--;
        timerOutput.innerText = time + " seconds remaining";

        if (time <= 0) {
            clearInterval(timerInterval);
            timerOutput.innerText = "Time's up!";
        }
    }, 1000);
});
