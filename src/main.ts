import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super duper amazing game";
const header = document.createElement("h1");
const TotalCount = document.createElement("div");
const buttonToClick = document.createElement("button");
const upgradeButton = document.createElement("button");
const upgrade1Count = document.createElement("div");
const upgradeB = document.createElement("button");
const upgrade2Count = document.createElement("div");
const upgradeC = document.createElement("button");
const upgrade3Count = document.createElement("div");
const growthRateText = document.createElement("div");

let counter: number = 0;
let lastTime: number = 0;
let growthRate: number = 0;

TotalCount.textContent = `${counter} Books`;
growthRateText.textContent = `Current Growth Rate: ${growthRate} books/sec`;
upgradeButton.id = "FirstUpdate";
upgradeB.id = "UpgradeB";
upgradeC.id = "UpgradeC";
upgradeButton.disabled = true;
upgradeB.disabled = true;
upgradeC.disabled = true;
header.innerHTML = gameName;
upgradeButton.innerHTML = "I cost 10";
buttonToClick.innerHTML = "📖";
document.title = gameName;
upgradeB.innerText = "I cost 100";
upgradeC.innerText = "I cost 1000";

const upgrades: { [button: string]: number } = {
  [upgradeButton.id]: 10,
  [upgradeB.id]: 100,
  [upgradeC.id]: 1000,
};
const playerItems: { [name: string]: number } = {
  [upgradeButton.id]: 0,
  [upgradeB.id]: 0,
  [upgradeC.id]: 0,
}; //going to have a hashmap to display their purchaces

function updateDisplay() {
  if (TotalCount) {
    TotalCount.textContent = `${counter.toFixed(2)} Books`;
  }
  if (growthRateText) {
    growthRateText.textContent = `Current Growth Rate: ${growthRate}`;
  }
}

function step(time: number) {
  if (!lastTime) {
    lastTime = time;
  }

  const deltaTime = (time - lastTime) / 1000;
  const increment = deltaTime * growthRate;
  counter += increment;
  updateDisplay();
  lastTime = time;

  checkUpgrades();
  displayPlayerUpgrades();

  //   if (counter >= 10 && upgradeButton.disabled){
  //     upgradeButton.disabled = false;
  //   }
  //   if (counter < 10 && !upgradeButton.disabled){
  //     upgradeButton.disabled = true;

  //   }

  requestAnimationFrame(step);
}
requestAnimationFrame(step);

function checkUpgrades() {
  Object.keys(upgrades).forEach((buttonText) => {
    const upgradeAmount = upgrades[buttonText];
    const button = document.getElementById(buttonText) as HTMLButtonElement;
    if (button) {
      button.disabled = counter < upgradeAmount;
    }
  });
}

function displayPlayerUpgrades() {
  Object.keys(playerItems).forEach((buttonID) => {
    const amount = playerItems[buttonID];
    const button = document.getElementById(buttonID) as HTMLButtonElement;
    button.innerHTML = `You have ${amount} of upgrade ${buttonID}`;
  });
}

buttonToClick.id = "myButton";
buttonToClick.addEventListener("click", () => {
  console.log(counter);
  counter++;
  updateDisplay();
});

upgradeButton.addEventListener("click", () => {
  counter -= upgrades[upgradeButton.id];
  growthRate += 100.1;
  playerItems[upgradeButton.id] += 1;
  upgrades[upgradeButton.id] *= 1.15;
  console.log(upgrades)
});
upgradeB.addEventListener("click", () => {
  counter -= upgrades[upgradeB.id];
  growthRate += 2.0;
  playerItems[upgradeB.id] += 1;
  upgrades[upgradeB.id] *= 1.15

});

upgradeC.addEventListener("click", () => {
  counter -=  upgrades[upgradeC.id]
  growthRate += 50.0;
  playerItems[upgradeC.id] += 1;
  upgrades[upgradeC.id] *= 1.15

});

app.append(
  header,
  growthRateText,
  buttonToClick,
  TotalCount,
  upgradeButton,
  upgradeB,
  upgradeC,
  upgrade1Count,
  upgrade2Count,
  upgrade3Count,
);
