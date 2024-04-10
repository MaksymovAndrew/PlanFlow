import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../Utility/DOMHelper.js"; //import * as DOMH from "../Utility/DOMHelper.js";

//class for list of items you have
export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    // console.log(this.projects);
    this.connetDropable();
  }
  //simply code for adding new projects via dragging the project to finished/active projects
  connetDropable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        //optional(just for cases where u have more operations in the app)
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });

    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });
    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });
    list.addEventListener("drop", (event) => {
      const projId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === projId)) {
        return;
      }
      document
        .getElementById(projId)
        .querySelector("button:last-of-type")
        .click(); //GENIOUS!!!
      list.parentElement.classList.remove("droppable");
      event.preventDefault(); // optional
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
