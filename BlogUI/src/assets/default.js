$(function () {
    'use strict';
    $('.left-list, .main-body, .rightpanel').perfectScrollbar();

    // show/hide left menu
    $('#showLeftMenu').on('click', function () {
      $('body').removeClass('show-right');

      if ($('body').hasClass('show-left')) {
        $('body').removeClass('show-left');
        $('.leftpanel').addClass('hidden-md-down');
      } else {
        $('body').addClass('show-left');
        $('.leftpanel').removeClass('hidden-md-down');
      }
      return false;
    });

    // show/hide right menu
    $('#showRightMenu').on('click', function () {
      $('body').removeClass('show-left');

      if ($('body').hasClass('show-right')) {
        $('body').removeClass('show-right');
        $('.rightpanel').addClass('hidden-lg-down');
      } else {
        $('body').addClass('show-right');
        $('.rightpanel').removeClass('hidden-lg-down');
      }
      return false;
    });
  });