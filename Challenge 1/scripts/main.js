//environment
//current gravity
function currentGravity() {
    document.getElementById("current_gravity").innerHTML = Math.random() + " m/s2";
}

//atmosphere
function atmosphere() {
    document.getElementById("oxogyn_ship").innerHTML = "Oxogyn: " + Math.floor(Math.random() * 6) + 1 + "%";
}

//supplies
//water
function water() {
    var water = parseFloat(document.getElementById("water").value);
    if (Number.isNaN(water) === true) { //Error message
        alert("Invalid number...");
        return;
    }
    else {
        var days = water * 0.48;
        document.getElementById("water_leftover").innerHTML = water + " L of water will last you around " + days.toFixed(2) + " days.";
    }
}

//food
function food() {
    var food = parseFloat(document.getElementById("food").value);
    if (Number.isNaN(food) === true) { //Error message
        alert("Invalid number...");
        return;
    }
    else {
        var days = food * 0.58;
        document.getElementById("food_leftover").innerHTML = food + " kg of food will last you around " + days.toFixed(2) + " days.";
    }
}

//metrics
//gravity
function gravityMars() {
    document.getElementById("gravity_on_mars").innerHTML = "The gravity on Mars is 0.375 that of Earth.";
}
function gravityEarth() {
    document.getElementById("gravity_on_earth").innerHTML = "The gravity on Earth is 2.66 times that of Mars.";
}

//kilometers
function convertKm() {
    var earthKilometers = parseFloat(document.getElementById("earth_kilometers").value);
    var marsKilometers = earthKilometers * 0.356;
    if (Number.isNaN(earthKilometers) === true) {
        alert("Invalid number.");
        return;
    }
    else {
        document.getElementById("mars_kilometers").innerHTML = earthKilometers + " earth km equals to " + marsKilometers.toFixed(2) + " mars KM.";
    }
}