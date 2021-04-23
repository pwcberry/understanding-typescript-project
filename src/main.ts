const main = <HTMLDivElement>document.querySelector("main");
main.innerHTML = "<h1>Hello World</h1>";

const h1 = <HTMLHeadingElement> main.querySelector('h1');
h1.style.color = 'rebeccapurple';
