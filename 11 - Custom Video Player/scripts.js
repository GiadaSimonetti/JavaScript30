/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screenSize = document.querySelector('.screen__size');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  console.log(video.videoHeight);
  console.log(video.videoWidth);
  console.log('inner');
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  console.log('outer');
  console.log(window.outerWidth);
  console.log(window.outerHeight);
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleScreen() {
  const normalWidth = video.videoWidth;
  const normalHeight = video.videoHeight;
  const fullWidth = video.style.width = '1280px';
  const fullHeight = video.style.height = '716px';
  if (normalWidth === 640 && normalHeight === 358) {
    video.style.width = window.innerWidth;
    video.style.height = window.innerHeight;
  } else {
    video.style.width = '640px';
    video.style.height = '358px';
  }
}

function updateSizeButton() {
  const symbol = this.value ? 'Full Sreen' : 'Small Screen';
  console.log(symbol);
  screenSize.textContent = symbol;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

screenSize.addEventListener('click', toggleScreen);
screenSize.addEventListener('click', updateSizeButton);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
