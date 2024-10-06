import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super duper amazing game";
document.title = gameName;

const header = document.createElement("h1");
const TotalCount = document.createElement("div");
const buttonToClick = document.createElement("button");
const upgradeButton = document.createElement("button")
upgradeButton.id = "FirstUpdate"
upgradeButton.disabled = true;


header.innerHTML = gameName;
let counter: number = 0;
TotalCount.textContent = `${counter} Books`;






function updateDisplay() {
  if (TotalCount) {
    TotalCount.textContent = `${counter} Books`;
  }
}

let lastTime: number = 0;
let growthRate: number = 0;

function step(time: number) {
  if (!lastTime) {
    lastTime = time;
  }

  const deltaTime = (time - lastTime) / 1000;
  const increment = deltaTime * growthRate;
  counter += increment;
  updateDisplay();
  lastTime = time;

  if (counter >= 10 && upgradeButton.disabled){
    upgradeButton.disabled = false;
  }
  if (counter < 10 && !upgradeButton.disabled){
    upgradeButton.disabled = true;

  }

  requestAnimationFrame(step);
}
requestAnimationFrame(step);

buttonToClick.id = "myButton";
buttonToClick.addEventListener("click", () => {
  console.log(counter);
  counter++;
  updateDisplay();
});

upgradeButton.addEventListener("click", () => {
    counter -=10
    growthRate+=1

  });
upgradeButton.innerHTML = "UPGRADE BABY"

buttonToClick.innerHTML = "📖";





app.append(header, buttonToClick, TotalCount, upgradeButton);
