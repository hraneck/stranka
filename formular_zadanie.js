fetch("topbar.html")
.then(response => response.text())
.then(html => {
    document.body.insertAdjacentHTML("afterbegin",html);
})
.catch(error => {
    console.error("Topbar could not be loaded. Run the website using a local web server (for example Live Server).", error);
});

const menoin=document.getElementById("menoin");
const emailin=document.getElementById("emailin");
const kurzin=document.getElementById("kurzin");
const urovenin=document.querySelectorAll('input[name="uroven"]');
const poznamkain=document.getElementById("poznamkain");

const menoo=document.getElementById("menoo");
const emailo=document.getElementById("emailo");
const kurzo=document.getElementById("kurzo");
const uroveno=document.getElementById("uroveno");
const poznamkao=document.getElementById("poznamkao");
const formular=document.getElementById("formular");
const suhlas=document.getElementById("suhlasin");

const dvojice=[[menoin,menoo],[emailin,emailo],[kurzin,kurzo],[poznamkain,poznamkao]];

dvojice.forEach(([input,output]) => {
    if(!input || !output) 
        return;
    input.addEventListener("input", () => {
        output.textContent = input.value;
    })
    
});
if(urovenin && uroveno){
    urovenin.forEach(radio =>{
        radio.addEventListener("change", () => {
            uroveno.textContent = radio.value;
        })
    
    })
}
formular.addEventListener("submit", (submit) =>{
    if(suhlas.checked){
        submit.preventDefault();
        alert("Formular bol úspešne odoslaný.");
        formular.classList.add("odoslany_formular");
    }
    else {
        submit.preventDefault();
        alert("Prosím potvrďte súhlas s podmienkami zakliknutím políčka.")
    }
})








