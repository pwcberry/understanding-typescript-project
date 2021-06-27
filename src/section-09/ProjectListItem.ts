import Component from "./Component";
import { Project } from "./Project";

export default class ProjectListItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  constructor(listId: string, project: Project) {
    super("single-project", listId, false, `${listId}-project-${project.id}`);

    this.project = project;
  }

  configure() {}

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    const people = this.project.people === 1 ? "1 person" : `${this.project.people} people`;
    this.element.querySelector("h3")!.textContent = `${people} involved`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
