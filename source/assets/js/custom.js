$(document).ready(function() {

  //Initialize reCaptcha v3
  grecaptcha.ready(function() {
    grecaptcha.execute(process.env.APIKEYRECAPTCHA, {action: 'homepage'}).then(function(token) {});
  });

  $(".btn-anchor").each(function(key, value) {
      $(value).on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        goTo(this.hash);
      }
    });
  });

  var isLoadRecaptats = false;
  var isLoadVideo = false;
  var isLoadTwitter = false;
  var isLoadExperiencies = false;

  $(window).scroll(function() {
    
    if(document.getElementById("dades") && !isLoadRecaptats) {
      if (isElementInView($('#dades'), false)) {
          isLoadRecaptats = true;

          var options = {
            useEasing : true, 
            useGrouping : true, 
            separator : ',', 
            decimal : '.', 
            suffix : '€' 
          };
          var counts = new CountUp("recaptats-count", 0, 20470, 0, 4, options);
          counts.start();
      }
    }

    if(document.getElementById("guia") && !isLoadVideo) {
      if (isElementInView($('#guia'), false)) {
          isLoadVideo = true;
          $("#video").removeClass("hidden");
          $("#video").addClass("animated zoomIn");
      }
    }

    if(document.getElementById("twitter") && !isLoadTwitter) {
      if (isElementInView($('#twitter'), false)) {
          isLoadTwitter = true;
          $("#twitter-loader").removeClass("hidden");
          loadTwitterTimeline();
      }
    }

    if(document.getElementById("experiencies") && !isLoadExperiencies) {
      if (isElementInView($('#experiencies'), false)) {
          isLoadExperiencies = true;
          $("#experiencies-loader").removeClass("hidden");
          loadWordpressPost();
      }
    }
  });

  //Gràfics
  if(document.getElementsByClassName("charts")) {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/highcharts/5.0.10/highcharts.js")
      .done(function(script, textStatus) {
        printHighcharts();
      })
      .fail(function(jqxhr, settings, exception) {});
  } 

  //Guia: Youtube video
  if(document.getElementById("youtube_ks")) {
    
    var youtube_ks = document.getElementById("youtube_ks");
    var source = "assets/images/"+ youtube_ks.dataset.embed +"_sddefault.jpg"; 

    //load the image asynchronously
    var image = new Image();
    image.src = source;
    image.alt = 'Vídeo Guia Kilòmetre Solidari Associació Juvenil Esquitx';
    image.title = 'Vídeo Guia Kilòmetre Solidari Associació Juvenil Esquitx';
    image.addEventListener("load", function() {
      youtube_ks.appendChild(image);
    });

    //click event
    youtube_ks.addEventListener("click", function() {
      var iframe = document.createElement("iframe");
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1");
          this.innerHTML = "";
          this.appendChild(iframe);
    });
  }

  //Timeline
  if(document.getElementById("timeline")) {    
    
    $.getScript("https://cdn.knightlab.com/libs/timeline3/3.4.3/js/timeline-min.js")
      .done(function(script, textStatus) {
        printTimeline();
    })
    .fail(function(jqxhr, settings, exception) {});
  }
});