import "./style.css";
import { Game } from "./gameLogic";

//adding a comment

const app: HTMLDivElement = document.querySelector("#app")!;
const game = new Game();

const img = 'ironThrone.png';

const gameName = "A Game of Stones";
const header = document.createElement("h1");
const crownDisplay = document.createElement("div");
const gatherCrownsButton = document.createElement("button");
gatherCrownsButton.innerHTML = `<img src="${img}" alt="Iron Throne">`;
const growthRateText = document.createElement("div");
const mainContent = document.createElement("div");
const upgradesContainer = document.createElement("div");

mainContent.id = "mainContent";
upgradesContainer.id = "upgradesContainer";

app.append(header, growthRateText, gatherCrownsButton, crownDisplay);
mainContent.append(header, growthRateText, gatherCrownsButton, crownDisplay);
app.append(mainContent, upgradesContainer);

header.innerHTML = gameName;
document.title = gameName;
gatherCrownsButton.id = "gatherButton";

function updateDisplay() {
  crownDisplay.textContent = `${game.crowns.toFixed(0)} Crowns`;
  growthRateText.textContent = `Current Influence Rate: ${game.growthRate.toFixed(2)} crowns/sec`;
}

const upgradeDisplays: { [key: string]: HTMLDivElement } = {};

game.availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  const countDisplay = document.createElement("div");
  const descriptionDiv = document.createElement("div");

  upgradeButton.id = item.name.replace(/ /g, "");
  upgradeButton.disabled = true;

  upgradesContainer.append(upgradeButton, countDisplay, descriptionDiv);
  descriptionDiv.innerHTML = item.description;
  descriptionDiv.style.fontStyle = "italic";

  upgradeDisplays[upgradeButton.id] = countDisplay;

  updateUpgradeButtonDisplay(upgradeButton.id);

  upgradeButton.addEventListener("click", () => {
    if (game.canPurchase(item.cost)) {
      game.purchaseItem(item);
      updateDisplay();
      updatePlayerDisplay(upgradeButton.id);
      updateUpgradeButtonDisplay(upgradeButton.id);
    }
  });
});

function updatePlayerDisplay(key: string) {
  upgradeDisplays[key].innerText = `You possess ${
    game.availableItems.find((item) => item.name.replace(/ /g, "") === key)!
      .name
  }`;
}

function updateUpgradeButtonDisplay(key: string) {
  const item = game.availableItems.find(
    (item) => item.name.replace(/ /g, "") === key,
  )!;
  const button = document.getElementById(key) as HTMLButtonElement;
  if (button) {
    button.innerHTML = `Recruit ${item.name} (${item.cost.toFixed(2)} Crowns)`;
  }
}

function step(time: number) {
  if (!game.lastTime) {
    game.lastTime = time;
  }

  const deltaTime = (time - game.lastTime) / 1000;
  game.processCrowns(deltaTime);

  while (game.crownsEarnedAccumulator >= 1) {
    generateStoneEmoji();
    game.crownsEarnedAccumulator -= 1;
  }

  updateDisplay();
  game.lastTime = time;
  checkUpgrades();

  requestAnimationFrame(step);
}

function checkUpgrades() {
  game.availableItems.forEach((item) => {
    const button = document.getElementById(
      item.name.replace(/ /g, ""),
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = !game.canPurchase(item.cost);
    }
  });
}

gatherCrownsButton.addEventListener("click", () => {
  game.crowns++;
  updateDisplay();
});

requestAnimationFrame(step);

function generateStoneEmoji() {
  const stoneEmoji = document.createElement("div");
  stoneEmoji.classList.add("emoji");
  setTimeout(() => stoneEmoji.classList.add("falling"), 0);
  stoneEmoji.textContent = "🪨";

  const headerRect = header.getBoundingClientRect();
  const appRect = app.getBoundingClientRect();

  const emojiX =
    headerRect.left + Math.random() * headerRect.width - appRect.left;
  const emojiY = headerRect.top - appRect.top - 20;

  stoneEmoji.style.left = `${emojiX}px`;
  stoneEmoji.style.top = `${emojiY}px`;
  app.appendChild(stoneEmoji);

  setTimeout(() => {
    stoneEmoji.remove();
  }, 1000);
}

// Cheat code for debugging
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "h") {
    game.crowns += 100000;
    updateDisplay();
  }
});
