"use strict";

// Constantes et variables
let mot; //prompt
let nbLettres; //.lenght
let nbConsonnes; //getNombreConsonnes()
let points; //getNombrePoints()
let total =0; //total += points
let randomLetter; //générerLettre()
let motsValides = new Array();

const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const voyelle = `AEIOUY`;
const vautUn = `EAINORSTUL`;
const vautDeux = `DGM`;
const vautTrois = `BCP`;
const vautQuatre = `FHV`;
const vautHuit = `JQ`;
const vautDix = `KWXYZ`;

// ----------------------------------------------------------------------------
// Retourne le nombre de points générés par le mot passé en paramètre selon les
// règles du Scrabble.
//
// https://fr.wikipedia.org/wiki/Lettres_du_Scrabble#Fran%C3%A7ais
// ----------------------------------------------------------------------------
function getNombrePoints(mot) {
  let pointsMot = 0;
  pointsMot += calculerPoints(mot, vautUn, 1);
  pointsMot += calculerPoints(mot, vautDeux, 2);
  pointsMot += calculerPoints(mot, vautTrois, 3);
  pointsMot += calculerPoints(mot, vautQuatre, 4);
  pointsMot += calculerPoints(mot, vautHuit, 8);
  pointsMot += calculerPoints(mot, vautDix, 10);
  return pointsMot;
}

function calculerPoints(mot, lettres, valeurLettre) {
  points = 0;
  for (let i = 0; i < mot.length; ++i) {
    for (let j = 0; j < lettres.length; ++j) {
      if (mot[i] == lettres[j]) {
        points += valeurLettre;
      }
    }
  }
  return points;
}

// ----------------------------------------------------------------------------
// Retourne le nombres de consonnes contenues dans le mot passé en paramètre.
// ----------------------------------------------------------------------------
function getNombreConsonnes(mot) {
  nbConsonnes = 0;
  for (let i = 0; i < mot.length; ++i) {
    if (!EstVoyelle(mot[i])) {
      ++nbConsonnes;
    }
  }
  return nbConsonnes;
}

function EstVoyelle(lettre) {
  for (let i = 0; i < voyelle.length; ++i) {
    if (voyelle[i] == lettre) {
      return true;
    }
  }
}

// ----------------------------------------------------------------------------
// Point d'entrée du traitement. Appelée à chaque clic sur le bouton "Jouer" du
// document HTML.
// ----------------------------------------------------------------------------
function jouer() {
  faireTour();

  if (total >= 200) {
    document.getElementById("message").innerHTML = `Bravo! Partie terminée!<br>(F5 pour recommencer)`;
  }
}

function faireTour()
{
  randomLetter = générerLettre();
  mot = ``;
  points = 0;

  do {
    mot = (prompt(`Entrez un mot de 1 à 20 lettres débutant par ${randomLetter}`)).trim().toUpperCase();
  }
  while (EstInvalide(mot, randomLetter, motsValides))

  motsValides.push(mot);
  points = getNombrePoints(mot);
  total += points;

  console.log(afficher(mot, getNombreConsonnes(mot), points, total));
  
  document.getElementById("boite").innerHTML = afficher(mot, getNombreConsonnes(mot), points, total);
}

function EstInvalide(mot, randomLetter, motsValides) {
  if (mot.length >= 1 && mot.length <= 20 && mot.startsWith(randomLetter) && !EstRécurrent(mot, motsValides)) {
    return false;
  } else {
    return true;
  }
}

function EstRécurrent(mot, motsValides) {
  for (let i = 0; i < motsValides.length; ++i) {
    if (motsValides[i] == mot) {
      return true;
    }
  };
  return false;
}

function générerLettre() {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function afficher(mot, nbConsonnes, points, total) {
  nbLettres = mot.length;

  return "Mot       : " + mot + "<br>" +
    "Lettres   : " + nbLettres + "<br>" +
    "Consonnes : " + nbConsonnes + "<br>" +
    "Points    : " + points + "<br>" +
    "Total     : " + total + "<br>";
}