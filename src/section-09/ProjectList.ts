import { autobind } from "./decorators";

import ProjectState from "./ProjectState";
import { Project, ProjectStatus } from "./Project";

export default class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: ProjectStatus) {
    this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-projects`;
    ProjectState.instance.addListener(this.onProjectAdded);
    this.attach();
    this.renderContent();
  }

  @autobind
  private onProjectAdded(project: Project) {
    const list = <HTMLUListElement>this.element.querySelector(`#${this.element.id}-list`);
    const item = <HTMLLIElement>document.createElement("li");
    item.textContent = project.title;
    list.appendChild(item);
  }

  private renderContent() {
    this.element.querySelector("ul")!.id = `${this.element.id}-list`;
    this.element.querySelector("h2")!.textContent = `${this.type} projects`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}
