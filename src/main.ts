import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A Game of Stones";
const header = document.createElement("h1");
const crownDisplay = document.createElement("div");
const gatherCrownsButton = document.createElement("button");
const growthRateText = document.createElement("div");

const upgradeSerfs = document.createElement("button");
const serfsCountDisplay = document.createElement("div");
serfsCountDisplay.id = "serfID"

const upgradeKnights = document.createElement("button");
const knightsCountDisplay = document.createElement("div");
knightsCountDisplay.id = "knightsID"

const upgradeBards = document.createElement("button");
const bardsCountDisplay = document.createElement("div");
bardsCountDisplay.id = "bardID";

let crowns: number = 0;
let lastTime: number = 0;
let growthRate: number = 0;

crownDisplay.textContent = `${crowns} Crowns`;
growthRateText.textContent = `Current Influence Rate: ${growthRate} crowns/sec`;
upgradeSerfs.id = "SerfWorkforce";
upgradeKnights.id = "KnightsOfTheSquareTable";
upgradeBards.id = "SingingBards";
upgradeSerfs.disabled = true;
upgradeKnights.disabled = true;
upgradeBards.disabled = true;

header.innerHTML = gameName;
gatherCrownsButton.innerHTML = "🪙🪙🪙";
document.title = gameName;

upgradeSerfs.innerHTML = " 'Hire' Serfs (10 Crowns)";

upgradeKnights.innerText = "Recruit Knights (100 Crowns)";
upgradeBards.innerText = "Singing Bards (1000 Crowns)";

const upgrades: { [button: string]: number } = {
  [upgradeSerfs.id]: 10,
  [upgradeKnights.id]: 100,
  [upgradeBards.id]: 1000,
};
const playerItems: { [key: string]: number } = {
    "SerfWorkforce": 0,
    "KnightsOfTheSquareTable": 0,
    "SingingBards": 0,
  };

const upgradeDisplays: { [key: string]: HTMLDivElement } = {
"SerfWorkforce": serfsCountDisplay,
"KnightsOfTheSquareTable": knightsCountDisplay,
"SingingBards": bardsCountDisplay,
};
function updateDisplay() {
  if (crownDisplay) {
    crownDisplay.textContent = `${crowns.toFixed(2)} Crowns`;
  }
  if (growthRateText) {
    growthRateText.textContent = `Current Influence Rate: ${growthRate.toFixed(2)} crowns/sec`;
  }
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
//   displayPlayerUpgrades();

  requestAnimationFrame(step);
}
requestAnimationFrame(step);

function checkUpgrades() {
  Object.keys(upgrades).forEach((buttonText) => {
    const upgradeAmount = upgrades[buttonText];
    const button = document.getElementById(buttonText) as HTMLButtonElement;
    if (button) {
      button.disabled = crowns < upgradeAmount;
    }
  });
}


// function displayPlayerUpgrades() {
//   Object.keys(playerItems).forEach((key) => {
//     if (playerItems[key]){
//         playerItems[key].innerText = `You possess ${playerItems[key]} ${key.replace(/.*?(.).*?([A-Z])/g, "$1$2").toLowerCase()} orders`;
//     }
//   });
// }

gatherCrownsButton.id = "myButton";
gatherCrownsButton.addEventListener("click", () => {
  console.log(crowns);
  crowns++;
  updateDisplay();
});

upgradeSerfs.addEventListener("click", () => {
    crowns -= upgrades[upgradeSerfs.id];
    growthRate += 0.1;
    playerItems[upgradeSerfs.id] += 1;
    upgrades[upgradeSerfs.id] *= 1.15;
    console.log(upgrades);
    console.log(upgradeDisplays)
    console.log(playerItems)
    upgradeDisplays["SerfWorkforce"].innerText = `You possess ${playerItems["SerfWorkforce"]} Serf Workforces`;

});

upgradeKnights.addEventListener("click", () => {
  crowns -= upgrades[upgradeKnights.id];
  growthRate += 2.0;
  playerItems[upgradeKnights.id] += 1;
  upgrades[upgradeKnights.id] *= 1.15;

  upgradeDisplays["KnightsOfTheSquareTable"].innerText = `You possess ${playerItems["KnightsOfTheSquareTable"]} Knights`;

});

upgradeBards.addEventListener("click", () => {
  crowns -= upgrades[upgradeBards.id];
  growthRate += 50.0;
  playerItems[upgradeBards.id] += 1;
  upgrades[upgradeBards.id] *= 1.15;

  upgradeDisplays["SingingBards"].innerText = `You possess ${playerItems["SingingBards"]} Bards`;

});

app.append(
  header,
  growthRateText,
  gatherCrownsButton,
  crownDisplay,
  upgradeSerfs,
  upgradeKnights,
  upgradeBards,
  serfsCountDisplay,
  knightsCountDisplay,
  bardsCountDisplay,
);
