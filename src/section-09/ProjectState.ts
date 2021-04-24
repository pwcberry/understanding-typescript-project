import { Project } from "./Project";

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

  get projects() {
    return this._projects;
  }

  addListener(listener: ListenerFn) {
    this._listeners.push(listener);
  }

  addProject(title: string, description: string, people: number) {
    const project = new Project(title, description, people);
    this.projects.push(project);

    for (const listener of this._listeners) {
      listener(project);
    }
  }
}
