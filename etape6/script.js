/*Ici on utilise use strict, vu dans le slide 51 */
"use strict"
/*Ici on utilise une declaration de variable , vu dans le slide 37 */
let total_points= 0;
let lignes = 0;
/*Ici on utilise les tableaux, vu dans le slide 38 */
const persons = [
  {
    nom: "person",
    prenom: "person",
    points: 1,
  },
  {
    nom: "person",
    prenom: "person",
    points: 1,
  },
  {
    nom: "person",
    prenom: "person",
    points: 15,
  },
]
/*Ici on utilise une fonction, vu dans le slide 45 */
function init(){
   /*Ici on utilise une boucle, vu dans le slide 44 */
  for (const person of persons) {
    /*Ici on utilise un appel de fonction , vu dans le slide 47 */
    doInsert(person.nom,person.prenom,person.points);
    total_points = total_points + person.points;
  }
/*Ici on utilise un appel de fonction , vu dans le slide 47 */
  update_summary();
}

function update_summary(){
  /*Ici on utilise retrouver un element par id , vu dans le slide 64 */
  const element_lignes = document.getElementById("p1");
  const element_points = document.getElementById("p3");
  /*Ici on utilise une opperation , vu dans le slide 41 */
  element_lignes.innerHTML = lignes +" ligne(s)";
  element_points.innerHTML = "Totale point(s)= "+ total_points;
}
function doInsert(nom,prenom,points){
  /*Ici on utilise un appel de fonction , vu dans le slide 47 */
  doInsertRowTable(lignes+1, nom, prenom, points);
   /*Ici on utilise une opperation , vu dans le slide 41 */
  lignes++;
}
/*Ici on utilise une fonction, vu dans le slide 45 */
function doInsertRowTable(num,nom,prenom,points){
  /*Ici on utilise le querySelector, vu dans le slide 76 */
    const table = document.querySelector("table");
   /*Ici on utilise la methode createElement et appendChild  , vu dans le slide 104 */
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");
    /*Ici on utilise innerText, vu dans le slide 90 */
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;
  /*Ici on utilise l' acces aux attributs, vu dans le slide 92 */
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    col5.appendChild(checkbox);
    /*Ici on utilise setAttribute, vu dans le slide 107 */
    col1.setAttribute("class","col_number");
    col2.setAttribute("class","col_text");
    col3.setAttribute("class","col_text");
    col4.setAttribute("class","col_number");
    col5.setAttribute("class","col_chkbox");
    /*Ici on utilise la methode appendChild  , vu dans le slide 104 */
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);

    table.appendChild(row);
}

function ConsoleTableau(){
   /*Ici on utilise une boucle, vu dans le slide 44 */
  for (let i = 0; i < persons.length; i++){
     /*Ici on utilise console.log et concatenation, vu dans le slide 33 */
    console.log(i +":", persons[i])
  }
}
/*Ici on utilise un appel de fonction , vu dans le slide 47 */
init();
console.log(total_points);

function doNewData(){
  /*Ici on utilise retrouver un element par id , vu dans le slide 64 */
  const elt_nom = document.getElementById("form_nom") ;
  const elt_prenom = document.getElementById("form_prenom");
  const elt_points = document.getElementById("form_points");
  /*Ici on utilise .value , utilise avec une recherche*/
  let nom = elt_nom.value
  let prenom = elt_prenom.value
  /*Ici on utilise parseInt , demande tp page 53 */
  let points = parseInt(elt_points.value)

  total_points = total_points + points;
  /*Ici on utilise une condition, vu dans le slide 42 */
  /*Ici on utilise ou et egalite , demande tp page 41 */
  if(nom === "" || prenom === "" || points===""){
    /*Ici on utilise une alerte, vu dans le slide 34 */
    alert("Formulaire Incomplet !")
  } else{
      doInsert(nom,prenom,points);
      /*Ici on utilise push, vu dans le slide 38 */
    persons.push({nom : nom ,prenom : prenom,points : points});
  }
  elt_nom.value= ""
  elt_prenom.value = ""
  elt_points.value = ""

  update_summary();
}

function deleteRow(){
  /*Ici on utilise une condition, vu dans le slide 42 */
  /*Ici on utilise ou et egalite , demande tp page 41 */
  if( lignes === 0){
     /*Ici on utilise une alerte, vu dans le slide 34 */
    alert("Erreure !");
    return;
  }
  /*Ici on utilise le querySelector, vu dans le slide 76 */
  /*Ici on utilise le querySelectorAll, vu dans le slide 76 */
  const table = document.querySelector("table")
  const liste = table.querySelectorAll(".col_chkbox input")

  let checked = false;
  /*Ici on utilise une boucle, vu dans le slide 44 */
  for(const c of liste){
    if(c.checked){
      checked = true;
    }
  }
  if(checked === false){
    alert("Selectionner au moins une ligne !");
    return;
  }
  /*Ici on utilise confirm, trouve sur le site w3 page 87 */
  const confirmer = confirm("Confirmer la suppression")
  if (confirmer === false) {return;}
   /*Ici on utilise le querySelector, vu dans le slide 76 */
  /*Ici on utilise le querySelectorAll, vu dans le slide 76 */
  const ligne = document.querySelectorAll("tr.row")
   for (let i = ligne.length -1; i>=0;i--){
    let li = ligne[i];
    const z = li.querySelector(".col_chkbox input[type='checkbox']");
    if (z.checked){
      let points =parseInt(li.cells[3].innerText)
      total_points = total_points-points;
      lignes--;
      persons.splice(i,1);
      li.remove();
    }
  }
  console.log("Supprimer avec succes");
  update_summary();
}

