let confettiAnimation; // Variable to hold the confetti animation loop

// Function to create continuous confetti in the background
function createConfetti() {
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const defaultConfetti = confetti.create(document.querySelector('canvas.confetti-background'), { resize: true });

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const frame = () => {
        defaultConfetti({
            particleCount: 2,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        });

        if (Date.now() < animationEnd) {
            confettiAnimation = requestAnimationFrame(frame);
        } else {
            cancelAnimationFrame(confettiAnimation); // Stop the animation when done
        }
    };

    frame();
}

document.getElementById("wishButton").addEventListener("click", function() {
    // Change age from 20 to 21
    const ageElement = document.getElementById("age");
    ageElement.textContent = "21";

    // Show the overlay
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";

    // Trigger confetti and start continuous background confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    createConfetti(); // Start background confetti

    // Play trumpet music first and increase volume
    const trumpetMusic = document.getElementById("trumpetMusic");
    trumpetMusic.volume = 1.0; // Max volume
    trumpetMusic.play();

    // Delay the birthday music to play after trumpet music starts
    setTimeout(function() {
        const birthdayMusic = document.getElementById("birthdayMusic");
        birthdayMusic.play();
    }, 2000); // 2-second delay for trumpet music
});

// Close the congratulations overlay when the button is clicked
document.getElementById("closeOverlay").addEventListener("click", function() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";

    // Stop confetti animation
    cancelAnimationFrame(confettiAnimation);

    // Pause both the birthday music and the trumpet music
    const birthdayMusic = document.getElementById("birthdayMusic");
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0; // Reset the music to the beginning

    const trumpetMusic = document.getElementById("trumpetMusic");
    trumpetMusic.pause();
    trumpetMusic.currentTime = 0; // Reset the trumpet music to the beginning
});

// Open the new overlay when the Open button is clicked
document.getElementById("openButton").addEventListener("click", function() {
    const openOverlay = document.getElementById("openOverlay");
    openOverlay.style.display = "flex"; // Show the new overlay
});

// Close the new overlay when the close button is clicked
document.getElementById("closeOpenOverlay").addEventListener("click", function() {
    const openOverlay = document.getElementById("openOverlay");
    openOverlay.style.display = "none"; // Hide the new overlay
});

document.getElementById("wishButton").addEventListener("click", function() {
    // Existing code to handle the "Make a Wish" button
});

document.getElementById("closeOverlay").addEventListener("click", function() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
});

document.getElementById("nextPageButton").addEventListener("click", function() {
    window.location.href = "index1.html"; // Navigate to index1.html
});
