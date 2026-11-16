fetch("topbar.html")
.then(response => response.text())
.then(html => {
    document.body.insertAdjacentHTML("afterbegin",html);
})
.catch(error => {
    console.error("Topbar could not be loaded. Run the website using a local web server (for example Live Server).", error);
});

const button = document.getElementById("changeButton");
const message = document.getElementById("message");

if (button && message){
    button.addEventListener("click", () => {
    message.textContent = "The button was clicked!";
    });
}

const nameInput = document.getElementById("nameInput");
const output = document.getElementById("output");

if (nameInput && output){
    nameInput.addEventListener("input", () => {
        const name = nameInput.value;
        output.textContent = `Hello, ${name}!`;
    });
}