// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('Ejecutando función inicial');
  
  $.get('/api/osos', function(osos) {
    osos.forEach(function(oso) {
      $('<li></li>').text(oso.nombre).appendTo('ul#osos');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var nombre = $('#nombre').val();
    var cant = $('#cantidad').val();
    var body = {nombre: nombre, cantidad:cant};
    console.log('Body',body);
    $.post('/api/osos', body, function(data, textStatus) {
      console.log(data);
      console.log(textStatus);
      $('<li></li>').text(nombre).appendTo('ul#osos');
      $('nombre').val('');
      $('cantidad').val('');
      $('input').focus();
    });
  });

});
