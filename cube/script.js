const cube = document.getElementById('cube');
const popText = document.querySelector('.pop-text');
const popPaused = document.querySelector('.pop-paused');
const volumeControl = document.getElementById('volume-control');
const paradiseAudio = document.getElementById('paradiseAudio');
const timeSlider = document.getElementById('time-slider');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');


function play() {
  console.log('play function called');
  const isPaused = cube.style.animationPlayState = 'running';
const loadingPlay = document.querySelector(".play-container section");
  const play = document.getElementById('play');
  const stop = document.getElementById('stop');

  stop.style.display = "block";
  play.style.display = "none";
  loadingPlay.classList.add("loadingPlay");

  // pop play
  setTimeout(() => {
    popText.style.display = "block";
    popPaused.style.display = "none";
    popText.classList.remove('popExit');
    popPaused.classList.add('popClose');
  }, 200);

    // Play the audio
    paradiseAudio.play();

  cube.style.animationPlayState = isPaused;
  speakMessage("Music enjoy played");

  // Update time slider
  const duration = paradiseAudio.duration;
  const progress = (paradiseAudio.currentTime / duration) * 100;
  timeSlider.value = progress;

   // Add an event listener for the end of the audio
   paradiseAudio.addEventListener('ended', handleAudioEnd);

   // Start the animation loop
   animateSlider();

       // Show the stop button and hide the play button
       stopButton.style.display = "block";
       playButton.style.display = "none";

}

function updateLyricsAndTimeSlider() {
  // Update lyrics
  const currentTime = Math.floor(paradiseAudio.currentTime);
  if (audioLyrics[currentLyricIndex] && currentTime >= currentLyricIndex) {
    lyrics.textContent = audioLyrics[currentLyricIndex];
    currentLyricIndex++;
  }
}


function seekAudio() {
  // Seek the audio to the selected position
  const duration = paradiseAudio.duration;
  const seekTo = (timeSlider.value / 100) * duration;
  paradiseAudio.currentTime = seekTo;
}


function handleAudioEnd() {
  // Reset the lyrics and time slider when the audio ends
  lyrics.textContent = "This is where your lyrics will appear.";
  currentLyricIndex = 0;
  timeSlider.value = 0;

     // Show the play button and hide the stop button
     playButton.style.display = "block";
     stopButton.style.display = "none";

}

function animateSlider() {
  // Continuously update the input range slider based on audio progress
  requestAnimationFrame(animateSlider);

  const duration = paradiseAudio.duration;
  const progress = (paradiseAudio.currentTime / duration) * 100;
  timeSlider.value = progress;
   // Check if the audio has ended
   if (paradiseAudio.currentTime >= paradiseAudio.duration) {
    handleAudioEnd();
  }
  
}

function stop() {
  console.log('Stop function called');

  const isPlay = cube.style.animationPlayState = 'paused';
const loadingPlay = document.querySelector(".play-container section");
  const play = document.getElementById('play');
  const stop = document.getElementById('stop');
  play.style.display = "block";
  stop.style.display = "none";
  loadingPlay.classList.remove("loadingPlay");



  setTimeout(() => {
    popPaused.style.display = "block";
    popText.classList.add('popExit');
    popPaused.classList.remove('popClose');
  }, 100);

  cube.style.animationPlayState = isPlay;

  paradiseAudio.pause();
  
      // Speak a message
      speakMessage("Music stopped.");
      timeSlider.value = 0;

     // Remove the event listener for the end of the audio
    paradiseAudio.removeEventListener('ended', handleAudioEnd);

    // Stop the animation loop
    cancelAnimationFrame(animateSlider);

    // Enable the play button
    playButton.disabled = false;
}

// Function to speak a message using Web Speech API
function speakMessage(message) {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.volume = 1; // Set the volume (0 to 1)
    speech.rate = 1; // Set the rate (0.1 to 10)
    window.speechSynthesis.speak(speech);
  }
}