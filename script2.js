let flame = document.querySelector('.flame');
let startButton = document.getElementById('start');
let audioContext;
let analyser;
let microphone;
let dataArray;

// Set a threshold for the sound level (this may need tweaking)
const soundThreshold = 100;

// Variable to track if the flame is currently off
let flameIsOff = false;

// Function to start listening to microphone input
startButton.addEventListener('click', async () => {
    // Check for browser support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        // Get microphone input
        microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(microphone);

        // Connect the source to the analyser
        source.connect(analyser);
        analyser.fftSize = 256; // Size of the FFT (Fast Fourier Transform)
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        // Start checking the sound levels
        checkSoundLevel();
    } else {
        alert('Your browser does not support audio input.');
    }
});

// Function to check sound level
function checkSoundLevel() {
    analyser.getByteFrequencyData(dataArray);
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

    // Check if the average sound level exceeds the threshold
    if (average > soundThreshold) {
        if (!flameIsOff) {
            // Hide the flame and play the birthday music
            flame.classList.add('fade-out'); // Use a class for fade-out effect
            flameIsOff = true; // Set the flag to indicate the flame is off
            
            // Play birthday music
            playBirthdayMusic();

            // Optionally, you could disable the button after blowing
            startButton.disabled = true; 
        }
    }

    requestAnimationFrame(checkSoundLevel); // Continue checking
}

// Function to play birthday music
function playBirthdayMusic() {
    const audio = new Audio('music/birthe_day_song.mp3'); // Replace with the path to your birthday music file
    audio.play();
}
