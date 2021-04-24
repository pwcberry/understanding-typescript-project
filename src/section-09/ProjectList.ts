type ProjectListType = "active" | "finished";

export default class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: ProjectListType) {
    this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    this.element.querySelector("ul")!.id = `${this.element.id}-list`;
    this.element.querySelector("h2")!.textContent = `${this.type} projects`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}
