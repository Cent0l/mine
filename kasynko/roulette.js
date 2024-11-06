let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 100;

function updateBalance() {
    document.getElementById("balance").innerText = balance + " PLN";
    localStorage.setItem("balance", balance);
}

let playerBet = "";

// Funkcje obstawiania zakresów
function betRange1() {
    playerBet = "range1";
    document.getElementById("betMessage").innerText = "Obstawiono: Zakres 0-25";
}

function betRange2() {
    playerBet = "range2";
    document.getElementById("betMessage").innerText = "Obstawiono: Zakres 26-50";
}

function betRange3() {
    playerBet = "range3";
    document.getElementById("betMessage").innerText = "Obstawiono: Zakres 51-75";
}

function betRange4() {
    playerBet = "range4";
    document.getElementById("betMessage").innerText = "Obstawiono: Zakres 76-99";
}

function betRed() {
    playerBet = "red";
    document.getElementById("betMessage").innerText = "Obstawiono: Czerwone (Nieparzyste)";
}

function betBlack() {
    playerBet = "black";
    document.getElementById("betMessage").innerText = "Obstawiono: Czarne (Parzyste)";
}
function betGreen() {
    playerBet = "green";
    document.getElementById("betMessage").innerText = "Obstawiono: Zielone(0)";
}
function rollDice() {
    document.getElementById("diceMessage").innerText = "";
    if (balance < 50) {
        document.getElementById("diceMessage").innerText = "Za mało środków, aby zagrać.";
        return;
    }
    balance -= 50;
    updateBalance();
    
    let results = [];  
    let colors = ["red", "black", "green"];
    
    for (let i = 0; i < 6; i++) {
        const result = Math.floor(Math.random() * 100); 
        let color;
        if (result === 0) {
            color = "green"; 
        } else if (result % 2 === 0) {
            color = "black"; 
        } else {
            color = "red";   
        }
        results.push({ result, color });
    }

    let currentIndex = 0;
    
    // Funkcja do wyświetlania wyników jeden po drugim
    function showNextResult() {
        if (currentIndex < results.length) {
            const res = results[currentIndex];
            document.getElementById("result").innerText = ` ${res.result}`;
            document.getElementById("colorBox").innerText = res.color[0].toUpperCase();
            document.getElementById("colorBox").style.backgroundColor = res.color;

            currentIndex++;
            setTimeout(showNextResult, 500);  // Czekaj 0,5 sekundy przed wyświetleniem kolejnego
        } else {
            // Gdy wyniki zostały wyświetlone, wybierz ostateczny wynik
            const finalResult = results[results.length - 1];  // Ostateczny wynik to ostatni
            const win = checkWin(finalResult);  // Sprawdzamy, czy wygrana
            
            if (win.win) { // Sprawdzamy, czy wygrana
                balance += win.amount;
                document.getElementById("diceMessage").innerText = 'Wygrana! Gratulacje!';
                document.getElementById("diceMessage").className = "small-win";
            } else {
                document.getElementById("diceMessage").innerText = "Przegrana, spróbuj jeszcze raz.";
                document.getElementById("diceMessage").className = "no-win";
            }
            
            updateBalance();  // Aktualizujemy saldo po obróbce
        }
    }
    
    showNextResult();  // Rozpocznij wyświetlanie wyników
}


// Funkcja sprawdzająca wygraną
function checkWin(finalResult) {
    let win = false;
    let winnings = 0;
    
    if ((playerBet === "range1" && finalResult.result >= 1 && finalResult.result <= 25) ||
        (playerBet === "range2" && finalResult.result >= 26 && finalResult.result <= 50) ||
        (playerBet === "range3" && finalResult.result >= 51 && finalResult.result <= 75) ||
        (playerBet === "range4" && finalResult.result >= 76 && finalResult.result <= 99)) {
        win = true;
        winnings = 100; 
    } else if ((playerBet === "red" && finalResult.color === "red") ||
               (playerBet === "black" && finalResult.color === "black")) {
        win = true;
        winnings = 200; 
    } else if ((playerBet === "green" && finalResult.color === "green")) 
                {
        win = true;
        winnings = 1000; 
    }

	

    return { win, amount: winnings };
}

window.onload = updateBalance;
