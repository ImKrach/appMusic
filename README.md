# tp-frontpage

## Introduction

Le feedback du développeur du projet n°3 est contenu dans le fichier 'rapport de bug' à la racine du projet.

## Pré-requis

Node et npm doivent être installés
```
sudo apt-get install node npm -y
```

## Installation

```
git clone https://github.com/ImKrach/appMusic.git
cd appMusic
npm install
npm start
```
Ouvrir le navigateur sur l'url https://localhost:8443/

## Menu de navigation

Pour ajouter une entrée, vous pouvez insérer un nouvel élément `<li>Mon sous-menu</li>` à l'intérieur du `<ul></ul>`
```html
<aside id="header">
  <i id="toggle-sidebar" class="fa fa-bars on"></i>
  <nav>
    <img src="img/logo.png" alt="Logo musique">
    <ul>
      <li>Accueil</li>
      <li>Recherche</li>
      <li>Mes favoris</li>
      <li>Mes playlists</li>
    </ul>
  </nav>
</aside>
```
L'élément `<i id="toggle-sidebar" class="fa fa-bars on"></i>` est important car il permet de cacher le menu de navigation.
L'élément `<img src="img/logo.png" alt="Logo musique">` n'est pas essentiel.

## Page principale

Cette section représente le conteneur principal de la page affichée à l'écran.
```html
<section id="main" class="conteneur">
```
NB : Ce conteneur est essentiel.

## Page artiste

Pour créer une page artiste, il faut d'abord ouvrir un `<article></article>` dans lequel on va insérer les éléments ci-dessous.
```html
<article class="contenu">
	Ici, on va insérer les éléments ci-dessous (nom de l'artiste, followers, barre d'actions, biographie, discographie, slider) dans des <div> qui possède différentes classes.
</article>
```
NB : l'élément `<article class="contenu">` doit être inséré dans le `<section id="main" class="conteneur">`.

L'application est actuellement en mesure de fournir des informations sur un artiste :

* Nom de l'artiste
	* ```html
		<div class="entete-artiste">
          <h2 class="nom-artiste">RIDSA</h2>
          <h4 class="followers-artiste">86,191 followers</h4>
        </div>
      ```
* Nombre de followers (popularité)
	* ```html
		<div class="entete-artiste">
          <h2 class="nom-artiste">RIDSA</h2>
          <h4 class="followers-artiste">86,191 followers</h4>
        </div>
      ```
* Une barre d'actions : "PLAY" / "FOLLOW" / "Menu contextuel (pour plus d'actions)"
	* ```html
		<div class="actions">
          <button class="btn btn-principal">PLAY</button>
          <button class="btn btn-secondaire">FOLLOW</button>
          <button class="btn btn-transparent">&middot; &middot; &middot;</button>
        </div>
      ```
* Une description/biographie de l'artiste
	* ```html
		<div class="description-artiste"> ... </div>
      ```
* La liste des différents albums (avec ses titres)
Si vous préférez la pochette de l'album à droite utiliser la classe .pochette-droite (ou .pochette-haut) sur la `<div class="album-artiste">`
	* ```html
		<div class="album-artiste">
          <div class="pochette-album">
            <img src="img/RIDSA_pochette-album.jpg" alt="RIDSA - Mes histoires">
          </div>
          <ul class="titres-album">
            <li>
              <span class="numero-titre">1.</span>
              <span class="titre-titre">Oh mama</span>
              <span class="duree-titre">3:21</span>
            </li>
          </ul>
      </div>
    ```

* Le slider affiché à l'écran est dynamique et nécessite au moins 4 images pour ne pas être trop dégueulasse. Voir les fonctions initialisationSlider et animerSlider, elles sont assez cools. Pour intégrer un slider insérer le code suivant dans la balise `<article class="contenu">`
  * ```html
    <div id="slider">
      <figure id="slider-rotation">
        <img src="images/album_1.jpg" alt="image_album_1" data-target="#album_1">
        <img src="images/album_2.jpg" alt="image_album_2" data-target="#album_2">
        <img src="images/album_3.jpg" alt="image_album_3" data-target="#album_3">
        <img src="images/album_4.jpg" alt="image_album_4" data-target="#album_4">
        <img src="images/album_5.jpg" alt="image_album_5" data-target="#album_5">
      </figure>
      <span style="float:left" class="slider-icone-rotation slider-icone-rotation-left" onclick="animerSlider('avant')">
        <i class="fa fa-chevron-left"></i>
      </span>
      <span style="float:right" class="slider-icone-rotation slider-icone-rotation-right" onclick="animerSlider('apres')">
        <i class="fa fa-chevron-right"></i>
      </span>
    </div>
    ```
  * Bien sûr il faut avoir les images dans le dossier public/images
