const createSortArr = (data) => {
    let sortArr = [];

    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;

        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + 'Desc').checked;

        sortArr.push({
            column: keySort - 1,
            direction: desc
        });
    }

    return sortArr;
};

let unsortedRows = [];
let wasSorted = false;

const sortTable = (idTable, formData) => {
    
    const sortArr = createSortArr(formData);
    
    let table = document.getElementById(idTable);

    let rowData = Array.from(table.rows);
    
    const headerRow = rowData.shift();
    
    if (!wasSorted) {
        unsortedRows = [...rowData];
    }

    if (sortArr.length === 0) {
        clearTable(idTable);
        table.append(headerRow);

        let tbody = document.createElement('tbody');
        unsortedRows.forEach(item => tbody.append(item));
        table.append(tbody);

        wasSorted = false;
        return;
    }

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;

            let comparison;

            if ((!isNaN(firstCell) && !isNaN(secondCell)) && (column === 4 || column === 5)) {
                comparison = firstCell - secondCell;
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }

        return 0;
    });
    
    clearTable(idTable);
    table.append(headerRow);
    
    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);

    wasSorted = true;
};

const clearTableList = (idTable) => {
    const selectFirst = document.getElementById('fieldsFirst');
    const selectSecond = document.getElementById('fieldsSecond');
    const selectThird = document.getElementById('fieldsThird');

    const checkFirst = document.getElementById('fieldsFirstDesc');
    const checkSecond = document.getElementById('fieldsSecondDesc');
    const checkThird = document.getElementById('fieldsThirdDesc');

    selectFirst.value = 0;
    selectSecond.value = 0;
    selectThird.value = 0;

    checkFirst.checked = false;
    checkSecond.checked = false;
    checkThird.checked = false;

    selectSecond.disabled = true;
    selectThird.disabled = true;

    if (wasSorted) {
        let table = document.getElementById(idTable);

        clearTable(idTable);

        const header = Object.keys(buildings[0]);
        table.append(createHeaderRow(header));

        let tbody = document.createElement('tbody');
        unsortedRows.forEach(item => tbody.append(item));
        table.append(tbody);

        wasSorted = false;
    }
};

const resetSortForm = () => {
    const selectFirst = document.getElementById('fieldsFirst');
    const selectSecond = document.getElementById('fieldsSecond');
    const selectThird = document.getElementById('fieldsThird');

    const checkFirst = document.getElementById('fieldsFirstDesc');
    const checkSecond = document.getElementById('fieldsSecondDesc');
    const checkThird = document.getElementById('fieldsThirdDesc');

    selectFirst.value = 0;
    selectSecond.value = 0;
    selectThird.value = 0;

    checkFirst.checked = false;
    checkSecond.checked = false;
    checkThird.checked = false;

    selectSecond.disabled = true;
    selectThird.disabled = true;

    wasSorted = false;
    unsortedData = [];
};