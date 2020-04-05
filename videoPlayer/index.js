const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
let timestamp = document.getElementById('timestamp')

// 播放和暂停
function toggleVideoStatus() {
  if(video.paused){
    video.play()
  }else{
    video.pause()
  }
}

//暂停时，将播放按钮设置为播放按钮，否则设置为暂停按钮
function updatePlayIcon() {
  if(video.paused){
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }else{
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}
//更新进度条
function updateProgress() {
  progress.value = (video.currentTime / video.duration)*100
  //min 
  let mins = Math.floor(video.currentTime / 60) 
  if(mins < 10){
    mins = '0'+String(mins)
  }
  //second
  let sec = Math.floor(video.currentTime%60) 
  if(sec < 10){
    sec = '0'+String(sec)
  }
  timestamp.innerHTML = `${mins}:${sec}`
}

// 还原
function stopVideo() {
  video.currentTime = 0
  // 不要想这把progress.value 设置为0 ，没用， 还是会触发updateProgress时间
  video.pause()
}

//设置进度条
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}
// 添加事件监听
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);