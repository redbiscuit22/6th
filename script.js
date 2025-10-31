// Music variables
let isPlaying = false;
let isMuted = false;

// Create falling hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
  heart.style.opacity = Math.random();

  const size = window.innerWidth < 600 ? 
    `${8 + Math.random() * 12}px` : 
    `${15 + Math.random() * 25}px`;
  
  heart.style.width = size;
  heart.style.height = size;

  document.querySelector('.hearts-bg').appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 8000);
}

// Music control functions
function playMusic() {
  const audio = document.getElementById('backgroundMusic');
  const playPauseBtn = document.getElementById('playPause');
  
  if (audio) {
    audio.play().then(() => {
      isPlaying = true;
      playPauseBtn.textContent = '⏸️';
      console.log('🎵 Music started playing');
    }).catch(error => {
      console.log('Autoplay blocked, waiting for user interaction');
      playPauseBtn.textContent = '▶️';
      isPlaying = false;
    });
  }
}

function togglePlayPause() {
  const audio = document.getElementById('backgroundMusic');
  const playPauseBtn = document.getElementById('playPause');
  
  if (!audio) return;
  
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
  } else {
    audio.play().then(() => {
      playPauseBtn.textContent = '⏸️';
      isPlaying = true;
    }).catch(error => {
      console.log('Play failed:', error);
    });
  }
}

function toggleVolume() {
  const audio = document.getElementById('backgroundMusic');
  const volumeToggle = document.getElementById('volumeToggle');
  
  if (!audio) return;
  
  isMuted = !isMuted;
  audio.muted = isMuted;
  
  if (isMuted) {
    volumeToggle.textContent = '🔇';
  } else {
    volumeToggle.textContent = '🔊';
  }
}

// Initialize music
function initializeMusic() {
  const audio = document.getElementById('backgroundMusic');
  
  if (audio) {
    // Set volume to 70% by default
    audio.volume = 0.7;
    
    // Try to play automatically after a short delay
    setTimeout(() => {
      playMusic();
    }, 1500);
  }
}

// Heart animation setup
function setupHeartInterval() {
  if (window.heartIntervalId) {
    clearInterval(window.heartIntervalId);
  }
  
  const heartInterval = window.innerWidth < 600 ? 600 : 300;
  window.heartIntervalId = setInterval(createHeart, heartInterval);
}

// Initialize everything
setupHeartInterval();

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(setupHeartInterval, 250);
});

// Envelope open animation
$("#open").click(() => {
  $("#envelope").toggleClass('open close');
  setTimeout(() => {
    $("#page1").fadeOut(() => $("#nameForm").fadeIn());
  }, 1800);
});

// Well-being response
function wellbeingResponse(response) {
  $("#nameForm").fadeOut(() => {
    let text;
    if (response === 'Good') {
      text = "yaaayy! I'm so happy to hear that from you, my love ❤️";
    } else {
      text = "awwee🥺 okay then, you must be really tired today my love. but it's alright, stay strong! because you are super duper amazing, my love. tell me about it later okay???";
    }
    $("#greetingText").text(text);
    $("#messageSection").fadeIn();
  });
}

// Ask Mara section
function askMara() {
  $("#messageSection").fadeOut(() => $("#Mara").fadeIn());
}

// Mara response logic
function MaraResponse(response) {
  $("#Mara").fadeOut(() => $("#SorrySection").fadeIn());
}

// Sorry response
function sorryResponse(response) {
  $("#SorrySection").fadeOut(() => $("#apologySection").fadeIn());
}

// Initialize when page loads
window.addEventListener('load', function() {
  initializeMusic();
  
  // Setup event listeners
  document.getElementById('playPause').addEventListener('click', togglePlayPause);
  document.getElementById('volumeToggle').addEventListener('click', toggleVolume);
});

// Start music on any user interaction (for autoplay restrictions)
document.addEventListener('click', function startMusicOnInteraction() {
  if (!isPlaying) {
    playMusic();
  }
});