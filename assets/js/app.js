var loginUsername = "#login-username";
var pass = "#pass";
var loginAvatarURL = "#login-avatar-url";
var loginBtn = "#login-btn";
var passwd = "kaiwappLogin//88";
var checkImg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|svg)/;


$(document).ready(function() {

  setTimeout(function() {
    $("#loader").fadeOut();
  }, 5000);

  $("#login-username, #pass, #login-avatar-url").keyup(function() {
    if ($(loginUsername).val().length > 0 && $(pass).val().length > 0 && $(loginAvatarURL).val().length > 0) {
      $(loginBtn).removeClass("disabled");
    } else {
      $(loginBtn).addClass("disabled");
    }
  });

  $(loginBtn).click(function() {
    if ($(pass).val() == passwd && checkImg.test($(loginAvatarURL).val())) {
      window.location.replace("app.html");
    } else {
      alert("Input not valid");
    }
  });

  $("#first-panel").click(function() {
    $(".hamburger").toggleClass("is-active");
  });

  $("#first-panel").mouseover(function() {
    $(".hamburger").css({"opacity":"0.6"});
    $(this).mouseleave(function() {
      $(".hamburger").css({"opacity":"1"});
    });
  });
});

/**
* $("#login-logo").click(function() {
*  $("#login-logo").effect("pulsate", {times: 2}, 1000);
* });
*/