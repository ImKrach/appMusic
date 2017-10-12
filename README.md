# tp-frontpage


## Menu de navigation

Pour ajouter une entrée, vous pouvez insérer un nouvel élément `<li>Mon sous-menu</li>` à l'intérieur du `<ul></ul>`
```html
<aside id="header">
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


## Page artiste

Cette section représente le contenu de la page affichée à l'écran.
```html
<section id="main" class="conteneur">
```

Pour créer une page artiste, il faut d'abord ouvrir un `<article></article>` dans lequel on va insérer les éléments ci-dessous.
```html
<article class="contenu">
	Ici, on va insérer les éléments ci-dessous (nom de l'artiste, followers, barre d'actions, biographie, discographie) dans des <div> qui possède différentes classes.
</article>
```

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
