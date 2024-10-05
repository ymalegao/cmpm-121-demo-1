import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super duper amazing game";
document.title = gameName;

const header = document.createElement("h1");
const TotalCount = document.createElement("div");
const buttonToClick = document.createElement("button");

header.innerHTML = gameName;
let counter: number = 0;
TotalCount.textContent = `${counter} Books`;

function updateDisplay() {
  if (TotalCount) {
    TotalCount.textContent = `${counter} Books`;
  }
}


let lastTime: number = 0

function step(time:number){
    if (!lastTime){
        lastTime = time
    }

    const deltaTime = (time-lastTime) / 1000
    const increment = deltaTime
    counter += increment
    updateDisplay();
    lastTime = time;

    requestAnimationFrame(step)


}
requestAnimationFrame(step)





buttonToClick.id = "myButton";
buttonToClick.addEventListener("click", () => {
  console.log(counter);
  counter++;
  updateDisplay();
});
buttonToClick.innerHTML = "📖";

app.append(header, buttonToClick, TotalCount);
