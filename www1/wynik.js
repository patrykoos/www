function newRow(i, tableID) {
    var stringJSON = localStorage.getItem(i.toString());
    var obj = JSON.parse(stringJSON);
    if (obj) {
        var tableRef = document.getElementById(tableID);
        var newRow_1 = tableRef.insertRow(-1);
        var newCell1 = newRow_1.insertCell(0);
        var newText1 = document.createTextNode((i + 1).toString());
        newCell1.appendChild(newText1);
        var newCell2 = newRow_1.insertCell(1);
        var newText2 = document.createTextNode(obj.Wynik.toString());
        newCell2.appendChild(newText2);
    }
    else {
        var tableRef = document.getElementById(tableID);
        var newRow_2 = tableRef.insertRow(-1);
        var newCell1 = newRow_2.insertCell(0);
        var newText1 = document.createTextNode((i + 1).toString());
        newCell1.appendChild(newText1);
        var newCell2 = newRow_2.insertCell(1);
        var newText2 = document.createTextNode((i + 1).toString());
        newCell2.appendChild(newText2);
    }
}
for (var i = 0; i < localStorage.length; i++) {
    newRow(i, 'stats2');
}
