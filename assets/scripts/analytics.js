//basic functions for creating intervals/timers(no need in this app, just an example)
const intervalId = setInterval(() => {
  console.log("Sending data...");
}, 2000);

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearTimeout(intervalId);
});
