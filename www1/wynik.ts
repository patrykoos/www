interface StatystykiRoot {
    Wynik: number;
    Odpowiedzi: number[];
    Czas: number[];
}

function newRow(i : number, tableID : string) {

    let stringJSON : string = localStorage.getItem(i.toString());
    let obj : StatystykiRoot = JSON.parse(stringJSON);
    if(obj){
        let tableRef = document.getElementById(tableID) as HTMLTableSectionElement;
  
        let newRow = tableRef.insertRow(-1);
        let newCell1 = newRow.insertCell(0);
      
        let newText1 = document.createTextNode((i+1).toString());
        newCell1.appendChild(newText1);
    
        let newCell2 = newRow.insertCell(1);
    
        let newText2 = document.createTextNode(obj.Wynik.toString());
    
        newCell2.appendChild(newText2);
    }
    else{
        let tableRef = document.getElementById(tableID) as HTMLTableSectionElement;
  
        let newRow = tableRef.insertRow(-1);
        let newCell1 = newRow.insertCell(0);
      
        let newText1 = document.createTextNode((i+1).toString());
        newCell1.appendChild(newText1);
    
        let newCell2 = newRow.insertCell(1);
    
        let newText2 = document.createTextNode((i+1).toString());
    
        newCell2.appendChild(newText2);
    }
}

for(let i = 0; i < localStorage.length; i++){
    newRow(i, 'stats2');
}
