const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaString => {
      console.log(localMediaString);
      video.src = window.URL.createObjectURL(localMediaString);
      video.play();
    })
    .catch(err => {
      console.error("Press yes next time!", err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  console.log(width, height);
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto() {
  //played the camera sound
  snap.currentTime = 0;
  snap.play();

  // take the data aout of the canvas
  const data = canvas.toDataURL('/imag/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'nice');
  link.innerHTML = `<img src="${data}" alt="Nice Gal" />`
  strip.insertBefore(link, strip.firstChild);

}

getVideo();

video.addEventListener('canplay', paintToCanvas)
