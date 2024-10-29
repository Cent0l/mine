function loadBalance() {
    const balance = localStorage.getItem("balance") || 0;
    document.getElementById("balance").innerText = balance;
}

function updateBalance() {
    const depositInput = document.getElementById("depositInput");
    const depositAmount = parseInt(depositInput.value, 10) || 0;

    let currentBalance = parseInt(localStorage.getItem("balance"), 10) || 0;

    // Ustaw wartość wpłaty na 0, jeśli jest ujemna
    if (depositAmount < 0) {
        currentBalance = Math.max(0, currentBalance + depositAmount);
    } else {
        currentBalance += depositAmount;
    }

    localStorage.setItem("balance", currentBalance);
    document.getElementById("balance").innerText = currentBalance;
    depositInput.value = ""; // Wyczyszczenie pola
}

window.onload = loadBalance;
