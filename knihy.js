/*function nacitajKnihy() {
  fetch("/api/knihy")
    .then(odpoved => odpoved.json())
    .then(knihy => {
      const zoznam = document.getElementById("zoznam");
      zoznam.innerHTML = "";
      knihy.forEach(kniha => {
        const riadok = document.createElement("tr");
        [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena]
          .forEach(hodnota => {
            const bunka = document.createElement("td");
            bunka.textContent = hodnota;
            riadok.appendChild(bunka);
          });
        const bunka = document.createElement("td");
        const tlacidlo = document.createElement("button");
        tlacidlo.textContent = "Vymazat";
        tlacidlo.onclick = () => {
          fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
            .then(() => nacitajKnihy());
        };
        const cenaBtn = document.createElement("button");
        cenaBtn.textContent = "Zmeniť cenu";

        cenaBtn.addEventListener("click", function() {
            const vstup = prompt("O koľko zmeniť cenu?", "5");
            if (vstup === null || vstup.trim() === "") return;
            const zmena = Number(vstup.replace(",", "."));
            if (!Number.isFinite(zmena)) {
                alert("Neplatné číslo");
                return;
            }
            fetch("/api/knihy/" + kniha.id + "/cena", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ zmena: zmena })
            })
            .then(() => nacitajKnihy());
        });
        const cenaBtn = document.createElement("button");
        cenaBtn.textContent = "Zmeniť cenu";

        cenaBtn.addEventListener("click", function() {
            alert("Tlačidlo funguje!");

            const vstup = prompt("O koľko zmeniť cenu?", "5");

            if (vstup === null || vstup.trim() === "") return;

            const zmena = Number(vstup.replace(",", "."));

            if (!Number.isFinite(zmena)) {
                alert("Neplatné číslo");
                return;
            }

            fetch("/api/knihy/" + kniha.id + "/cena", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ zmena: zmena })
            })
            .then(() => nacitajKnihy());
        });
          bunka.appendChild(tlacidlo);
          bunka.appendChild(cenaBtn);
          riadok.appendChild(bunka);
          zoznam.appendChild(riadok);
      });
    });
};

const formular = document.getElementById("formular");
formular.addEventListener("submit", event => {
    event.preventDefault();
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: Number(document.getElementById("rok").value),
        cena: Number(document.getElementById("cena").value)
    };
    fetch("/api/knihy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kniha)
    }).then(() => {
        formular.reset();
        nacitajKnihy();
    });
});

nacitajKnihy();*/


function nacitajKnihy(){
    fetch("/api/knihy")
    .then(response => response.json())
    .then(knihy => {
        const zoznam = document.getElementById("zoznam");
        zoznam.innerHTML = "";
        knihy.forEach(kniha => {
            const riadok = document.createElement("tr");
            [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena].forEach(text => {
                const bunka = document.createElement("td");
                bunka.textContent = text;
                riadok.appendChild(bunka);
            });
            const bunka = document.createElement("td");
            const tlacidlo = document.createElement("button");
            tlacidlo.textContent = "Vymazat";
            tlacidlo.onclick = () => {fetch("/api/knihy/" + kniha.id, {method: "DELETE"})
                .then(() => nacitajKnihy());
            };
            const cenaBtn = document.createElement("button");
            cenaBtn.textContent = "Zmenit cenu";
            cenaBtn.onclick = () => {
                const vstup = prompt("O koľko € zmeniť cenu ?", "5");
                if (vstup === null || vstup.trim() === "") return;
                const zmena = Number(vstup.replace(",", "."));
                if (!Number.isFinite(zmena)) return alert("Neplatné číslo");
                fetch("/api/knihy/" + kniha.id + "/cena", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({zmena})
                }).then(() => nacitajKnihy());
            };
            const upravBtn = document.createElement("button");
            upravBtn.textContent = "Upraviť knihu";
            upravBtn.onclick = async () => {
                const nazov = prompt("Názov knihy:", kniha.nazov);
                if (nazov === null) return;
                const autor = prompt("Autor:", kniha.autor);
                if (autor === null) return;
                const rokText = prompt("Rok vydania:", kniha.rok);
                if (rokText === null) return;
                const cenaText = prompt("Cena (€):", kniha.cena);
                if (cenaText === null) return;
                const rok = Number(rokText);
                const cena = Number(cenaText.replace(",", "."));
                if (!nazov.trim() || !autor.trim() || !Number.isInteger(rok) ||
                    !Number.isFinite(cena) || cena < 0) {
                    alert("Skontroluj názov, autora, rok a cenu.");
                    return;
                }
                try {
                    const odpoved = await fetch("/api/knihy/" + kniha.id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nazov, autor, rok, cena })
                    });
                    if (!odpoved.ok) {
                        alert("Knihu sa nepodarilo upraviť: " + await odpoved.text());
                        return;
                    }
                    nacitajKnihy();
                } catch (error) {
                    console.error("Chyba pri úprave knihy:", error);
                    alert("Nepodarilo sa spojiť so serverom.");
                }
            };
            bunka.appendChild(upravBtn);
            bunka.appendChild(cenaBtn);
            bunka.appendChild(tlacidlo);
            riadok.appendChild(bunka);
            zoznam.appendChild(riadok);
        });
    });
}

const formular = document.getElementById("formular");
formular.addEventListener("submit", event => {
    event.preventDefault();
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: document.getElementById("rok").value,
        cena: Number(document.getElementById("cena").value)
    };
    fetch("/api/knihy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(kniha)
    })
    .then(() => {
        formular.reset();
        nacitajKnihy();
    });
});

nacitajKnihy();
