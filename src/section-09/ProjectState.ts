import { Project, ProjectStatus } from "./Project";

type ListenerFn = (project: Project) => void;

export default class ProjectState {
  private static _instance: ProjectState;
  private _projects: Project[] = [];
  private _listeners: ListenerFn[] = [];

  private constructor() {}

  static get instance() {
    if (!this._instance) {
      this._instance = new ProjectState();
    }
    return this._instance;
  }

  addListener(listener: ListenerFn) {
    this._listeners.push(listener);
  }

  addProject(title: string, description: string, people: number) {
    const project = new Project(title, description, people);
    this._projects.push(project);

    for (const listener of this._listeners) {
      listener(project);
    }
  }

  getProject(id: string): Project | undefined {
    return this._projects.find((p) => p.id === id);
  }

  getProjectsByStatus(status: ProjectStatus): Project[] {
    return this._projects.filter((p) => p.status === status);
  }
}
