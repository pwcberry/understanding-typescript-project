import { ProjectStatus } from "./Project";
import ProjectInput from "./ProjectInput";
import ProjectList from "./ProjectList";

const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
