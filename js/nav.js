(function ($) {
  'use strict';

  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation();
  });

  var step = 0;
  var timing = 650;

  //////////////////////////////
  // Set up loading spinner
  //////////////////////////////
  $('#loading').spin({
    lines: 13, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
  });

  var forward = function (e) {
    if (e.keyCode === 34 || e.keyCode === 39 || (e.keyCode === 32 && e.shiftKey === false)) {
      e.preventDefault();
      return true;
    }
    else {
      return false;
    }
  };

  var backward = function (e) {
    if (e.keyCode === 33 || e.keyCode === 37 || (e.keyCode === 32 && e.shiftKey === true)) {
      e.preventDefault();
      return true;
    }
    else {
      return false;
    }
  };

  //////////////////////////////
  // Watch for Keydown
  //////////////////////////////
  document.querySelector('body').addEventListener('keydown', function (e) {

    if (e.keyCode === 27) {
      $('body').zoomTo();
      step = 0;
      return;
    }

    if (forward(e)) {
      steps('forward');
    }
  });

  //////////////////////////////
  // Steps
  //////////////////////////////
  var steps = function (direction) {
    if (direction === 'forward') {
      step++;
    }
    else {
      step--;
    }

    if (step < 0) {
      step = 0;
    }
    else if (step > 6) {
      step = 0;
    }

    console.log('Step ' + step);

    switch (step) {
      case 1:
        $('#recipes-menus').trigger('click');
        window.setTimeout(function () {
          $('#recipe-mega-menu').zoomTo();
        }, timing);
        break;
      case 2:
        $('body').zoomTo();
        window.setTimeout(function () {
          $('#electronics-menus').trigger('click');
        }, timing);
        window.setTimeout(function () {
          $('#mega-menu').zoomTo();
        }, timing * 2);
        window.setTimeout(function () {
          $('#device-phones-toggle').trigger('click');
        }, timing * 4);
        window.setTimeout(function () {
          $('#device-phablets-toggle').trigger('click');
        }, timing * 8);
        window.setTimeout(function () {
          $('#device-tablets-toggle').trigger('click');
        }, timing * 12);
        window.setTimeout(function () {
          $('#device-desktops-toggle').trigger('click');
        }, timing * 16);
        window.setTimeout(function () {
          $('#device-gaming-toggle').trigger('click');
        }, timing * 20);
        window.setTimeout(function () {
          $('#device-gaming-toggle').trigger('click');
        }, timing * 24);

        break;
      case 3:
        $('#carousel-megamenu').zoomTo();
        break;
      case 4:
        $('body').zoomTo();
        window.setTimeout(function () {
          $('#electronics-menus').trigger('click');
        }, timing);
        window.setTimeout(function () {
          $('#social').zoomTo();
        }, timing * 2);
        break;
      case 5:
        $('body').zoomTo();
        window.setTimeout(function () {
          $('#overlay-btn').trigger('click');
        }, timing);
        window.setTimeout(function () {
          $('#overlay-content').zoomTo();
        }, timing * 2.5);
      case 6:
        $('#overlay-close').trigger('click');
        window.setTimeout(function () {
          $('body').zoomTo();
        }, timing * 2);

        break;
      // case 0:
      //   $('body').toggleClass('loading').toggleClass('loaded');
      //   $('body').toggleClass('title');
      //   $('body').zoomTo();
      //   break;
      // case 1:
      //   $('body').toggleClass('title');
      //   $('body').zoomTo();
      //   break;
      // case 2:
      //   $('body').toggleClass('loading').toggleClass('loaded');
      //   $('body').zoomTo();
      //   break;
      // case 3:
      //   $('#intro').zoomTo();
      //   break;
    }
  };

  $('#intro').zoomTarget();
})(window.jQuery);