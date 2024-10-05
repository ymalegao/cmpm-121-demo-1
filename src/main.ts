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

function autoClick(){
    counter++;
    updateDisplay();


}

let intervalID = setInterval(autoClick, 1000)
console.log(intervalID)


buttonToClick.id = "myButton";
buttonToClick.addEventListener("click", () => {
  console.log(counter);
  counter++;
  updateDisplay();
});
buttonToClick.innerHTML = "📖";

app.append(header, buttonToClick, TotalCount);
