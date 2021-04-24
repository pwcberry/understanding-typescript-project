import { generateId } from "./utils";

enum ProjectStatus {
  Active = "active",
  Finished = "finished",
}

class Project {
  id: string;
  title: string;
  description: string;
  people: number;
  status: ProjectStatus;

  constructor(title: string, description: string, people: number) {
    this.id = generateId("project");
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = ProjectStatus.Active;
  }
}

export { Project, ProjectStatus };
