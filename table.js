const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);

    const header = Object.keys(guitars[0]);

    const headerRow = createHeaderRow(header);
    table.append(headerRow);

    if (data.length > 0) {
        const bodyRows = createBodyRows(data);
        table.append(bodyRows);
    }
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });

    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const tr = document.createElement('tr');

        for (const key in item) {
            const td = document.createElement('td');
            td.innerHTML = item[key];
            tr.append(td);
        }

        tbody.append(tr);
    });

    return tbody;
};

const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = "";
};