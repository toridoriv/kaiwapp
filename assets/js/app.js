var loginUsername = "#login-username";
var pass = "#pass";
var loginAvatarURL = "#login-avatar-url";
var loginBtn = "#login-btn";
var passwd = "login";
var checkImg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|svg)/;
var textaMsg = $("#textarea-msg");
var sendBtn = $("#send-btn");
var chat = $("#chat");

var determineHour = (function() {
  var date = new Date();
  var hour = date.getHours();

  if (hour <= 9) {
    hour = "0" + hour.toString();
  } else {
    hour = hour.toString();
  };

  return hour;
});

var determineMinutes = (function() {
  var date = new Date();
  var minutes = date.getMinutes();

  if (minutes <= 9) {
    minutes = "0" + minutes.toString();
  } else {
    minutes = minutes.toString();
  };

  return minutes;
});

/*
* Function that shows all the last storage data
*/
var obtainLastData = (function(data, where) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].group === false) {
      var msg = data[i].messages[data[i].messages.length-1];
      if (msg.length > 20) {
        msg = msg.substring(0,20)+"...";
      }
      $(where).append("<div class='row'><div class='col s12 archive-box'>"+data[i].photo[0]+"<span class='username'>"
        +data[i].name[0]+"</span><span>"+msg+"</span><span class='time'>"+data[i].time[data[i].messages.length-1]+"</span></div></div>");
    }
  }
});

var addValue = (function(obj, key, value) {
  if (obj.hasOwnProperty(key)) {
    obj[key].push(value);
  } else {
    var arr = jQuery.makeArray(value);
    obj[key] = arr;
  }
});

/*
* Function to get the nickname of the current user
* and puts it inside a box
*/

var setUsername = (function(str) {
  return "<span class='current-user'>"+str+"</span>";
});


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
/*"<img src='assets/img/avatars/saika.jpeg' alt='Saika Ogawa' class='profile-pic'>"*/
  $(loginBtn).click(function() {
    if ($(pass).val() == passwd && checkImg.test($(loginAvatarURL).val())) {
      currentData.name = $(loginUsername).val();
      currentData.photo = "<img src='"+ $(loginAvatarURL).val()+ "' alt='"+$(loginUsername).val()+"' class='profile-pic'>";
      obtainLastData(data, "#archive");
      $(".archive-box").click(function() {
        for (var i = 0; i < data.length; i++) {
          var whatName = $(this).find(".username").html();
          if (whatName == data[i].name) {
            $(chat).html("<div class='chat-inside'></div>");
            for (var n = 0; n < data[i].messages.length; n++) {
              $(".chat-inside").append("<div class='post-container-arch'><div class='post-archive'><span class='archive-user'>"+data[i].name[0]+"</span><span>"
                +data[i].messages[n]+"</span><span class='time'>"+ data[i].time[n] +"</span></div></div>");
            } if (data[i].answers.length > 0) {
              for (var u = 0; u < data[i].answers.length; u++) {
                $(".chat-inside").append(postNow + setUsername(currentData.name) + "<span>" + data[i].answers[u] + "</span><span class='time'>"
                  + data[i].answersTime[u] + "</span>" + endPost);
              }
            }
          }
        }
      });

      $("#send-btn").click(function() {
        var currentMsg = $(textaMsg).val().trim();
        var currentTime = determineHour()+":"+determineMinutes();
        $("#textarea-msg").val("");
        for (var i = 0; i < data.length; i++) {
          var whatName = $(".post-archive").children().html();
          if (whatName.includes(data[i].name[0])) {
            whatName = data[i].name[0];
            addValue(data[i], "answers", currentMsg);
            addValue(data[i], "answersTime", currentTime);
          }
        }
        
        addValue(currentData.messages, whatName, currentMsg);
        $(this).addClass("disabled");
        addValue(currentData.time, whatName, currentTime);
        $(".chat-inside").append(postNow + setUsername(currentData.name) + "<span>" + currentMsg + "</span><span class='time'>"
          + currentTime + "</span>" + endPost);
      });

      $("#loader").css({"display":"flex"});
      $("#login").fadeOut();
      $("#app").fadeIn();
      setTimeout(function(){
      $("#loader").fadeOut();
        },1000);

      
      $(textaMsg).keyup(function() {
        if ($(this).val().length > 0) {
          $(sendBtn).removeClass("disabled");
        } else {
          $(sendBtn).addClass("disabled");
        }
      });

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