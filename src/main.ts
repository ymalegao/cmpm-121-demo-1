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
  upgradeButton.innerHTML = `Recruit ${item.name} (${item.cost} Crowns)`;

  upgradeButton.disabled = true;
  upgradesContainer.append(upgradeButton, countDisplay, descriptionDiv);
  descriptionDiv.innerHTML = item.description;
  descriptionDiv.style.fontStyle = "italic";

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
    crownDisplay.textContent = `${crowns.toFixed(0)} Crowns`;
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
  crownsEarnedAccumulator +=1;

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
    // Make a emoji div
    const stoneEmoji = document.createElement('div');
    stoneEmoji.classList.add('stoneEmoji');
    stoneEmoji.textContent = '🪨';
  
    // Position it over the game title
    stoneEmoji.style.position = 'absolute';
    // Get the position of the header (game title)
    const headerRect = header.getBoundingClientRect(); // get text of where game of stones is 
    const appRect = app.getBoundingClientRect();
  
    // place the emoji at a random x position over the header
    const x = headerRect.left + Math.random() * headerRect.width - appRect.left; 
    const y = headerRect.top - appRect.top - 20; // above the header
  
    stoneEmoji.style.left = x + 'px';
    stoneEmoji.style.top = y + 'px';
  
    app.appendChild(stoneEmoji);
  
    // Animate it falling down
    stoneEmoji.animate(
      [
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(100px)', opacity: 0 },
      ],
      {
        duration: 1000,
        easing: 'ease-in',
        fill: 'forwards',
      }
    );
  
    // Remove the element after animation
    setTimeout(() => {
      stoneEmoji.remove();
    }, 1000);
  }
  