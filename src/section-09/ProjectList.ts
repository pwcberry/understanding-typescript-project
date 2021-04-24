import { autobind } from "./decorators";

import ProjectState from "./ProjectState";
import { Project, ProjectStatus } from "./Project";

export default class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  listElement: HTMLUListElement;
  element: HTMLElement;

  constructor(private type: ProjectStatus) {
    this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-projects`;

    this.listElement = <HTMLUListElement>this.element.querySelector("ul");
    this.listElement.id = `${this.element.id}-list`;

    ProjectState.instance.addListener(this.onProjectAdded);
    this.attach();
    this.renderContent();
  }

  @autobind
  private onProjectAdded(project: Project) {
    if (project.status === this.type) {
      const item = <HTMLLIElement>document.createElement("li");
      item.textContent = project.title;
      this.listElement.appendChild(item);
    }
  }

  private renderContent() {
    this.element.querySelector("h2")!.textContent = `${this.type} projects`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}
