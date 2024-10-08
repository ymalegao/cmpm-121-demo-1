import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description:string;
}

const gameName = "A Game of Stones";
const header = document.createElement("h1");
const crownDisplay = document.createElement("div");
const gatherCrownsButton = document.createElement("button");
const growthRateText = document.createElement("div");

let crowns: number = 0;
let lastTime: number = 0;
let growthRate: number = 0;

crownDisplay.textContent = `${crowns} Crowns`;
growthRateText.textContent = `Current Influence Rate: ${growthRate} crowns/sec`;

header.innerHTML = gameName;
gatherCrownsButton.innerHTML = "🪙🪙🪙";
document.title = gameName;

const availableItems: Item[] = [
  { name: "Serf Workforce", cost: 10, rate: 0.1, description: "Oh boy I love serfdom I love being protected by the knights and having no land" },
  { name: "Knights of the Square Table", cost: 100, rate: 2 , description: "Like the knights of the Roundtable but way worse"},
  { name: "Singing Bards", cost: 1000, rate: 50 , description: "Will sing (or stop singing) for crowns"},
];

const upgrades: { [key: string]: number } = {};
const playerItems: { [key: string]: number } = {};
const upgradeDisplays: { [key: string]: HTMLDivElement } = {};

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  const countDisplay = document.createElement("div");
  const descriptionDiv = document.createElement("div");

  upgradeButton.id = item.name.replace(/ /g, "");
  upgradeButton.innerHTML = `Recruit ${item.name} (${item.cost} Crowns)`;
  
  upgradeButton.disabled = true;
  app.append(upgradeButton, countDisplay, descriptionDiv);
  descriptionDiv.innerHTML = item.description
  descriptionDiv.style.fontStyle = "italic"

  upgrades[upgradeButton.id] = item.cost;
  playerItems[upgradeButton.id] = 0;
  upgradeDisplays[upgradeButton.id] = countDisplay;

  upgradeButton.addEventListener("click", () => {
    if (crowns >= upgrades[upgradeButton.id]) {
      crowns -= upgrades[upgradeButton.id];
      growthRate += item.rate;
      playerItems[upgradeButton.id] += 1;
      upgrades[upgradeButton.id] *= 1.15;
      updateDisplay();
      updatePlayerDisplay(upgradeButton.id);
    }
  });
});

function updateDisplay() {
  if (crownDisplay) {
    crownDisplay.textContent = `${crowns.toFixed(2)} Crowns`;
  }
  if (growthRateText) {
    growthRateText.textContent = `Current Influence Rate: ${growthRate.toFixed(2)} crowns/sec`;
  }
}

function updatePlayerDisplay(key: string) {
  upgradeDisplays[key].innerText =
    `You possess ${playerItems[key]} ${availableItems.find((item) => item.name.replace(/ /g, "") === key)!.name}`;
}

function step(time: number) {
  if (!lastTime) {
    lastTime = time;
  }

  const deltaTime = (time - lastTime) / 1000;
  const increment = deltaTime * growthRate;
  crowns += increment;
  updateDisplay();
  lastTime = time;

  checkUpgrades();

  requestAnimationFrame(step);
}

function checkUpgrades() {
  Object.entries(upgrades).forEach(([key, cost]) => {
    const button = document.getElementById(key) as HTMLButtonElement;
    if (button) {
      button.disabled = crowns < cost;
    }
  });
}

gatherCrownsButton.id = "myButton";
gatherCrownsButton.addEventListener("click", () => {
  console.log(crowns);
  crowns++;
  updateDisplay();
});

app.append(header, growthRateText, gatherCrownsButton, crownDisplay);
requestAnimationFrame(step);
