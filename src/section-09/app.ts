import { autobind } from "./decorators";
import ProjectList from "./ProjectList";
import { validateNumber, validateString } from "./validator";

class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private readonly formElement: HTMLFormElement;
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;
  private errorMessage: HTMLDivElement;

  constructor() {
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    this.titleInputElement = <HTMLInputElement>this.formElement.querySelector("#title");
    this.descriptionInputElement = <HTMLInputElement>this.formElement.querySelector("#description");
    this.peopleInputElement = <HTMLInputElement>this.formElement.querySelector("#people");

    this.errorMessage = <HTMLDivElement>this.formElement.querySelector(".error-message");

    this.attach();
    this.configure();
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
      console.log(userInput);
      this.clearForm();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
