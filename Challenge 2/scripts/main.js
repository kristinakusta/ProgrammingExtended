// Scene
function sceneMorning() {
    console.log("Morning");
    document.getElementById("scene").innerHTML = '<img class="background" src="images/spaceMorning.png">';
    document.getElementById("space-objects").innerHTML = '<img src="images/sun.png">';}

function sceneNight() {
    console.log("Evening");
    document.getElementById("scene").innerHTML = '<img class="background" src="images/spaceNight.png">';
    document.getElementById("space-objects").innerHTML = '<img src="images/moon.png">';
}


// Date
var currentDate = new Date();
var date = zero(currentDate.getDate());
var year = currentDate.getFullYear();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = monthNames[currentDate.getMonth()];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = dayNames[currentDate.getDay()];

// Display date
document.getElementById("date").innerHTML = day + ", " + date + " " + month + " " + year;

// Time
function clock() {
    var clock = document.getElementById('clock');
    var time = new Date();
    var hours = zero(time.getHours());
    var minutes = zero(time.getMinutes());
    var seconds = zero(time.getSeconds());
    clock.innerHTML = hours + ":" + minutes + ":" + seconds;
}

setInterval(clock, 1000);

function zero(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}









