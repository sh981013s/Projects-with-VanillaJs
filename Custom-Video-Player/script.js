const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & Pause vid
const toggleVideoStatus = () => {
    return true;
}

// Update play/pause icon
const updatePlayIcon = () => {
    return true;
}

// Update progress & timestamp
const updateProgress = () => {
    return true;
}

// Set video time to progress
const setVideoProgress = () => {
    return true;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);