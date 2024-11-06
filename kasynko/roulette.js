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
 
function betRed() {
    playerBet = "red";
    document.getElementById("betMessage").innerText = "Obstawiono: Czerwone (Parzyste)";
}
 
function betBlack() {
    playerBet = "black";
    document.getElementById("betMessage").innerText = "Obstawiono: Zielone (Nieparzyste)";
}
 
function rollDice() {
    if (balance < 50) {
        document.getElementById("diceMessage").innerText = "Za mało środków, aby zagrać.";
        return;
    }
    balance -= 50;
    updateBalance();
 
    const result = Math.floor(Math.random() * 100) + 1;
    let color;
    if (result >= 1 && result <= 25) {
        color = "red";
    } else if (result >= 26 && result <= 50) {
        color = "green";
    } else if (result >= 51 && result <= 75) {
        color = "red";
    } else {
        color = "green";
    }
 
    const isEven = result % 2 === 0;
    let win = false;
 
    if ((playerBet === "even" && isEven) ||
        (playerBet === "odd" && !isEven) ||
        (playerBet === "red" && color === "red") ||
        (playerBet === "black" && color === "green")) {
        win = true;
    }
 
    if (win) {
        balance += 100;
        document.getElementById("diceMessage").innerText = "Wygrana! Gratulacje!";
        document.getElementById("diceMessage").className = "small-win";
    } else {
        document.getElementById("diceMessage").innerText = "Przegrana, spróbuj jeszcze raz.";
        document.getElementById("diceMessage").className = "no-win";
    }
 
    document.getElementById("result").innerText = `Wynik: ${result}`;
    document.getElementById("colorBox").innerText = color.toUpperCase();
    document.getElementById("colorBox").style.backgroundColor = color;
    updateBalance();
}
 
window.onload = updateBalance;