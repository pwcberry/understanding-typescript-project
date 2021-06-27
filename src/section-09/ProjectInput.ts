import ProjectState from "./ProjectState";
import { validateNumber, validateString } from "./validator";
import { autobind } from "./decorators";
import Component from "./Component";

const projectState = ProjectState.instance;

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;
  private errorMessage: HTMLDivElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
    this.peopleInputElement = <HTMLInputElement>this.element.querySelector("#people");

    this.errorMessage = <HTMLDivElement>this.element.querySelector(".error-message");

    this.configure();
    this.renderContent();
  }

  // Return a tuple
  private gatherUserInput(): [string, string, number] | undefined {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const isValid =
      validateString({ value: title, required: true }) &&
      validateString({ value: description, required: true, minLength: 5 }) &&
      validateNumber({ value: people, required: true, min: 1, max: 5 });

    if (!isValid) {
      this.errorMessage.style.display = "block";
      return;
    }
    this.errorMessage.style.display = "";
    return [title, description, parseInt(people)];
  }

  private clearForm() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearForm();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {
    this.element.addEventListener("dblclick", () => {
      this.titleInputElement.value = "Project Wah Wah";
      this.descriptionInputElement.value = "This is the research into Jimi Hendrix's use of the wah-wah pedal.";
      this.peopleInputElement.value = "3";
    });
  }
}
