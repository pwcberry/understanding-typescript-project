import { autobind } from "./decorators";

import Component from "./Component";
import ProjectState from "./ProjectState";
import { Project, ProjectStatus } from "./Project";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private readonly listElement: HTMLUListElement;

  constructor(private type: ProjectStatus) {
    super("project-list", "app", false, `${type}-projects`);

    this.listElement = <HTMLUListElement>this.element.querySelector("ul");
    this.listElement.id = `${this.element.id}-list`;

    this.configure();
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

  configure() {
    ProjectState.instance.addListener(this.onProjectAdded);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = `${this.type} projects`;
  }
}
