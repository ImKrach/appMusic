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

    $(this).fadeOut(150, function() {
      $(this).toggleClass('active');
      $(this).fadeIn(150);
    });

    var headerLeftToggle = ($('#header')[0].style.left == '-15%') ? '0%' : '-15%';
    var mainWidthToggle = ($('#main')[0].style.width == '100%') ? '85%' : '100%';
    var mainMarginLeftToggle = ($('#main')[0].style.marginLeft == '0%') ? '15%' : '0%';

    $('#header').toggleClass('off');
    $('#header').animate({
      'left':headerLeftToggle
    }, 250);

    $('#main').toggleClass('header-off');
    $('#main').animate({
      'margin-left':mainMarginLeftToggle,
      'width':mainWidthToggle
    }, 250);

  });

  // Toggle des playlists
  $( ".toggle-sousmenu" ).click(function() {
    var cible = $(this).data('target');
    $(cible).slideToggle("normal");

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
      if ($(this).data('status') == 'off') {
        $(this).find('.bouton-play').removeClass('hidden');
      } else {
        $(this).find('.bouton-play').removeClass('hidden');
      }
    },
    // Mouseout
    function(event) {
      if ($(this).data('status') == 'off') {
        $(this).find('.bouton-play').addClass('hidden');
      } else {
        $(this).find('.bouton-play').addClass('hidden');
      }
    }
  );
}

function changerTheme() {
  $('.breadcrumbs_style_element').on('click', function(event) {
    var cibleCSS = $(this).data('target');

    $('#cssSource').attr('href', 'stylesheets/'+cibleCSS);
  });
}
