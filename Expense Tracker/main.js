const state = {
    earnings: 0,
    expenses: 0,
    net: 0,
    transaction:  JSON.parse(localStorage.getItem('transactions')) || [
        {
            id: 6,
            text: "Example",
            amount: 500,
            type: "credit",
        },
    ]
};

let isUpdate = false;
let tid;

const tForm = document.querySelector("#form");

const saveTransactions = () => {
    localStorage.setItem('transactions', JSON.stringify(state.transaction));
};


const renderTransaction = () => {
    const transactionContainer = document.querySelector(".transactions");
    const netAmtEl = document.querySelector("#net");
    const earningsEl = document.querySelector("#earnings");
    const expensesEl = document.querySelector("#expenses");
    const transactions = state.transaction;

    let earnings = 0;
    let expenses = 0;

    transactionContainer.innerHTML = "";
    transactions.forEach((transaction) => {
        const isCredit = transaction.type === "credit";
        const sign = isCredit ? "+" : "-";

        const transactionEl = `
            <div class="transaction" id="${transaction.id}">
                <div class="content" onclick="show(${transaction.id})">
                    <div class="left">
                        <p>${transaction.text}</p>
                        <p>${sign} ₨ ${transaction.amount}</p>
                    </div>
                    <div class="status ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>
                </div>
                <div class="lower">
                    <div class="icon" onclick="handleUpdate(${transaction.id})">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div class="icon" onclick="handleDelete(${transaction.id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>`;

        if (isCredit) {
            earnings += transaction.amount;
        } else {
            expenses += transaction.amount;
        }

        transactionContainer.insertAdjacentHTML("afterbegin", transactionEl);
    });

    const net = earnings - expenses;

    netAmtEl.innerHTML = `₨ ${net}`;
    earningsEl.innerHTML = `₨ ${earnings}`;
    expensesEl.innerHTML = `₨ ${expenses}`;
}

const addTransaction = (e) => {
    e.preventDefault();
    const isEarn = e.submitter.id === 'earn';

    const formData = new FormData(tForm);
    const tData = {};
    formData.forEach((value, key) => {
        tData[key] = value;
    });

    state.transaction = state.transaction.filter(t => t.text !== "Example");

    const transaction = {
        id: isUpdate ? tid : Math.floor(Math.random() * 1000),
        text: tData.text,
        amount: +tData.amount,
        type: isEarn ? "credit" : "debit",
    }

    if (isUpdate) {
        const tIndex = state.transaction.findIndex((t) => t.id == tid);
        state.transaction[tIndex] = transaction;
        isUpdate = false;
        tid = null;
    } else {
        state.transaction.push(transaction);
    }

    tForm.reset();
    saveTransactions();
    renderTransaction();
}

const show = (id) => {
    const selectedTrans = document.getElementById(id);
    const lowerEl = selectedTrans.querySelector(".lower");
    lowerEl.classList.toggle("show");
}

const handleDelete = (id) => {
    const filteredTrans = state.transaction.filter((t) => t.id !== id);
    state.transaction = filteredTrans;
    saveTransactions();
    renderTransaction();
}

const handleUpdate = (id) => {
    const transaction = state.transaction.find((t) => t.id === id);
    const textInput = document.querySelector("input[name='text']");
    const amtInput = document.querySelector("input[name='amount']");
    textInput.value = transaction.text;
    amtInput.value = transaction.amount;
    tid = id;
    isUpdate = true;
}

renderTransaction();

tForm.addEventListener("submit", addTransaction);

tForm.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
