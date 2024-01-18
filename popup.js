var startButton = document.getElementById("startBtn");
var stopButton = document.getElementById("stopBtn");

startButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ greeting: "run" }, function (response) {
        console.log(response.cookie);
    });
});

stopButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ greeting: "stop" }, function (response) {
        console.log("Loop stopped");
    });
});
