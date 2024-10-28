import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const gameName = "A Game of Stones";
const header = document.createElement("h1");
const crownDisplay = document.createElement("div");
const gatherCrownsButton = document.createElement("button");
const growthRateText = document.createElement("div");
const mainContent = document.createElement("div");
const upgradesContainer = document.createElement("div");

mainContent.id = "mainContent";
upgradesContainer.id = "upgradesContainer";

app.append(header, growthRateText, gatherCrownsButton, crownDisplay);
mainContent.append(header, growthRateText, gatherCrownsButton, crownDisplay);
app.append(mainContent, upgradesContainer);

let crowns: number = 0;
let lastTime: number = 0;
let growthRate: number = 0;
let crownsEarnedAccumulator: number = 0;
const upgradeCostMultiplier = 1.15;

crownDisplay.textContent = `${crowns.toFixed(0)} Crowns`;
growthRateText.textContent = `Current Influence Rate: ${growthRate} crowns/sec`;

header.innerHTML = gameName;
gatherCrownsButton.innerHTML = "🪙🪙🪙";
document.title = gameName;

const availableItems: Item[] = [
  {
    name: "Serf Workforce",
    cost: 10,
    rate: 0.1,
    description: "Serfs love being protected by the knights and having no land",
  },
  {
    name: "Knights of the Square Table",
    cost: 100,
    rate: 2,
    description: "Like the knights of the Roundtable but way worse",
  },
  {
    name: "Plebeian",
    cost: 500,
    rate: 5,
    description: "One roman is worth 50 serfs, everyone knows that",
  },
  {
    name: "Singing Bard",
    cost: 1000,
    rate: 50,
    description: "Will sing (or stop singing) for crowns",
  },
  {
    name: "Playful Jester",
    cost: 2000,
    rate: 100,
    description: "They get to make fun of royalty and get food. Life is good.",
  },
];

const upgrades: { [key: string]: number } = {};
const playerItems: { [key: string]: number } = {};
const upgradeDisplays: { [key: string]: HTMLDivElement } = {};

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  const countDisplay = document.createElement("div");
  const descriptionDiv = document.createElement("div");

  upgradeButton.id = item.name.replace(/ /g, "");

  upgradeButton.disabled = true;
  upgradesContainer.append(upgradeButton, countDisplay, descriptionDiv);
  descriptionDiv.innerHTML = item.description;
  descriptionDiv.style.fontStyle = "italic";

  upgrades[upgradeButton.id] = item.cost;
  playerItems[upgradeButton.id] = 0;
  upgradeDisplays[upgradeButton.id] = countDisplay;

  updateUpgradeButtonDisplay(upgradeButton.id);

  upgradeButton.addEventListener("click", () => {
    if (crowns >= upgrades[upgradeButton.id]) {
      crowns -= upgrades[upgradeButton.id];
      growthRate += item.rate;
      playerItems[upgradeButton.id] += 1;
      upgrades[upgradeButton.id] *= upgradeCostMultiplier;
      item.cost = upgrades[upgradeButton.id];
      updateDisplay();
      updatePlayerDisplay(upgradeButton.id);
      updateUpgradeButtonDisplay(upgradeButton.id);
    }
  });
});

function updateDisplay() {
  if (crownDisplay) {
    crownDisplay.textContent = `${crowns.toFixed(0)} Crowns`;
  }
  if (growthRateText) {
    growthRateText.textContent = `Current Influence Rate: ${growthRate.toFixed(2)} crowns/sec`;
  }
}

function updatePlayerDisplay(key: string) {
  upgradeDisplays[key].innerText = `You possess ${playerItems[key]} ${
    availableItems.find((item) => item.name.replace(/ /g, "") === key)!.name
  }`;
}

function updateUpgradeButtonDisplay(key: string) {
  const item = availableItems.find(
    (item) => item.name.replace(/ /g, "") === key,
  )!;
  const button = document.getElementById(key) as HTMLButtonElement;
  if (button) {
    button.innerHTML = `Recruit ${item.name} (${upgrades[key].toFixed(2)} Crowns)`;
  }
}

function step(time: number) {
  if (!lastTime) {
    lastTime = time;
  }

  const deltaTime = (time - lastTime) / 1000;
  const increment = deltaTime * growthRate;
  crowns += increment;
  crownsEarnedAccumulator += growthRate * deltaTime;

  while (crownsEarnedAccumulator >= 1) {
    generateStoneEmoji();
    crownsEarnedAccumulator -= 1;
  }
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

gatherCrownsButton.id = "gatherButton";
gatherCrownsButton.addEventListener("click", () => {
  console.log(crowns);
  crowns++;
  updateDisplay();
});

requestAnimationFrame(step);

function generateStoneEmoji() {
  const stoneEmoji = document.createElement("div");
  stoneEmoji.classList.add("emoji");
  setTimeout(() => stoneEmoji.classList.add("falling"), 0);
  stoneEmoji.textContent = "🪨";

  // Get the position of the header (game title)
  const headerRect = header.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();

  const emojiX = headerRect.left + Math.random() * headerRect.width - appRect.left;
  const emojiY = headerRect.top - appRect.top - 20;

  stoneEmoji.style.left = emojiX + "px";
  stoneEmoji.style.top = emojiY + "px";
  app.appendChild(stoneEmoji);


  setTimeout(() => {
    stoneEmoji.remove();
  }, 1000);
}

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "h") {
    crowns += 100000;
    updateDisplay();
  }
});