/*on remarque que la page ne sauvegarde pas les information quand on refresh*/

/*Ici on a tout les ajouts qui on été efféctués*/
/*Option 1 : de Filtrage*/
function removeAllRows(){
  while (document.querySelector(".row") !== null) {
    document.querySelector(".row").remove();
  }
}

let nomState = 1;
let prenomState = 1;
let pointsState = 1;

function filtreNom(buttonElement){
  if (prenomState != 1 || pointsState != 1) {
    filtrePointsNormal();
    filtrePrenomNormal();
    nomState = 1;
    prenomState = 1;
  }

  if (nomState == 1) {
    buttonElement.textContent = "Affichage Dsc";
    filtreNomAsc();
    nomState = 2;
  } else if (nomState == 2) {
    buttonElement.textContent = "Affichage Asc";
    filtreNomDes();
    nomState = 3;
  } else {
    buttonElement.textContent = "Affichage Stdr";
    filtreNomNormal();
    nomState = 1;
  }
}
function filtrePrenom(buttonElement){
  if (nomState != 1 || pointsState != 1) {
    filtreNomNormal();
    filtrePointsNormal();
    nomState = 1;
    pointsState = 1;
  }

  if (prenomState == 1) {
    buttonElement.textContent = "Affichage Dsc";
    filtrePrenomAsc();
    prenomState = 2;
  } else if (prenomState == 2) {
    buttonElement.textContent = "Affichage Asc";
    filtrePrenomDes();
    prenomState = 3;
  } else {
    buttonElement.textContent = "Affichage Stdr";
    filtrePrenomNormal();
    prenomState = 1;
  }
}

function filtrePoints(buttonElement){
  if (nomState != 1 || prenomState != 1) {
    filtreNomNormal();
    filtrePrenomNormal();
    nomState = 1;
    prenomState = 1;
  }

  if (pointsState == 1) {
    buttonElement.textContent = "Affichage Dsc";
    filtrePointsAsc();
    pointsState = 2;
  } else if (pointsState == 2) {
    buttonElement.textContent = "Affichage Asc";
    filtrePointsDes();
    pointsState = 3;
  } else {
    buttonElement.textContent = "Affichage Stdr";
    filtrePointsNormal();
    pointsState = 1;
  }
}

function filtreNomAsc(){
  removeAllRows()
  const sortedPersons = [...persons].sort((a, b) => a.nom.localeCompare(b.nom));
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }
  
  update_summary();
}
function filtrePrenomAsc(){
  removeAllRows()

  const sortedPersons = [...persons].sort((a, b) => a.prenom.localeCompare(b.prenom));
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}
function filtrePointsAsc(){
  removeAllRows();

  const sortedPersons = [...persons].sort((a, b) => a.points - b.points);
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}

function filtreNomDes(){
  removeAllRows()

  const sortedPersons = [...persons].sort((a, b) => b.nom.localeCompare(a.nom));
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }
  
  update_summary();
}
function filtrePrenomDes(){
  removeAllRows()

  const sortedPersons = [...persons].sort((a, b) => b.prenom.localeCompare(a.prenom));
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}
function filtrePointsDes(){
  removeAllRows();

  const sortedPersons = [...persons].sort((a, b) => b.points - a.points);
  let i = 1;
  for (const person of sortedPersons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}

function filtreNomNormal(){
  removeAllRows()

  let i =1
  for (const person of persons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }
  
  update_summary();
}
function filtrePrenomNormal(){
  removeAllRows()

  let i = 1;
  for (const person of persons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}
function filtrePointsNormal(){
  removeAllRows();
  let i = 1;
  for (const person of persons) {
    doInsertRowTable(i,person.nom,person.prenom,person.points);
    i++;
  }

  update_summary();
}

/*Option 2 : un button pour tout sélectionner*/
let selectCheck = true;

function SelectAll(){
  if (selectCheck == true) {
    while (document.querySelector(".col_chkbox input:not(:checked)") !== null) {
      document.querySelector(".col_chkbox input:not(:checked)").checked = !document.querySelector(".col_chkbox input:not(:checked)").checked;
    }
    selectCheck = false;
  } else {
    while (document.querySelector(".col_chkbox input:checked") !== null) {
      document.querySelector(".col_chkbox input:checked").checked = !document.querySelector(".col_chkbox input:checked").checked;
    }
    selectCheck = true;
  }
}
/*Option 3 : un button pour identifier plus facilement les étudiants admis (donc note au dessus de 10)*/

function colorPoints(){
  let i = 0;
  while (document.querySelectorAll("tr.row")[i]) {
    const points = parseInt(document.querySelectorAll("tr.row")[i].cells[3].innerHTML);

    if (points > 10) {
      document.querySelectorAll("tr.row")[i].style.color = "green";
    } else {
      document.querySelectorAll("tr.row")[i].style.color = "red";
    }
    i++;
  }
}