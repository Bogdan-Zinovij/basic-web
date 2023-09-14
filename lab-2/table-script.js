function generateCells(tableSize) {
    let idCount = 1;
    for (let i = 0; i < tableSize.columns; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < tableSize.rows; j++) {
            const column = document.createElement("td");
            column["id"] = idCount;
            column.textContent = idCount;
            row.appendChild(column);
            idCount++;
        }

        const table = document.querySelector(".table");
        table.appendChild(row);
    }
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
}

const tableSize = { columns: 6, rows: 6 };
generateCells(tableSize);

const myVarNumber = 9;
const myCell = document.getElementById(myVarNumber);
const colorPicker = document.querySelector(".color-picker");

myCell.addEventListener("mouseover", () => {
    myCell.style.backgroundColor = getRandomColor();
});

myCell.addEventListener("click", () => {
    myCell.style.backgroundColor = colorPicker.value;
});

myCell.addEventListener("dblclick", () => {
    const elementsToChange = [];
    const numberOfCells = tableSize.columns * tableSize.rows;
    for (let i = myVarNumber; i <= numberOfCells; i += tableSize.columns * 2) {
        elementsToChange.push(document.getElementById(i));
    }
    elementsToChange.forEach((element) => {
        element.style.backgroundColor = colorPicker.value;
    });
});
