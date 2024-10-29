let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 100;

function updateBalance() {
    document.getElementById("balance").innerText = balance + " PLN";
    localStorage.setItem("balance", balance);
}

let playerBet = "";

function betEven() {
    playerBet = "even";
    document.getElementById("betMessage").innerText = "Obstawiono: Parzysta";
}

function betOdd() {
    playerBet = "odd";
    document.getElementById("betMessage").innerText = "Obstawiono: Nieparzysta";
}

function rollDice() {
    if (balance < 50) {
        document.getElementById("diceMessage").innerText = "Za mało środków, aby zagrać.";
        return;
    }

    balance -= 50;
    updateBalance();

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;

    document.getElementById("die1").innerText = die1;
    document.getElementById("die2").innerText = die2;

    let win = (total % 2 === 0 && playerBet === "even") || (total % 2 !== 0 && playerBet === "odd");

    if (win) {
        balance += 100;
        document.getElementById("diceMessage").innerText = "Wygrana! Gratulacje!";
        document.getElementById("diceMessage").className = "small-win";
    } else {
        document.getElementById("diceMessage").innerText = "Przegrana, spróbuj jeszcze raz.";
        document.getElementById("diceMessage").className = "no-win";
    }

    updateBalance();
}

// Wywołaj funkcję, aby zaktualizować saldo po załadowaniu strony
window.onload = updateBalance;
