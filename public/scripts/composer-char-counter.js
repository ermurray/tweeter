$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let maxChar = 140;
    $("#counter").text(`${maxChar -= $(this).val().length}`);
    $("#counter").toggleClass("exceeded", maxChar < 0);

  });
});