import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super duper amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const buttonToClick = document.createElement("button")
buttonToClick.id = "myButton"
buttonToClick.addEventListener('click', (event: MouseEvent) => {
    console.log(event)
    console.log("you clicked me")
})
buttonToClick.innerHTML = "📖"

app.append(header, buttonToClick);
