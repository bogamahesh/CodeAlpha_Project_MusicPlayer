let tracks = [
    {
        name: 'Señorita',
        artist: 'Shawn Mendes & Camila Cabello',
        url: 'senorita.mp3', // Sample URL
    }
];

let audio = new Audio();
let currentTrackIndex = 0;

const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const playButton = document.getElementById('play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');

function updateTrackInfo() {
    trackName.textContent = tracks[currentTrackIndex].name;
    trackArtist.textContent = tracks[currentTrackIndex].artist;
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play().catch(error => console.error("Error playing audio:", error));
        playButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
}

function playTrack(trackIndex) {
    currentTrackIndex = trackIndex;
    audio.src = tracks[trackIndex].url;
    updateTrackInfo();
    
    audio.play().catch(error => console.error("Error playing track:", error));
    playButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    updateSeekSlider();
}

prevButton.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
});

nextButton.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

playButton.addEventListener('click', togglePlayPause);
audio.addEventListener('timeupdate', updateSeekSlider);

function updateSeekSlider() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekSlider.value = (currentTime / duration) * 100 || 0;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalDurationDisplay.textContent = formatTime(duration);
}

seekSlider.addEventListener('input', function() {
    const seekTime = (seekSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value / 100;
});

audio.addEventListener('ended', function() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

updateTrackInfo();
