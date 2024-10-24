let recognition;
let isRecording = false;

// Initialize Speech Recognition API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = false; // Don't use interim results for now
    recognition.continuous = true; // Keep recording until stopped
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let transcript = Array.from(event.results)
                              .map(result => result[0].transcript)
                              .join('');

        document.getElementById('transcript').innerText = transcript;

        // Analyze for filler words
        analyzeFillerWords(transcript);
        analyzeLogic(transcript); // Perform logic analysis
        analyzeTone(transcript); // Perform tone analysis
    };

    recognition.onend = () => {
        if (isRecording) {
            document.getElementById('status').innerText = 'Recording stopped.';
            isRecording = false;
        }
    };
} else {
    alert("Your browser does not support speech recognition.");
}

// Start recording function
document.getElementById('record-btn').addEventListener('click', () => {
    if (!isRecording) {
        recognition.start();
        document.getElementById('status').innerText = 'Recording...';
        isRecording = true;
        document.getElementById('record-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
    }
});

// Stop recording function
document.getElementById('stop-btn').addEventListener('click', () => {
    if (isRecording) {
        recognition.stop();
        document.getElementById('status').innerText = 'Processing...';
        isRecording = false;
        document.getElementById('record-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
    }
});

// Basic filler word detection
function analyzeFillerWords(transcript) {
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'so', 'actually', 'literally', 'just', 'mmm', 'er', 'ah'];
    let foundWords = fillerWords.filter(word => transcript.includes(word));

    if (foundWords.length > 0) {
        document.getElementById('filler-words').innerText = `Detected filler words: ${foundWords.join(', ')}`;
    } else {
        document.getElementById('filler-words').innerText = "No filler words detected.";
    }
}

// Basic logic analysis
function analyzeLogic(transcript) {
    // Very simple logic analysis: checking for a claim and support
    const claims = ['I believe', 'In my opinion', 'I think'];
    const supports = ['because', 'for example', 'this means'];

    const containsClaim = claims.some(claim => transcript.includes(claim));
    const containsSupport = supports.some(support => transcript.includes(support));

    if (containsClaim && containsSupport) {
        document.getElementById('logic-analysis').innerText = "The argument appears coherent.";
    } else {
        document.getElementById('logic-analysis').innerText = "The argument may need more support or clarity.";
    }
}

// Basic tone analysis
function analyzeTone(transcript) {
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'wonderful', 'love', 'amazing', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'sad', 'hate', 'awful', 'angry', 'horrible', 'disappointing'];

    const positiveCount = positiveWords.filter(word => transcript.includes(word)).length;
    const negativeCount = negativeWords.filter(word => transcript.includes(word)).length;

    if (positiveCount > negativeCount) {
        document.getElementById('tone-analysis').innerText = "The tone is generally positive.";
    } else if (negativeCount > positiveCount) {
        document.getElementById('tone-analysis').innerText = "The tone is generally negative.";
    } else {
        document.getElementById('tone-analysis').innerText = "The tone is neutral.";
    }
}
