import { ProjectList } from "./App/ProjectList.js";

//the whole app class
class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    //we dont need this in app, just an example of intervals/timers
    document
      .getElementById("stop-analytics-btn")
      .addEventListener("click", () => {
        document.getElementById("stop-analytics-btn").style.display = "none";
      }); //if user decides to disable the analytics button right after loading, not waiting for timer

    const timerId = setTimeout(this.startAnalytics, 3000);

    document
      .getElementById("stop-analytics-btn")
      .addEventListener("click", () => {
        clearTimeout(timerId);
      });
  }
  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "src/utility/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

//creating app:)
App.init();
