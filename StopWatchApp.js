//Taking ID's of every html element
var vid = document.getElementById('RelaxMusic')
var displayTimer = document.getElementById('displayTimer')
var start = document.getElementById('start')
var stop = document.getElementById('stop')
var reset = document.getElementById('reset')

//Setting value to zero/null as default value when page
var Hours = (Minutes = Seconds = milliSeconds = 0)
var startTime = false
var isTimerEnds = (resetBtnClicked = false)

//Start the watch
var startTimer = () => {
  if (isTimerEnds) {
    resetTimer()
    isTimerEnds = false
    resetBtnClicked = false
  } else if (!isTimerEnds) {
    if (startTime == false) {
      clearInterval(startTime)
      vid.play()
      startTime = setInterval(timer, 10)
    }
  }
}

//Stop the watch
var stopTimer = () => {
  clearInterval(startTime)
  if (startTime) {
    start.innerHTML = 'Resume'
  }
  if (!isTimerEnds) {
    //don't stop the video if timer meets the edge case scenario (i.e when timer reaches 99:99:99)
    vid.pause()
    stop.innerHTML = 'Stop'
  } else if (isTimerEnds && resetBtnClicked) {
    resetTimer()
  } else if (isTimerEnds) {
    start.innerHTML = 'Reset'
    stop.innerHTML = 'Reset'
    reset.innerHTML = 'Reset'
    resetBtnClicked = true
  }
  startTime = false
}

//Reset the Timer
var resetTimer = () => {
  clearInterval(startTime)
  if (isTimerEnds) {
    resetBtnClicked = true
    isTimerEnds = false
  } else {
    resetBtnClicked = false
  }
  vid.pause()
  Hours = Minutes = Seconds = milliSeconds = 0
  displayTimer.innerHTML = settingTime()
  start.innerHTML = 'Start'
  stop.innerHTML = 'Stop'
}

//Main function to increase the timer in realtime
var timer = () => {
  displayTimer.innerHTML = settingTime()
  //1000 ms = 1s (Hence, calling this timer function every 10ms means: if we occurred this function 100 times, then 10*100 = 1000ms = 1s)
  milliSeconds += 1
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

  //Checking the Edge case when timer ends (i.e at 99:59:59)
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
