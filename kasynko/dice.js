let lastBet = ""; // Zmienna do przechowywania ostatniego obstawienia

function betEven() {
    lastBet = "parzysta";
    document.getElementById("betMessage").innerText = "Obstawiono: Parzysta";
}

function betOdd() {
    lastBet = "nieparzysta";
    document.getElementById("betMessage").innerText = "Obstawiono: Nieparzysta";
}

function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("die1").innerText = die1;
    document.getElementById("die2").innerText = die2;

    let message = "";
    const sum = die1 + die2;
    const isEven = (sum % 2 === 0);

    if (isEven && lastBet === "parzysta") {
        message = "Wynik jest parzysty! Wygrałeś!";
        document.getElementById("diceMessage").className = "win";
    } else if (!isEven && lastBet === "nieparzysta") {
        message = "Wynik jest nieparzysty! Wygrałeś!";
        document.getElementById("diceMessage").className = "win";
    } else {
        message = "Przegrałeś. Spróbuj jeszcze raz.";
        document.getElementById("diceMessage").className = "lose";
    }

    document.getElementById("diceMessage").innerText = message;
}
