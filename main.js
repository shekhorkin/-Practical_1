let currentTableData = [];

document.addEventListener("DOMContentLoaded", function() {
    currentTableData = [...guitars];
    createTable(guitars, 'list');

    const form = document.getElementById('filter');
    const buttonFind = form.querySelector('input[value="Найти"]');
    const buttonClear = form.querySelector('input[value="Очистить фильтры"]');

    buttonFind.addEventListener('click', function () {
        filterTable(guitars, 'list', form);
        resetSortForm();
        setSortSelects(guitars[0], document.getElementById('sort'));
    });

    buttonClear.addEventListener('click', function () {
        clearFilter('list', guitars, form);
        resetSortForm();
        setSortSelects(guitars[0], document.getElementById('sort'));
    });

    const sortForm = document.getElementById('sort');
    const selectFirst = document.getElementById('fieldsFirst');
    const selectSecond = document.getElementById('fieldsSecond');
    const selectThird = document.getElementById('fieldsThird');

    setSortSelects(guitars[0], sortForm);

    selectFirst.addEventListener('change', function () {
        if (selectFirst.value == 0) {
            selectSecond.disabled = true;
            selectSecond.value = 0;
            selectThird.disabled = true;
            selectThird.value = 0;
        } else {
            changeNextSelect(selectFirst, 'fieldsSecond');
            selectThird.disabled = true;
            selectThird.value = 0;
        }
    });

    selectSecond.addEventListener('change', function () {
        if (selectSecond.value == 0) {
            selectThird.disabled = true;
            selectThird.value = 0;
        } else {
            changeNextSelect(selectSecond, 'fieldsThird');
        }
    });

    const buttonSort = sortForm.querySelector('input[value="Сортировать"]');
    const buttonClearSort = sortForm.querySelector('input[value="Сбросить сортировку"]');

    buttonSort.addEventListener('click', function () {
        sortTable('list', sortForm);
    });

    buttonClearSort.addEventListener('click', function () {
        clearTableList('list');
    });
});

// формирование полей элемента списка с заданным текстом и значением
const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

// формирование поля со списком
const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = "";
    sortSelect.append(createOption('Нет', 0));

    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');

    let count = 0;

    for (const item of allSelect) {
        setSortSelect(head, item);

        if (count > 0) {
            item.disabled = true;
        } else {
            item.disabled = false;
        }

        count++;
    }
};

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);

    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
};