export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected readonly templateElement: HTMLTemplateElement;
  protected readonly hostElement: T;
  protected readonly element: U;

  constructor(templateId: string, hostId: string, insertBefore: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertBefore);
  }

  private attach(insertBefore: boolean) {
    this.hostElement.insertAdjacentElement(insertBefore ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;

  abstract renderContent(): void;
}
