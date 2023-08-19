// Get the required elements
const video = document.querySelector('video');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const volumeInput = document.querySelector('input[name="volume"]');
const playbackSpeedInput = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const speedBar = document.querySelector('.speed-bar');

// Add event listeners for play/pause button
playButton.addEventListener('click', togglePlay);

// Add event listener for progress update
video.addEventListener('timeupdate', updateProgress);

// Add event listener for progress bar click
progressBar.parentElement.addEventListener('click', scrub);

// Add event listeners for volume and playback speed
volumeInput.addEventListener('input', handleVolumeChange);
playbackSpeedInput.addEventListener('input', handlePlaybackSpeedChange);

// Add event listeners for skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Update play/pause button
function updatePlayButton() {
  playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Toggle play/pause on button click
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayButton();
}

// Update progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub through the video
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.parentElement.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Handle volume change
function handleVolumeChange() {
  video.volume = this.value;
}

// Handle playback speed change
function handlePlaybackSpeedChange() {
  video.playbackRate = this.value;
  speedBar.textContent = `${this.value}×`;
}

// Skip forward or backward
function skip() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

// Initial setup
updatePlayButton();
