$(document).ready(function() {

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

  // initialisation du slider
  initialisationSlider();

  // Toggle de la sidebar
  $('#toggle-sidebar').on('click', function(event) {

    $(this).toggleClass('active');


    // $('#header').slideToggle(250, function() {
    //   //Stuff to do *after* the animation takes place
    // });

    console.log("$(this)[0] : " + $(this)[0].style.right);
    console.log("$(this)[0] : " + $(this)[0].style.right);
    console.log("$('#header')[0] : " + $('#header')[0].style.left);
    console.log("$('#main')[0] : " + $('#main')[0].style.width);
    console.log("$('#main')[0] : " + $('#main')[0].style.marginLeft);
    // console.log(headerLeftToggle);
    var thisRightToggle = ($(this)[0].style.right == '15px') ? '-15%' : '15px';
    var thisOpacityToggle = ($(this)[0].style.right == '15px') ? '-15%' : '15px';
    var headerLeftToggle = ($('#header')[0].style.left == '0%') ? '-15%' : '0%';
    var mainWidthToggle = ($('#main')[0].style.width == '85%') ? '100%' : '85%';
    var mainMarginLeftToggle = ($('#main')[0].style.marginLeft == '15%') ? '0%' : '15%';

    $('#header').animate({
      'left':headerLeftToggle
    }, 250);

    $('#main').animate({
      'margin-left':mainMarginLeftToggle,
      'width':mainWidthToggle
    }, 250);

    // $('#toggle-sidebar').animate({
    //   'opacity':'0'
    // }, 100, function() {
    //   $(this).()
    // });
    //
    // $('#toggle-sidebar').fadeOut(100, function() {
    //     $(this).removeClass('on').addClass('off').fadeIn(250);
    // });



    // $('#header').slideToggle('fast', function(){
    //   console.log('slideToggle');
    //   if ($(this).is(':visible')) {
    //     console.log('visible');
    //     // On retrecie le main et ajoute une marge de 15% (la taille de la sidebar qui apparait)
    //     $('#main').css('margin-left', '15%');
    //     $('#main').css('width', '85%');
    //     $('#toggle-sidebar').removeClass('off').addClass('on');
    //     // $('#toggle-sidebar').prependTo('#main');
    //     // TODO
    //     // $('#main').removeClass('off').addClass('on');
    //   } else {
    //     console.log('non visible');
    //     // On agrandit le main, la sidebar est cachée
    //     $('#main').css('margin-left', '0%');
    //     $('#main').css('width', '100%');
    //     $('#toggle-sidebar').removeClass('on').addClass('off');
    //     // $('#toggle-sidebar').prependTo('body');
    //     // TODO
    //     // $('#main').removeClass('on').addClass('off');
    //   }
    // });

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
