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

/*
* Function that allows the user access to the archived data of every contact
*/

var showFullChat = (function(whereClick, data, majorContainer, whereClean) {
  $(whereClick).click(function() {
    for (var i = 0; i < data.length; i++) {
      if ($(this).find(".username").html() == data[i].name[0]) {
        $(whereClean).css({"display":"none"});
        $(majorContainer).html("<div class='chat-inside'></div>");
        for (var n = 0; n < data[i].messages.length; n++) {
          $(".chat-inside").html("<div class='post-container-arch'><div class='post-archive'><span>"+data[i].name[0]+"</span><span>"
            +data[i].messages[n]+"</span></div></div>");
        }
      }
    }
  });
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
      showFullChat(".archive-box", data, "#chat", ".chat-inside");
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

      $("#send-btn").click(function() {
        msg = $(textaMsg).val().trim();
        currentData.messages.push(msg);
        $(textaMsg).val("");
        $(this).addClass("disabled");
        $(".chat-inside").append(postNow+setUsername(currentData.name)+"<span>"+msg+"</span>"+"<span class='time'>"+determineHour()+":"+determineMinutes()+"</span>"+endPost);
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