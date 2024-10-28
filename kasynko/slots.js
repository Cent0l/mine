function randomizer() {
    return Math.floor(Math.random() * 10);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGame() {
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

    for (let i = 0; i < 6; i++) {
        document.getElementById("slot2").innerText = randomizer();
        await delay(100);
    }
    const b = randomizer();
    document.getElementById("slot2").innerText = b;
    await delay(1000);

    for (let i = 0; i < 6; i++) {
        document.getElementById("slot3").innerText = randomizer();
        await delay(100);
    }
    const c = randomizer();
    document.getElementById("slot3").innerText = c;

    let message = "";
    if (a === b && a === c) {
        message = "JACKPOT!";
        document.getElementById("message").className = "jackpot";
    } else if (a === b) {
        message = "Mała wygrana!";
        document.getElementById("message").className = "small-win";
    } else {
        message = "Brak wygranej, spróbuj jeszcze raz.";
        document.getElementById("message").className = "no-win";
    }

    document.getElementById("message").innerText = message;
}
