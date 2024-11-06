let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")):100; // Saldo początkowe 100

function updateBalance() {
    document.getElementById("balance").innerText = balance + " PLN";
    localStorage.setItem("balance", balance); // Aktualizuj localStorage
}

function randomizer() {
    return Math.floor(Math.random() * 10);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGame() {
    if (balance < 50) {
        document.getElementById("message").innerText = "Za mało środków, aby zagrać.";
        return;
    }

    balance -= 50; // Opłata za grę
    updateBalance();
    
    document.getElementById("message").innerText = "";
    document.getElementById("slot1").innerText = "-";
    document.getElementById("slot2").innerText = "-";
    document.getElementById("slot3").innerText = "-";

    for (let i = 0; i < 6; i++) {
        document.getElementById("slot1").innerText = randomizer();
        await delay(100);
    }
    const a = randomizer();
    document.getElementById("slot1").innerText = a;
    await delay(1000);

    for (let i = 0; i < 7; i++) {
        document.getElementById("slot2").innerText = randomizer();
        await delay(100);
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById("slot2").innerText = randomizer();
        await delay(200);
    }
    const b = randomizer();
    document.getElementById("slot2").innerText = b;
    await delay(1000);

    for (let i = 0; i < 7; i++) {
        document.getElementById("slot3").innerText = randomizer();
        await delay(100);
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById("slot3").innerText = randomizer();
        await delay(200);
    }
	await delay(400);
    const c = randomizer();
    document.getElementById("slot3").innerText = c;

    let message = "";
    if (a === 7 && a === b && a === c) {
        balance += 1500;
        message = "BIG JACKPOT!";
        document.getElementById("message").className = "jackpot";
    } else if (a === b && a === c) {
        balance += 900;
        message = "JACKPOT!";
        document.getElementById("message").className = "jackpot";
    } else if (a === b) {
        balance += 250;
        message = "Mała wygrana!";
        document.getElementById("message").className = "small-win";
    } else {
        message = "Brak wygranej, spróbuj jeszcze raz.";
        document.getElementById("message").className = "no-win";
    }

    document.getElementById("message").innerText = message;
    updateBalance();
}

// Wywołaj funkcję, aby zaktualizować saldo po załadowaniu strony
window.onload = updateBalance;
