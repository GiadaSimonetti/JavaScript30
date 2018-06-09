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

getVideo();
