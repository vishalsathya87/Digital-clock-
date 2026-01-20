let is24Hour = true;
let isClockMode = true;

/* CLOCK */
function updateClock(){
const now = new Date();
let hrs = now.getHours();
let ampm = "";

if(!is24Hour){
ampm = hrs >= 12 ? "PM" : "AM";
hrs = hrs % 12 || 12;
}

// Adding null checks prevents errors if elements are missing
if(document.getElementById("hours")) {
document.getElementById("hours").innerText = String(hrs).padStart(2, "0");
document.getElementById("minutes").innerText = String(now.getMinutes()).padStart(2, "0");
document.getElementById("seconds").innerText = String(now.getSeconds()).padStart(2, "0");
document.getElementById("ampm").innerText = ampm;
}
}

setInterval(updateClock, 1000);
updateClock();

function toggleFormat(){
is24Hour = !is24Hour;
updateClock(); // Force update so user sees change instantly
}

/* MODE SWITCH */
function switchMode(){
isClockMode = !isClockMode;
// Ensure these IDs exist in your HTML
document.getElementById("clockBox").classList.toggle("hidden");
document.getElementById("stopwatchBox").classList.toggle("hidden");
}

/* STOPWATCH */
let swSeconds = 0;
let swInterval = null;

function startSW(){
if(swInterval) return;
swInterval = setInterval(() => {
swSeconds++;
displaySW();
}, 1000);
}

function stopSW(){
clearInterval(swInterval);
swInterval = null;
}

function resetSW(){
stopSW();
swSeconds = 0;
displaySW();
}

function displaySW(){
let h = Math.floor(swSeconds / 3600);
let m = Math.floor((swSeconds % 3600) / 60);
let s = swSeconds % 60;

const timeString = [h, m, s].map(val => String(val).padStart(2, "0")).join(":");
document.getElementById("swTime").innerText = timeString;
}
/* ===================== */
/* SWIPE TO CHANGE MODE */
/* ===================== */

let startX = 0;
let endX = 0;

const container = document.querySelector(".container");

// Touch start
container.addEventListener("touchstart", function(e){
startX = e.touches[0].clientX;
});

// Touch end
container.addEventListener("touchend", function(e){
endX = e.changedTouches[0].clientX;
handleSwipe();
});

function handleSwipe(){
let diff = endX - startX;

// Minimum swipe distance
if(Math.abs(diff) > 50){

// Swipe left → Stopwatch
if(diff < 0 && isClockMode){
switchMode();
}

// Swipe right → Clock
else if(diff > 0 && !isClockMode){
switchMode();
}
}
}