const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
]

let transactions = dummyTransactions;

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateRandomId(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
const generateRandomId = () => {
    return Math.floor(Math.random() * 1000);
}

// Add transactions to DOM List
const addTransactionDOM = (transaction) => {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML =
        `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>
        `

    list.appendChild(item);
}

// Update the balance, income and expense
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, cur) => (acc += cur), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, prev) => (acc += prev), 0)
        .toFixed(2);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, prev) => (acc += prev), 0) * -1
        .toFixed(2);

    balance.innerText = `$${total}`;
    moneyMinus.innerText = `$${expense}`;
    moneyPlus.innerText = `$${income}`;
}

// Remove transaction by ID
const removeTransaction = (id) => {
    console.log(123)
    transactions = transactions.filter(transaction => transaction.id !== id)
    init();
}

// Init app
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// event listeners
form.addEventListener('submit', addTransaction);
