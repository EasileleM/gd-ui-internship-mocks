let videoPaused = true;
let videoBlock = document.getElementsByClassName('header__video')[0];
let playPauseButtonClasses =
document.getElementsByClassName('play-button_header')[0].classList;

function playPauseVideo() {
  if(videoPaused) {
    videoBlock.play();
    playPauseButtonClasses.add('play-button_onPlay');
  } else {
    videoBlock.pause();
    playPauseButtonClasses.remove('play-button_onPlay');
  }
  videoPaused = !videoPaused;
}