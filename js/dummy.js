(function (window) {

  $(document).ready(function () {

    $(window).resize(function() {
      //$('div:last').height($(window).height() - $('div:last').offset().top);
  });
  $(window).resize();

    var _elem = document.getElementById('present');

    window._Console.setElement(_elem);

    $('#editor').on('input', function (e) {
      var value = $(this).text();
      value = value.trim().replace(/\s{2,}/g," ");

      try {
        if (value !== '') {
          var _val = JSON.parse("" + value + "");
          _Console.populateJSON(_val);
        } else {
          _Console.populateJSON({});
        }
      } catch (err) {
        console.error(err);
      }

      e.preventDefault();
    });
  });

})(window);