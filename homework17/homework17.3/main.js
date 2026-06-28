class BankAccount {
    #balance;

    constructor(initialBalance = 0) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return { success: true, msg: `Успішно внесено ${amount} ₴` };
        }
        return { success: false, msg: "Сума має бути більшою за 0" };
    }

    withdraw(amount) {
        if (amount <= 0) {
            return { success: false, msg: "Сума має бути більшою за 0" };
        }
        if (amount > this.#balance) {
            return { success: false, msg: "Недостатньо коштів на рахунку" };
        }
        this.#balance -= amount;
        return { success: true, msg: `Успішно знято ${amount} ₴` };
    }

    getBalance() {
        return this.#balance;
    }
}

const myAccount = new BankAccount(1000);

// Елементи сторінки (DOM)
const balanceDisplay = document.getElementById('balance-value');
const amountInput = document.getElementById('amount-input');
const msgDisplay = document.getElementById('msg');

function updateUI() {
    balanceDisplay.textContent = myAccount.getBalance();
    amountInput.value = ''; 
}

function showMessage(result) {
    msgDisplay.textContent = result.msg;
    msgDisplay.className = 'message ' + (result.success ? 'success' : 'error');
  
    setTimeout(() => { msgDisplay.textContent = ''; }, 3000);
}

function handleDeposit() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) return showMessage({ success: false, msg: "Введіть коректне число" });

    const result = myAccount.deposit(amount);
    if (result.success) updateUI();
    showMessage(result);
}

function handleWithdraw() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) return showMessage({ success: false, msg: "Введіть коректне число" });

    const result = myAccount.withdraw(amount);
    if (result.success) updateUI();
    showMessage(result);
}