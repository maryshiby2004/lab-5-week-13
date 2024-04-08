/* Variables */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    // Display robot image based on battery percentage
    const imageUrl = `https://robohash.org/${Math.round(battery.level * 100)}.png`;
    updateRobotImage(imageUrl);
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});

// Function to update the image displayed on the HTML page
function updateRobotImage(imageUrl) {
    const robotImage = document.createElement('img');
    robotImage.src = imageUrl;
    document.getElementById("robot-image-container").innerHTML = ''; // Clear previous image
    document.getElementById("robot-image-container").appendChild(robotImage);
}
