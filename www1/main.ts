const strJson = '{"Wstep":"Podstawowe operacje matematyczne", "Pytania":[{"Tresc":"2+3", "Odpowiedz":5, "Kara":8}, {"Tresc":"5-7+20", "Odpowiedz":18, "Kara":5}, {"Tresc":"7*5", "Odpowiedz":35, "Kara":4}, {"Tresc":"1-6", "Odpowiedz":-5, "Kara":7}]}';

interface Pytania {
    Tresc: string;
    Odpowiedz: number;
    Kara: number;
}

interface RootObject {
    Wstep: string;
    Pytania: Pytania[];
}

let quiz : RootObject  = JSON.parse(strJson);
let numer_pytania : number = 0;
let ile_odpowiedzonych = 0;

let prev = document.getElementById("prev") as HTMLButtonElement;
let next = document.getElementById("next") as HTMLButtonElement;
let koniec = document.getElementById("koniec") as HTMLButtonElement;
let anuluj = document.getElementById("anuluj") as HTMLButtonElement;
let submit = document.getElementById("submit") as HTMLButtonElement;
let odpowiedz = document.getElementById("odpowiedz") as HTMLInputElement;

let answered : boolean[] = [];
let answers : number[] = new Array(quiz.Pytania.length);

for(let i = 0; i < quiz.Pytania.length; i++){
    answered[i] = false;
}

koniec.disabled = true;

function loadQuestion() {
    document.getElementById("tresc").innerHTML = quiz.Pytania[numer_pytania].Tresc;
    document.getElementById("kara").innerHTML = "kara za złą odpowiedź: " + quiz.Pytania[numer_pytania].Kara.toString();
    document.getElementById("numer").innerHTML = "numer obecnego pytania: " + (numer_pytania+1).toString();

    if(answered[numer_pytania]){
        odpowiedz.disabled = true;
        submit.disabled = true;
    }
    else{
        odpowiedz.disabled = false;
        submit.disabled = false;
    }

    if(numer_pytania === 0)
        prev.disabled = true;
    else
        prev.disabled = false;

    if(numer_pytania === quiz.Pytania.length - 1)
        next.disabled = true;
    else
        next.disabled = false;
}

document.getElementById("ilosc").innerHTML = "ilość pytań: " + quiz.Pytania.length.toString();
document.getElementById("wstep").innerHTML = quiz.Wstep;
loadQuestion();

submit.addEventListener('click', () => {
    answers[numer_pytania] = Number(odpowiedz.value);
    answered[numer_pytania] = true;
    odpowiedz.disabled = true;
    submit.disabled = true;
    ile_odpowiedzonych++;
    if(ile_odpowiedzonych === quiz.Pytania.length){
        koniec.disabled = false;
    }
})

prev.addEventListener('click', () => {
    numer_pytania--;
    loadQuestion();
})

next.addEventListener('click', () => {
    numer_pytania++;
    loadQuestion();
})

anuluj.addEventListener('click', () => {
    window.open('index.html', '_self');
})

let timer : number = 0;

let czas_zadanie : number[] = new Array(quiz.Pytania.length);

for(let i = 0; i < quiz.Pytania.length; i++){
    czas_zadanie[i] = 0;
}

var x = setInterval(function() {
    timer++;
    czas_zadanie[numer_pytania]++;
    document.getElementById("czas").innerHTML = timer.toString();
}, 1000);

function addRow(i : number, tableID : string) : number {
    let tableRef = document.getElementById(tableID) as HTMLTableSectionElement;
  
    let newRow = tableRef.insertRow(i);
    let newCell1 = newRow.insertCell(0);
  
    let newText1 = document.createTextNode((i+1).toString());
    newCell1.appendChild(newText1);

    let newCell2 = newRow.insertCell(1);
    let newText2 : Text;

    let newCell3 = newRow.insertCell(2);
    let newText3 : Text;

    let wynik = 0;

    if(answers[i] === quiz.Pytania[i].Odpowiedz){
        newText2 = document.createTextNode("Tak");
        newText3 = document.createTextNode("0");
    }
    else{
        newText2 = document.createTextNode("Nie");
        newText3 = document.createTextNode(quiz.Pytania[i].Kara.toString());
        wynik += quiz.Pytania[i].Kara;
    }

    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);

    let newCell4 = newRow.insertCell(3);

    let newText4 = document.createTextNode(czas_zadanie[i].toString());
    wynik += czas_zadanie[i];

    newCell4.appendChild(newText4);

    return wynik;
}

let zapisz_wynik = document.getElementById("zapisz_wynik") as HTMLButtonElement;
let zapisz_wynik_stat = document.getElementById("zapisz_wynik_stat") as HTMLButtonElement;

let wynik = 0;

koniec.addEventListener('click', () => {
    clearInterval(x);
    koniec.disabled = true;
    anuluj.disabled = true;
    for(let i = 0; i < quiz.Pytania.length; i++){
        wynik += addRow(i, 'stats');
    }
    document.getElementById("scoreboard").hidden = false;
    document.getElementById("wynik").innerHTML = "wynik: " + wynik;
    zapisz_wynik.style.display = "inline-block";
    zapisz_wynik_stat.style.display = "inline-block";
})

interface StatystykiRoot {
    Wynik: number;
    Odpowiedzi: number[];
    Czas: number[];
}

zapisz_wynik.addEventListener('click', () => {
    let stats : StatystykiRoot = {Wynik: wynik, Odpowiedzi: [], Czas: []};
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
    window.open('index.html', '_self');
})

zapisz_wynik_stat.addEventListener('click', () => {
    let stats : StatystykiRoot = {Wynik: wynik, Odpowiedzi: answers, Czas: czas_zadanie};
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
    window.open('index.html', '_self');
})