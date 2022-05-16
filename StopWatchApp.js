//Taking ID's of every html element
var vid = document.getElementById('RelaxMusic')
var displayTimer = document.getElementById('displayTimer')

//Setting value to zero/null as default value when page
var Hours = (Minutes = Seconds = milliSeconds = 0)
var startTime = false
var isTimerEnds = false

//Start the watch
var startTimer = () => {
  if (startTime == false) {
    vid.play()
    startTime = setInterval(timer, 10)
  }
}

//Stop the watch
var stopTimer = () => {
  clearInterval(startTime)
  if (!isTimerEnds) {
    //don't stop the video if timer meets the edge case scenario (i.e when timer reaches 99:99:99)
    vid.pause()
  }
  startTime = false
}

//Reset the Timer
var resetTimer = () => {
  vid.pause()
  Hours = Minutes = Seconds = milliSeconds = 0
  displayTimer.innerHTML = settingTime()
  stopTimer()
}

//Main function to increase the timer in realtime
var timer = () => {
  displayTimer.innerHTML = settingTime()
  milliSeconds++
  if (milliSeconds == 100) {
    milliSeconds = 0
    Seconds++
  }
  if (Seconds == 60) {
    Seconds = 0
    Minutes++
  }
  if (Minutes == 60) {
    Minutes = 0
    Hours++
  }

  //Checking the Edge case when timer ends
  if (Hours >= 99 && Minutes >= 59 && Seconds >= 59) {
    isTimerEnds = true
    Hours = Minutes = Seconds = milliSeconds = 0
    stopTimer()
  }
}

//Main function to show the updated timer in UI
function settingTime () {
  return (
    (Hours < 10 ? '0' + Hours : Hours) +
    ':' +
    (Minutes < 10 ? '0' + Minutes : Minutes) +
    ':' +
    (Seconds < 10 ? '0' + Seconds : Seconds) +
    ':' +
    (milliSeconds < 10 ? '0' + milliSeconds : milliSeconds)
  )
}
