let startTime = 0;
let isStarted = false;
let startTemps = 0;
let end = 0;
let diff = 0;
let timerID = 0;

export function chrono() {
  end = new Date();
  diff = end - startTemps;
  diff = new Date(diff);
  let msec = diff.getMilliseconds();
  let sec = diff.getSeconds();
  let min = diff.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (msec < 10) {
    msec = "00" + msec;
  } else if (msec < 100) {
    msec = "0" + msec;
  }
  document.getElementById("chronotime").value = min + ":" + sec + ":" + msec;
  timerID = setTimeout("chrono()", 10);
}

export function chronoStart() {
  startTemps = new Date();
  chrono();
}

export function chronoReset() {
  document.getElementById("chronotime").value = "00:00:000";
  startTemps = new Date();
}

export function chronoStop() {
  clearTimeout(timerID);
}
