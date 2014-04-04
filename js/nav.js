(function ($) {
  'use strict';

  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation();
  });

  var step = 0;

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

  //////////////////////////////
  // Watch for Keypresses
  //////////////////////////////
  $('body').keypress(function (e) {
    if (e.charCode === 32 && e.shiftKey === false) {
      steps('forward');
    }
    else if (e.charCode === 32 && e.shiftKey === true) {
      steps('backward');
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
    else if (step > 3) {
      step = 0;
    }

    console.log('Step ' + step);

    switch (step) {
      case 0:
        $('body').toggleClass('loading').toggleClass('loaded');
        $('body').toggleClass('title');
        $('body').zoomTo();
        break;
      case 1:
        $('body').toggleClass('title');
        $('body').zoomTo();
        break;
      case 2:
        $('body').toggleClass('loading').toggleClass('loaded');
        $('body').zoomTo();
        break;
      case 3:
        $('#intro').zoomTo();
        break;
    }
  };

  $('#intro').zoomTarget();
})(window.jQuery);