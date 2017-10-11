$(document).ready(function() {

  $('.titres-album > li').data('status', 'off');

  $('.titres-album > li').on('click', function(event) {
    event.preventDefault();

    // On récupère l'url de la musique
    var urlTitre = $(this).data('source');

    // On met à jour notre balise audio
    $('#audioPlayer').prop('src', urlTitre);
    $('#audioPlayer').show();
    $('#footer').slideDown('slow');

    // On met à jour l'état de notre ligne
    if ($(this).data('status') == 'off') {
      $(this).find('.bouton-play i').removeClass('fa-pause-circle').addClass('fa-play-circle');
      $(this).data('status', 'on');
    } else {
      $(this).find('.bouton-play i').removeClass('fa-play-circle').addClass('fa-pause-circle');
      $(this).data('status', 'off');
    }
  });

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

  initialisationSlider();

  $('#toggle-aside').on('click', function(event) {
    event.preventDefault();

    $('#header').toggle();
    $('#main').css('margin-left', '0%');
    $('#main').css('width', '100%');
  });

  // $(window).on('resize', function(event){
  //   console.log('#test_1 : ' + $('#test_1').width());
  //   console.log('#test_2 : ' + $('#test_2').width());
  //   console.log('#test_3 : ' + $('#test_3').width());
  //   console.log('#test_4 : ' + $('#test_4').width());
  //   console.log('#test_5 : ' + $('#test_5').width());
  // });
});

// Initialisation de l'angle de rotation à 0
var angleRotation = 0;

// Initialisation de degré de rotation nécessaire
var degreRotation = 0;

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
