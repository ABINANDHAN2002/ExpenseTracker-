// Initial Data - empty by default
let tableEntries = [];

// Function to update summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => e.type === 1 ? t + e.amount : t, 0);
    let totalExpense = tableEntries.reduce((ex, e) => e.type === 0 ? ex + e.amount : ex, 0);

    updatedInc.innerText = totalIncome === 0 ? "" : totalIncome;
    updatedExp.innerText = totalExpense === 0 ? "" : totalExpense;
    updatedBal.innerText = (totalIncome - totalExpense) === 0 ? "" : (totalIncome - totalExpense);
}

// Function to add new entry
function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    // Input validation
    if (name.value.trim() === "" || Number(amount.value) <= 0) {
        return alert("Incorrect Input");
    }

    tableEntries.push({
        type: Number(type),
        name: name.value.trim(),
        amount: Number(amount.value)
    });

    updateTable();
    name.value = "";
    amount.value = 0;
}

// Function to render a single row
function loadItems(e, i) {
    let cls;
    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);

    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);

    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    c4.innerHTML = "&#9746;";
    c4.classList.add("zoom");
    c4.addEventListener("click", () => del(e));

    if (e.type === 0) {
        cls = "red";
        c3.innerHTML = "&#10138;"; // arrow for expense
    } else {
        cls = "green";
        c3.innerHTML = "&#10136;"; // arrow for income
    }
    c3.style.color = cls;
}

// Clear table rows
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Delete entry
function del(el) {
    remove();
    tableEntries = tableEntries.filter((e) => e.name !== el.name);
    tableEntries.forEach((e, i) => loadItems(e, i));
    updateSummary();
}

// Update table
function updateTable() {
    remove();
    tableEntries.forEach((e, i) => loadItems(e, i));
    updateSummary();
}

// Initial load
updateTable();
