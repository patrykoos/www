var strJson = '{"Wstep":"Podstawowe operacje matematyczne", "Pytania":[{"Tresc":"2+3", "Odpowiedz":5, "Kara":8}, {"Tresc":"5-7+20", "Odpowiedz":18, "Kara":5}, {"Tresc":"7*5", "Odpowiedz":35, "Kara":4}, {"Tresc":"1-6", "Odpowiedz":-5, "Kara":7}]}';
var quiz = JSON.parse(strJson);
var numer_pytania = 0;
var ile_odpowiedzonych = 0;
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var koniec = document.getElementById("koniec");
var anuluj = document.getElementById("anuluj");
var submit = document.getElementById("submit");
var odpowiedz = document.getElementById("odpowiedz");
var answered = [];
var answers = new Array(quiz.Pytania.length);
for (var i = 0; i < quiz.Pytania.length; i++) {
    answered[i] = false;
}
koniec.disabled = true;
function loadQuestion() {
    document.getElementById("tresc").innerHTML = quiz.Pytania[numer_pytania].Tresc;
    document.getElementById("kara").innerHTML = "kara za złą odpowiedź: " + quiz.Pytania[numer_pytania].Kara.toString();
    document.getElementById("numer").innerHTML = "numer obecnego pytania: " + (numer_pytania + 1).toString();
    if (answered[numer_pytania]) {
        odpowiedz.disabled = true;
        submit.disabled = true;
    }
    else {
        odpowiedz.disabled = false;
        submit.disabled = false;
    }
    if (numer_pytania === 0)
        prev.disabled = true;
    else
        prev.disabled = false;
    if (numer_pytania === quiz.Pytania.length - 1)
        next.disabled = true;
    else
        next.disabled = false;
}
document.getElementById("ilosc").innerHTML = "ilość pytań: " + quiz.Pytania.length.toString();
document.getElementById("wstep").innerHTML = quiz.Wstep;
loadQuestion();
submit.addEventListener('click', function () {
    answers[numer_pytania] = Number(odpowiedz.value);
    answered[numer_pytania] = true;
    odpowiedz.disabled = true;
    submit.disabled = true;
    ile_odpowiedzonych++;
    if (ile_odpowiedzonych === quiz.Pytania.length) {
        koniec.disabled = false;
    }
});
prev.addEventListener('click', function () {
    numer_pytania--;
    loadQuestion();
});
next.addEventListener('click', function () {
    numer_pytania++;
    loadQuestion();
});
anuluj.addEventListener('click', function () {
    window.open('index.html', '_self');
});
var timer = 0;
var czas_zadanie = new Array(quiz.Pytania.length);
for (var i = 0; i < quiz.Pytania.length; i++) {
    czas_zadanie[i] = 0;
}
var x = setInterval(function () {
    timer++;
    czas_zadanie[numer_pytania]++;
    document.getElementById("czas").innerHTML = timer.toString();
}, 1000);
function addRow(i, tableID) {
    var tableRef = document.getElementById(tableID);
    var newRow = tableRef.insertRow(i);
    var newCell1 = newRow.insertCell(0);
    var newText1 = document.createTextNode((i + 1).toString());
    newCell1.appendChild(newText1);
    var newCell2 = newRow.insertCell(1);
    var newText2;
    var newCell3 = newRow.insertCell(2);
    var newText3;
    var wynik = 0;
    if (answers[i] === quiz.Pytania[i].Odpowiedz) {
        newText2 = document.createTextNode("Tak");
        newText3 = document.createTextNode("0");
    }
    else {
        newText2 = document.createTextNode("Nie");
        newText3 = document.createTextNode(quiz.Pytania[i].Kara.toString());
        wynik += quiz.Pytania[i].Kara;
    }
    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);
    var newCell4 = newRow.insertCell(3);
    var newText4 = document.createTextNode(czas_zadanie[i].toString());
    wynik += czas_zadanie[i];
    newCell4.appendChild(newText4);
    return wynik;
}
var zapisz_wynik = document.getElementById("zapisz_wynik");
var zapisz_wynik_stat = document.getElementById("zapisz_wynik_stat");
var wynik = 0;
koniec.addEventListener('click', function () {
    clearInterval(x);
    koniec.disabled = true;
    anuluj.disabled = true;
    for (var i = 0; i < quiz.Pytania.length; i++) {
        wynik += addRow(i, 'stats');
    }
    document.getElementById("scoreboard").hidden = false;
    document.getElementById("wynik").innerHTML = "wynik: " + wynik;
    zapisz_wynik.style.display = "inline-block";
    zapisz_wynik_stat.style.display = "inline-block";
});
zapisz_wynik.addEventListener('click', function () {
    var stats = { Wynik: wynik, Odpowiedzi: [], Czas: [] };
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
    window.open('index.html', '_self');
});
zapisz_wynik_stat.addEventListener('click', function () {
    var stats = { Wynik: wynik, Odpowiedzi: answers, Czas: czas_zadanie };
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
    window.open('index.html', '_self');
});
