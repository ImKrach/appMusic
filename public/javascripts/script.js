$(document).ready(function() {
  // initialisation du slider
  initialisationSlider();

  // Click sur l'image d'un slider
  clickImageSlider();

  // initialisation de la sidebar
  initialisationSidebar();

  // initialisation du comportement des titres
  initilisationTitres();

  // Fonction de changement de thème
  changerTheme();

  // Appel à l'API
  appelAPI();
});

// Initialisation de l'angle de rotation à 0
var angleRotation = 0;

// Initialisation de degré de rotation nécessaire
var degreRotation = 0;

// Initialisation du slider (calcul du nombre d'images et du degré de rotation nécessaire)
function initialisationSlider() {
  // On veut connaître le nombre d'images
  var nombreImages = $('#slider-rotation img').length;

  // Avec le nombre d'images on peut calculer le degré de rotation de chaque image
  degreRotation = 360 / (nombreImages-1);

  // On applique le bon degré de rotation sur chaque élément
  $('#slider-rotation img').each(function(index) {
    $(this).css('transform', 'rotateY(' + index*degreRotation*(-1) +'deg)');
  });
}

// Le paramètre est 'avant' ou 'apres'
function animerSlider(sens) {
  // En fonction du bouton cliqué avant/apres
  if (sens == "avant") {
    // L'angle est incrémenté de 45
    angleRotation = angleRotation + degreRotation;
  } else if (sens == "apres") {
    // L'angle est décrémenté de 45
    angleRotation = angleRotation - degreRotation;
  }

  // On se sert du css pour effectuer la rotation
  $('#slider-rotation').css("-webkit-transform", "rotateY("+ angleRotation +"deg)");
  $('#slider-rotation').css("-moz-transform", "rotateY("+ angleRotation +"deg)");
  $('#slider-rotation').css("transform", "rotateY("+ angleRotation +"deg)");
}

// Click sur l'image d'un slider déclenche la lecture de ses musiques
function clickImageSlider() {
  $('#slider > #slider-rotation > img').on('click', function(event) {
    // Cible contient l'id de l'album
    var cible = $(this).data('target');

    // On scroll tranquillement vers l'album ciblé
    $('html, body').animate({
        scrollTop: $(cible).offset().top
    }, 500);
  });
}

// Toggle de la sidebar
function initialisationSidebar() {
  // Toggle de la sidebar
  $('#toggle-sidebar').on('click', function(event) {

    // Bricolage, on fadeOut le bouton toggle-sidebar avant de le déplacer et de le fadeIn
    $(this).fadeOut(150, function() {
      // La classe active déplace le toggle-sidebar hors de la #header (quand celle-ci est masquée)
      $(this).toggleClass('active');
      $(this).fadeIn(150);
    });

    // On calcul les dimensions pour toggle le #header et le #main
    var headerLeftToggle = ($('#header')[0].style.left == '-15%') ? '0%' : '-15%';
    var mainWidthToggle = ($('#main')[0].style.width == '100%') ? '85%' : '100%';
    var mainMarginLeftToggle = ($('#main')[0].style.marginLeft == '0%') ? '15%' : '0%';

    // Animation du header en 250ms
    $('#header').toggleClass('off');
    $('#header').animate({
      'left':headerLeftToggle
    }, 250);

    // Animation du main en 250ms
    $('#main').toggleClass('header-off');
    $('#main').animate({
      'margin-left':mainMarginLeftToggle,
      'width':mainWidthToggle
    }, 250);

  });

  // Toggle des sousmenus : "Mes playlists" / "Mes favoris" (dans la #header sidebar)
  $( ".toggle-sousmenu" ).click(function() {
    // Le <li> qui déclenche le toggle ("Mes playlists" / "Mes favoris") contient l'id de la cible en data-target
    var cible = $(this).data('target');

    // On slide à vitesse normale
    $(cible).slideToggle("normal");

    // On remplace le chevron down par up (et vice versa)
    if ($(this).find('i').hasClass('fa-chevron-down')) {
      $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  });
}

// Comportement des différents titres de musique (survol, click)
function initilisationTitres() {
  // li : titre (etat off par défaut)
  $('.titres-album > li').data('status', 'off');

  // Quand on clique sur un titre
  $('.titres-album > li').on('click', function(event) {
    // On récupère l'url de la musique
    var urlTitre = $(this).data('source');

    // On insère l'url dans notre lecteur audio
    $('#audioPlayer').prop('src', urlTitre);
    $('#audioPlayer').show();
    // On fait apparaître le footer qui contient le lecteur audio
    $('#footer').slideDown('slow');

    // li : titre (etat passe à off + play icon / etat passe à on + pause icon)
    if ($(this).data('status') == 'off') {
      $(this).find('.bouton-play i').removeClass('fa-pause-circle').addClass('fa-play-circle');
      $(this).data('status', 'on');
    } else {
      $(this).find('.bouton-play i').removeClass('fa-play-circle').addClass('fa-pause-circle');
      $(this).data('status', 'off');
    }
  });

  // Au survol d'un titre, on fait apparaître l'icon play
  $('.titres-album > li').hover(
    // Mousein
    function(event) {
      // On affiche le bouton play (si la lecture n'a pas encore commencée sur ce titre)
      if ($(this).data('status') == 'off') {
        $(this).find('.bouton-play').removeClass('hidden');
      // On affiche le bouton pause (si la lecture est en cours)
      } else {
        $(this).find('.bouton-pause').removeClass('hidden');
      }
    },
    // Mouseout
    function(event) {
      // On cache le bouton play (si la lecture n'a pas encore commencée sur ce titre)
      if ($(this).data('status') == 'off') {
        $(this).find('.bouton-play').addClass('hidden');
      // On cache le bouton pause (si la lecture est en cours)
      } else {
        $(this).find('.bouton-pause').addClass('hidden');
      }
    }
  );
}

// Solution très très dégueulasse pour changer de thème à la volée (désolé, pas eu le temps de faire + propre)
function changerTheme() {
  // Quand on clique sur une icone de theme
  $('.breadcrumbs_style_element').on('click', function(event) {
    // On récupère le data-target contenant le nom du bon fichier css
    var cibleCSS = $(this).data('target');

    // On met à jour le fichier css dans la balise link
    $('#cssSource').attr('href', 'stylesheets/'+cibleCSS);
  });
}

// Requête sur une API
function appelAPI() {
  $.ajax({
    url:'https://swapi.co/api/films/1/',
    method: 'get',
    beforeSend: function(data) {
      $('.description-artiste').addClass('loading').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
    },
    success: function(data) {
      var description = data.opening_crawl;
      $('.description-artiste').removeClass('loading').html(description);
    }
  })
}
