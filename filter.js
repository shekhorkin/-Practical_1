const correspond = {
    "Бренд": "brand",
    "Ценовая категория": "priceCategory",
    "Музыкальный жанр": "genre",
    "Штаб-квартира": "hq",
    "Год основания": ["yearFrom", "yearTo"],
    "Средняя цена гитары": ["priceFrom", "priceTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } else if (item.id.includes("From")) {
                valInput = -Infinity;
            } else if (item.id.includes("To")) {
                valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }

    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).map(([key, val]) => {
            if (typeof val == "string") {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
            } else if (typeof val == "number") {
                result &&= val >= datafilter[correspond[key][0]] &&
                           val <= datafilter[correspond[key][1]];
            }
        });

        return result;
    });

    clearTable(idTable);

    if (tableFilter.length == 0) {
        const table = document.getElementById(idTable);
        const header = Object.keys(data[0]);
        table.append(createHeaderRow(header));
        currentTableData = [];
        return;
    }

    currentTableData = tableFilter;
    createTable(tableFilter, idTable);
};

const clearFilter = (idTable, data, dataForm) => {
    for (const item of dataForm.elements) {
        if (item.type === "text" || item.type === "number") {
            item.value = "";
        }
    }

    currentTableData = [...data];

    clearTable(idTable);
    createTable(data, idTable);
};